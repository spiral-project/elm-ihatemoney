module Main exposing (main)

import Api
    exposing
        ( addBillToProject
        , addMemberToProject
        , createProject
        , deleteProjectBill
        , deleteProjectMember
        , editProject
        , editProjectBill
        , editProjectMember
        , fetchProjectBills
        , fetchProjectInfo
        , reactivateProjectMember
        )
import BillBoard exposing (billBoardView)
import Browser exposing (Document)
import Browser.Dom as Dom
import Footer exposing (footerView)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Locales exposing (getString)
import Login exposing (loginView)
import Modal exposing (handleModal)
import NavBar exposing (navBarView, simpleNavBarView)
import Round exposing (round)
import Settle exposing (settleView)
import SideBar exposing (sideBarView)
import Slug
import Statistic exposing (statisticView)
import Task
import Types exposing (..)
import Utils exposing (sortByLowerCaseName)


init : () -> ( Model, Cmd Msg )
init flags =
    ( { auth = Unauthenticated
      , page = BillsPage
      , locale = EN
      , project = Nothing
      , fields =
            { newMember = ""
            , newMemberWeight = ""
            , loginProjectID = ""
            , loginPassword = ""
            , projectName = ""
            , projectPassword = ""
            , projectEmail = ""
            , projectError = Nothing
            , currentAmount = ""
            }
      , modal = Hidden
      , selectedBill = Nothing
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


setMemberToProject : Member -> Project -> Project
setMemberToProject member project =
    { project | members = sortByLowerCaseName (project.members ++ [ member ]) }


setEditedProjectMember : Member -> Project -> Project
setEditedProjectMember member project =
    let
        members =
            List.filter (\m -> m.id /= member.id) project.members
                |> List.append [ member ]
                |> sortByLowerCaseName
    in
    { project | members = members }


setDeletedProjectMember : Int -> Project -> Project
setDeletedProjectMember member_id project =
    let
        selectedMember =
            List.filter (\m -> m.id == member_id) project.members |> List.head
    in
    case selectedMember of
        Nothing ->
            project

        Just member ->
            let
                newMember =
                    { member | activated = False }

                members =
                    List.filter (\m -> m.id /= member.id) project.members
                        |> List.append [ newMember ]
                        |> sortByLowerCaseName
            in
            { project | members = members }


setDeletedProjectBill : Int -> Project -> Project
setDeletedProjectBill bill_id project =
    let
        bills =
            List.filter (\b -> b.id /= bill_id) project.bills
    in
    { project | bills = bills }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ fields } as model) =
    case msg of
        NewMemberName value ->
            ( { model | fields = { fields | newMember = value } }, Cmd.none )

        NewMemberWeight value ->
            ( { model | fields = { fields | newMemberWeight = value } }, Cmd.none )

        AddMember ->
            case model.project of
                Just project ->
                    ( model, addMemberToProject model.auth model.fields.newMember )

                Nothing ->
                    ( model, Cmd.none )

        TriggerAddBill bill ->
            case model.project of
                Just project ->
                    let
                        payer =
                            if bill.payer == 0 then
                                List.filter (\m -> m.activated) project.members
                                    |> List.map .id
                                    |> List.head
                                    |> Maybe.withDefault 0

                            else
                                bill.payer
                    in
                    ( { model | fields = { fields | currentAmount = "" } }
                    , addBillToProject model.auth { bill | payer = payer }
                    )

                Nothing ->
                    ( model, Cmd.none )

        TriggerEditBill bill ->
            case model.project of
                Just project ->
                    ( { model | fields = { fields | currentAmount = "" } }
                    , editProjectBill model.auth bill
                    )

                Nothing ->
                    ( model, Cmd.none )

        TriggerEditMember member_id ->
            case model.project of
                Just project ->
                    ( model
                    , editProjectMember model.auth
                        { id = member_id
                        , name = model.fields.newMember
                        , weight = Maybe.withDefault 1 <| String.toInt model.fields.newMemberWeight
                        , activated = True
                        }
                    )

                Nothing ->
                    ( model, Cmd.none )

        TriggerEditProject ->
            case model.project of
                Just project ->
                    ( { model
                        | fields =
                            { fields
                                | projectName = ""
                                , projectPassword = ""
                                , projectEmail = ""
                            }
                      }
                    , editProject model.auth fields.projectName fields.projectPassword fields.projectEmail
                    )

                Nothing ->
                    ( model, Cmd.none )

        ReactivateMember member ->
            case model.project of
                Just project ->
                    ( model
                    , reactivateProjectMember model.auth member
                    )

                Nothing ->
                    ( model, Cmd.none )

        MemberAdded (Ok id) ->
            case model.project of
                Just project ->
                    let
                        member =
                            Member id model.fields.newMember 1 True

                        newProject =
                            setMemberToProject member project
                    in
                    ( { model
                        | project = Just newProject
                        , fields = { fields | newMember = "" }
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        MemberAdded (Err err) ->
            let
                _ =
                    Debug.log "Error while adding the member" err
            in
            ( model, Cmd.none )

        MemberEdited (Ok member) ->
            case model.project of
                Just project ->
                    let
                        newProject =
                            setEditedProjectMember member project
                    in
                    ( { model
                        | project = Just newProject
                        , fields = { fields | newMember = "", newMemberWeight = "" }
                        , modal = Hidden
                      }
                    , fetchProjectBills model.auth
                    )

                Nothing ->
                    ( { model | modal = Hidden }, Cmd.none )

        MemberEdited (Err err) ->
            let
                _ =
                    Debug.log "Error while editing the member" err
            in
            ( { model | modal = Hidden }, Cmd.none )

        MemberDeleted member_id (Ok _) ->
            case model.project of
                Just project ->
                    let
                        newProject =
                            setDeletedProjectMember member_id project
                    in
                    ( { model
                        | project = Just newProject
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        MemberDeleted member_id (Err err) ->
            let
                _ =
                    Debug.log ("Error while removing the member " ++ String.fromInt member_id) err
            in
            ( model, Cmd.none )

        NewProjectName value ->
            ( { model
                | fields =
                    { fields
                        | projectName = value
                        , projectError = Nothing
                    }
              }
            , Cmd.none
            )

        NewProjectPassword value ->
            ( { model | fields = { fields | projectPassword = value } }, Cmd.none )

        NewProjectEmail value ->
            ( { model | fields = { fields | projectEmail = value } }, Cmd.none )

        CreateProject ->
            let
                projectID =
                    model.fields.projectName

                slug =
                    Slug.generate projectID

                password =
                    model.fields.projectPassword

                email =
                    model.fields.projectEmail
            in
            case slug of
                Just _ ->
                    ( { model
                        | fields =
                            { fields
                                | projectName = ""
                                , projectError = Nothing
                                , projectPassword = ""
                                , projectEmail = ""
                            }
                        , auth = Basic projectID password
                      }
                    , createProject projectID password email
                    )

                Nothing ->
                    ( { model
                        | fields =
                            { fields
                                | projectError = Just <| "Invalid project name: " ++ projectID
                            }
                      }
                    , Cmd.none
                    )

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
            , fetchProjectInfo auth
            )

        ProjectCreated (Err err) ->
            let
                _ =
                    Debug.log "Error while creating the project" err
            in
            ( model, Cmd.none )

        ProjectEdited (Ok _) ->
            let
                projectID =
                    case model.auth of
                        Basic user _ ->
                            user

                        Unauthenticated ->
                            ""
            in
            ( { model | modal = Hidden }
            , fetchProjectInfo model.auth
            )

        ProjectEdited (Err err) ->
            let
                _ =
                    Debug.log "Error while creating the project" err
            in
            ( model, Cmd.none )

        LoginProjectID value ->
            ( { model | fields = { fields | loginProjectID = value } }, Cmd.none )

        LoginPassword value ->
            ( { model | fields = { fields | loginPassword = value } }, Cmd.none )

        Login ->
            let
                projectID =
                    String.toLower model.fields.loginProjectID

                password =
                    model.fields.loginPassword

                auth =
                    Basic projectID password
            in
            ( { model
                | fields =
                    { fields
                        | loginProjectID = ""
                        , loginPassword = ""
                    }
                , auth = auth
              }
            , fetchProjectInfo auth
            )

        Refresh ->
            ( model, fetchProjectInfo model.auth )

        DemoLogin ->
            let
                auth =
                    Basic "demo" "demo"
            in
            ( { model
                | fields =
                    { fields
                        | loginProjectID = ""
                        , loginPassword = ""
                    }
                , auth = auth
              }
            , fetchProjectInfo auth
            )

        LogoutUser ->
            ( { model
                | auth = Unauthenticated
                , project = Nothing
                , modal = Hidden
                , selectedBill = Nothing
              }
            , Task.attempt (\_ -> NoOp) (Dom.focus "id")
            )

        LogoutUserAndCreate ->
            ( { model
                | auth = Unauthenticated
                , project = Nothing
                , modal = Hidden
                , selectedBill = Nothing
              }
            , Task.attempt (\_ -> NoOp) (Dom.focus "name")
            )

        ProjectFetched (Ok project) ->
            ( { model | project = Just project }, fetchProjectBills model.auth )

        ProjectFetched (Err err) ->
            let
                _ =
                    Debug.log "Error while loading the project" err
            in
            ( { model | auth = Unauthenticated }, Cmd.none )

        BillsFetched (Ok bills) ->
            case model.project of
                Just project ->
                    let
                        newProject =
                            { project | bills = bills }
                    in
                    ( { model
                        | project = Just newProject
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        BillsFetched (Err err) ->
            let
                _ =
                    Debug.log "Error while loading the project bills" err
            in
            ( { model | auth = Unauthenticated }, Cmd.none )

        ChangeLocale locale ->
            ( { model | locale = locale }, Cmd.none )

        EditModal modal_type ->
            case model.project of
                Just project ->
                    case modal_type of
                        MemberModal member_id ->
                            let
                                getMember =
                                    List.filter (\m -> m.id == member_id) project.members |> List.head
                            in
                            case getMember of
                                Just member ->
                                    ( { model
                                        | modal = modal_type
                                        , fields =
                                            { fields
                                                | newMember = member.name
                                                , newMemberWeight = String.fromInt member.weight
                                            }
                                      }
                                    , Cmd.none
                                    )

                                Nothing ->
                                    ( model, Cmd.none )

                        BillModal maybeBill ->
                            case maybeBill of
                                Nothing ->
                                    -- Add a new bill
                                    ( { model
                                        | modal = modal_type
                                        , selectedBill = Just emptyBill
                                      }
                                    , Cmd.none
                                    )

                                Just bill ->
                                    -- Edit bill
                                    ( { model
                                        | modal = modal_type
                                        , selectedBill = Just bill
                                        , fields = { fields | currentAmount = String.fromFloat bill.amount }
                                      }
                                    , Cmd.none
                                    )

                        ProjectOptions ->
                            ( { model
                                | modal = modal_type
                                , fields =
                                    { fields
                                        | projectName = project.name
                                        , projectPassword = ""
                                        , projectEmail = project.contact_email
                                    }
                              }
                            , Cmd.none
                            )

                        Hidden ->
                            ( { model
                                | modal = modal_type
                                , fields = { fields | newMember = "", newMemberWeight = "" }
                                , selectedBill = Nothing
                              }
                            , Cmd.none
                            )

                Nothing ->
                    ( model, Cmd.none )

        DeactivateMember member_id ->
            case model.project of
                Just project ->
                    ( model
                    , deleteProjectMember model.auth member_id
                    )

                Nothing ->
                    ( model, Cmd.none )

        SelectBill bill ->
            case model.modal of
                Hidden ->
                    ( { model | selectedBill = bill }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        RemoveBill bill ->
            case model.project of
                Just project ->
                    ( model
                    , deleteProjectBill model.auth bill.id
                    )

                Nothing ->
                    ( model, Cmd.none )

        BillUpdate bill (Ok id) ->
            case model.project of
                Just project ->
                    let
                        newBill =
                            { bill | id = id }

                        newProject =
                            { project
                                | bills =
                                    List.filter (\b -> b.id /= bill.id) project.bills
                                        |> List.append [ newBill ]
                                        |> List.sortBy (\b -> b.date ++ String.fromInt b.id)
                                        |> List.reverse
                            }
                    in
                    ( { model
                        | project = Just newProject
                        , selectedBill = Nothing
                        , modal = Hidden
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        BillUpdate bill (Err err) ->
            let
                _ =
                    Debug.log "Error while adding the bill" err
            in
            ( model, Cmd.none )

        BillDeleted bill_id (Ok _) ->
            case model.project of
                Just project ->
                    let
                        newProject =
                            setDeletedProjectBill bill_id project
                    in
                    ( { model
                        | project = Just newProject
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        BillDeleted bill_id (Err err) ->
            let
                _ =
                    Debug.log ("Error while removing the bill " ++ String.fromInt bill_id) err
            in
            ( model, Cmd.none )

        NewBillDate bill date ->
            ( { model | selectedBill = Just { bill | date = date } }, Cmd.none )

        NewBillLabel bill label ->
            ( { model | selectedBill = Just { bill | label = label } }, Cmd.none )

        NewBillPayer bill payer ->
            ( { model | selectedBill = Just { bill | payer = payer } }, Cmd.none )

        NewBillAmount bill amount ->
            ( { model
                | fields = { fields | currentAmount = amount }
                , selectedBill =
                    Just
                        { bill
                            | amount =
                                Maybe.withDefault 0.0 <|
                                    String.toFloat amount
                        }
              }
            , Cmd.none
            )

        NewBillToggleOwer bill ower ->
            let
                isOwer =
                    (List.filter (\o -> o.id == ower.id) bill.owers |> List.length) == 1
            in
            if isOwer then
                ( { model | selectedBill = Just { bill | owers = List.filter (\o -> o.id /= ower.id) bill.owers } }
                , Cmd.none
                )

            else
                ( { model | selectedBill = Just { bill | owers = List.append bill.owers [ ower ] } }
                , Cmd.none
                )

        NewBillToggleAllOwers bill members ->
            ( { model | selectedBill = Just { bill | owers = members } }, Cmd.none )

        NewBillToggleNoneOwers bill ->
            ( { model | selectedBill = Just { bill | owers = [] } }, Cmd.none )

        SelectPage page ->
            ( { model | page = page }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


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
                [ navBarView t project model.locale model.page
                , handleModal t model project
                , div
                    [ class "container-fluid" ]
                    [ sideBarView t model.fields.newMember project.members project.bills model.selectedBill
                    , case model.page of
                        BillsPage ->
                            billBoardView t project.members project.bills

                        SettlePage ->
                            settleView t project.members project.bills

                        StatisticPage ->
                            statisticView t project.members project.bills
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
