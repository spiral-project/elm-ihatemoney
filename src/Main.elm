module Main exposing (main)

import Api exposing (createProject, fetchProjectInfo)
import BillBoard exposing (billBoardView)
import Browser exposing (Document)
import Footer exposing (footerView)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Locales exposing (getString)
import Login exposing (loginView)
import NavBar exposing (navBarView, simpleNavBarView)
import Round exposing (round)
import SideBar exposing (sideBarView)
import Slug
import Types exposing (..)


init : () -> ( Model, Cmd Msg )
init flags =
    ( { auth = Unauthenticated
      , locale = EN
      , project = Nothing
      , fields =
            { newMember = ""
            , loginProjectID = ""
            , loginPassword = ""
            , newProjectName = ""
            , newProjectPassword = ""
            , newProjectEmail = ""
            , newProjectError = Nothing
            }
      }
    , Cmd.none
    )


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


setNewMemberName : String -> Fields -> Fields
setNewMemberName newMember fields =
    { fields | newMember = newMember }


setNewProjectName : String -> Fields -> Fields
setNewProjectName value fields =
    { fields | newProjectName = value, newProjectError = Nothing }


setNewProjectPassword : String -> Fields -> Fields
setNewProjectPassword value fields =
    { fields | newProjectPassword = value }


setNewProjectEmail : String -> Fields -> Fields
setNewProjectEmail value fields =
    { fields | newProjectEmail = value }


setNewProjectError : String -> Fields -> Fields
setNewProjectError value fields =
    { fields | newProjectError = Just value }


setLoginProjectID : String -> Fields -> Fields
setLoginProjectID value fields =
    { fields | loginProjectID = value }


setLoginPassword : String -> Fields -> Fields
setLoginPassword value fields =
    { fields | loginPassword = value }


addMemberToProject : Member -> Project -> Project
addMemberToProject member project =
    { project | members = project.members ++ [ member ] }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewMemberName value ->
            let
                fields =
                    setNewMemberName value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        AddMember ->
            case model.project of
                Just project ->
                    let
                        fields =
                            setNewMemberName "" model.fields

                        member =
                            Member 0 model.fields.newMember 1 True 0.0

                        newProject =
                            addMemberToProject member project
                    in
                    ( { model
                        | project = Just newProject
                        , fields = fields
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        NewProjectName value ->
            let
                fields =
                    setNewProjectName value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        NewProjectPassword value ->
            let
                fields =
                    setNewProjectPassword value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        NewProjectEmail value ->
            let
                fields =
                    setNewProjectEmail value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        CreateProject ->
            let
                projectID =
                    model.fields.newProjectName

                slug =
                    Slug.generate projectID

                password =
                    model.fields.newProjectPassword

                email =
                    model.fields.newProjectEmail
            in
            case slug of
                Just _ ->
                    let
                        fields =
                            model.fields |> setNewProjectName "" |> setNewProjectPassword "" |> setNewProjectEmail ""
                    in
                    ( { model | fields = fields, auth = Basic projectID password }
                    , createProject projectID password email
                    )

                Nothing ->
                    let
                        _ =
                            Debug.log "Invalid ProjectName" projectID

                        fields =
                            model.fields
                                |> setNewProjectError ("Invalid project name: " ++ projectID)
                    in
                    ( { model | fields = fields }, Cmd.none )

        ProjectCreated (Ok projectID) ->
            let
                password =
                    case model.auth of
                        Basic user pass ->
                            pass

                        Unauthenticated ->
                            ""

                auth =
                    Basic projectID password
            in
            ( { model | auth = auth }
            , fetchProjectInfo auth projectID
            )

        ProjectCreated (Err err) ->
            let
                _ =
                    Debug.log "Error while creating the project" err
            in
            ( model, Cmd.none )

        LoginProjectID value ->
            let
                fields =
                    setLoginProjectID value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        LoginPassword value ->
            let
                fields =
                    setLoginPassword value model.fields
            in
            ( { model | fields = fields }, Cmd.none )

        Login ->
            let
                projectID =
                    model.fields.loginProjectID

                password =
                    model.fields.loginPassword

                fields =
                    model.fields |> setLoginProjectID "" |> setLoginPassword ""

                auth =
                    Basic projectID password
            in
            ( { model | fields = fields, auth = auth }
            , fetchProjectInfo auth projectID
            )

        LogoutUser ->
            ( { model | auth = Unauthenticated }, Cmd.none )

        ProjectFetched (Ok project) ->
            ( { model
                | project = Just project
              }
            , Cmd.none
            )

        ProjectFetched (Err err) ->
            let
                _ =
                    Debug.log "Error while loading the project" err
            in
            ( { model | auth = Unauthenticated }, Cmd.none )

        ChangeLocale locale ->
            ( { model | locale = locale }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> Document Msg
view model =
    let
        t =
            getString model.locale
    in
    case ( model.auth, model.project ) of
        ( Basic user password, Just project ) ->
            { title = t <| AppTitle (Just project.name)
            , body =
                [ navBarView t project model.locale
                , div
                    [ class "container-fluid" ]
                    [ sideBarView t model.fields.newMember project.members
                    , billBoardView t project.bills
                    ]
                , div [ class "messages" ] []
                , footerView t
                ]
            }

        ( _, _ ) ->
            { title = t <| AppTitle Nothing
            , body =
                [ simpleNavBarView t model.locale
                , loginView t model.locale model.fields
                , footerView t
                ]
            }
