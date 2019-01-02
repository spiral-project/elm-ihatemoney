module Modal exposing (handleModal)

import Capitalize exposing (toCapital)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


handleModal : Localizer -> Model -> Project -> Html Msg
handleModal t model project =
    case model.modal of
        MemberModal member_id ->
            fieldset []
                [ div [ class "form-group row" ]
                    [ label [ class "col-3", for "name" ] [ text <| t Name ]
                    , div [ class "controls col-9" ]
                        [ input
                            [ class "form-control"
                            , id "name"
                            , type_ "text"
                            , value model.fields.newMember
                            , onInput NewMemberName
                            ]
                            []
                        ]
                    ]
                , div [ class "form-group row" ]
                    [ label [ class "col-3", for "weight" ] [ text <| t Weight ]
                    , div [ class "controls col-9" ]
                        [ input
                            [ class "form-control"
                            , id "weight"
                            , type_ "number"
                            , onInput NewMemberWeight
                            , Html.Attributes.min "0"
                            , Html.Attributes.step "1"
                            , value model.fields.newMemberWeight
                            ]
                            []
                        ]
                    ]
                ]
                |> modalView (t EditMember) (toCapital <| t Edit) (t Cancel) (TriggerEditMember member_id)

        BillModal initial_bill ->
            let
                modalTitle =
                    case initial_bill of
                        Nothing ->
                            AddNewBill

                        Just _ ->
                            EditBill

                submitButton =
                    case initial_bill of
                        Nothing ->
                            Add

                        Just _ ->
                            Edit

                bill =
                    Maybe.withDefault emptyBill model.selectedBill

                submitEvent =
                    case initial_bill of
                        Nothing ->
                            TriggerAddBill bill

                        Just _ ->
                            TriggerEditBill bill

                projectActiveMembers =
                    List.filter (\m -> m.activated) project.members
            in
            fieldset []
                [ div [ class "form-group row" ]
                    [ label [ class "col-3", for "date" ] [ text <| t Date ]
                    , div [ class "controls col-9" ]
                        [ input
                            [ class "form-control"
                            , id "date"
                            , type_ "date"
                            , value bill.date
                            , onInput (NewBillDate bill)
                            ]
                            []
                        ]
                    ]
                , div [ class "form-group row" ]
                    [ label [ class "col-3", for "label" ] [ text <| t What ]
                    , div [ class "controls col-9" ]
                        [ input
                            [ class "form-control"
                            , id "label"
                            , type_ "text"
                            , value bill.label
                            , onInput (NewBillLabel bill)
                            ]
                            []
                        ]
                    ]
                , div [ class "form-group row" ]
                    [ label [ class "col-3", for "payer" ] [ text <| t Payer ]
                    , div [ class "controls col-9" ]
                        [ let
                            -- TODO: Handle case where payer is not an active user
                            payerOption =
                                \member ->
                                    option
                                        [ value <| String.fromInt member.id
                                        , selected (member.id == bill.payer)
                                        , onClick (NewBillPayer bill member.id)
                                        ]
                                        [ text member.name ]
                          in
                          List.map payerOption projectActiveMembers
                            |> select [ class "form-control custom-select", id "payer", name "payer" ]
                        ]
                    ]
                , div [ class "form-group row" ]
                    [ label [ class "col-3", for "amount" ] [ text <| t Amount ]
                    , div [ class "controls col-9" ]
                        [ input
                            [ class "form-control"
                            , id "amount"
                            , name "amount"
                            , step "0.01"
                            , Html.Attributes.min "0.00"
                            , type_ "number"
                            , value <| round 2 bill.amount
                            , onInput <| NewBillAmount bill
                            ]
                            []
                        ]
                    ]
                , owersListView t bill projectActiveMembers
                ]
                |> modalView (t modalTitle) (toCapital <| t submitButton) (t Cancel) submitEvent

        Hidden ->
            div [] []


owersListView : Localizer -> Bill -> List Member -> Html Msg
owersListView t bill members =
    div [ class "form-group row" ]
        [ label [ class "col-3", for "payed_for" ] [ text <| t Owers ]
        , div [ class "controls col-9" ]
            [ List.map (displayOwer bill) members
                |> List.append
                    [ p []
                        [ a [ href "#", id "selectall", onClick <| NewBillToggleAllOwers bill members ] [ text <| t SelectAll ]
                        , text " | "
                        , a [ href "#", id "selectnone", onClick <| NewBillToggleNoneOwers bill ] [ text <| t SelectNone ]
                        ]
                    ]
                |> ul [ id "payed_for", class "inputs-list" ]
            ]
        ]


displayOwer : Bill -> Member -> Html Msg
displayOwer bill member =
    let
        isOwer =
            (List.filter (\o -> o.id == member.id) bill.owers |> List.length) == 1
    in
    p [ class "form-check" ]
        [ label [ for ("payed_for-" ++ String.fromInt member.id), class "form-check-label" ]
            [ input
                [ name "payed_for"
                , type_ "checkbox"
                , checked isOwer
                , class "form-check-input"
                , id ("payed_for-" ++ String.fromInt member.id)
                , onClick <| NewBillToggleOwer bill member
                ]
                []
            , span [] [ text member.name ]
            ]
        ]


modalView : String -> String -> String -> Msg -> Html Msg -> Html Msg
modalView title submitTitle cancelTitle msg form =
    div [ class "modal fade show", attribute "role" "dialog", style "display" "block" ]
        [ div [ class "modal-dialog", attribute "role" "document" ]
            [ div [ class "modal-content" ]
                [ div [ class "modal-header" ]
                    [ h3 [ class "modal-title" ] [ text title ]
                    , a [ href "#", class "close", onClick <| EditModal Hidden ] [ text "×" ]
                    ]
                , Html.form [ class "modal-body container", onSubmit msg ]
                    [ form
                    , div [ class "actions" ]
                        [ input [ class "btn btn-primary", type_ "submit", value submitTitle ] []
                        , input
                            [ class "btn"
                            , type_ "button"
                            , onClick <| EditModal Hidden
                            , value cancelTitle
                            ]
                            []
                        ]
                    ]
                ]
            ]
        ]
