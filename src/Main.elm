module Main exposing (main)

import BillBoard exposing (billBoardView)
import Browser exposing (Document)
import Footer exposing (footerView)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Locales exposing (getString)
import Login exposing (loginView)
import NavBar exposing (navBarView, simpleNavBarView)
import Round exposing (round)
import SideBar exposing (sideBarView)
import Types exposing (..)


init : () -> ( Model, Cmd Msg )
init flags =
    ( { auth = Unauthenticated
      , locale = EN
      , members =
            [ { name = "Alexis", balance = 10 }
            , { name = "Fred", balance = -10 }
            , { name = "Rémy", balance = 20 }
            ]
      , bills =
            [ { date = "2018-12-21"
              , amount = 12.2
              , label = "Bar"
              , payer = "Rémy"
              , owers = [ "Rémy", "Alexis" ]
              }
            , { date = "2018-12-22"
              , amount = 52.2
              , label = "Resto"
              , payer = "Alexis"
              , owers = [ "Rémy", "Alexis", "Fred" ]
              }
            ]
      , project = "Week-end Août 2018"
      , fields =
            { newMember = ""
            , loginProjectID = ""
            , loginPassword = ""
            , newProjectName = ""
            , newProjectPassword = ""
            , newProjectEmail = ""
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
    { fields | newProjectName = value }


setNewProjectPassword : String -> Fields -> Fields
setNewProjectPassword value fields =
    { fields | newProjectPassword = value }


setNewProjectEmail : String -> Fields -> Fields
setNewProjectEmail value fields =
    { fields | newProjectEmail = value }


setLoginProjectID : String -> Fields -> Fields
setLoginProjectID value fields =
    { fields | loginProjectID = value }


setLoginPassword : String -> Fields -> Fields
setLoginPassword value fields =
    { fields | loginPassword = value }


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
            let
                fields =
                    setNewMemberName "" model.fields
            in
            ( { model
                | members = model.members ++ [ Member model.fields.newMember 0 ]
                , fields = fields
              }
            , Cmd.none
            )

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

                password =
                    model.fields.newProjectPassword

                email =
                    model.fields.newProjectEmail

                fields =
                    model.fields |> setNewProjectName "" |> setNewProjectPassword "" |> setNewProjectEmail ""
            in
            ( { model | fields = fields, auth = Basic projectID password }, Cmd.none )

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
            in
            ( { model | fields = fields, auth = Basic projectID password }, Cmd.none )

        LogoutUser ->
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
    case model.auth of
        Basic user password ->
            { title = t <| AppTitle (Just model.project)
            , body =
                [ navBarView t model.project model.locale
                , div
                    [ class "container-fluid" ]
                    [ sideBarView t model.fields.newMember model.members
                    , billBoardView t model.bills
                    ]
                , div [ class "messages" ] []
                , footerView t
                ]
            }

        Unauthenticated ->
            { title = t <| AppTitle Nothing
            , body =
                [ simpleNavBarView t model.locale
                , loginView t model.locale model.fields
                , footerView t
                ]
            }
