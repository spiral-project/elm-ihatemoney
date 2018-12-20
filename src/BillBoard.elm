module BillBoard exposing (billBoardView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


billBoardView : (LocaleIdentifier -> String) -> List Bill -> Html Msg
billBoardView t bills =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ billBoardHeader t
        , billBoardTable t bills
        ]


billBoardHeader : (LocaleIdentifier -> String) -> Html Msg
billBoardHeader t =
    div []
        [ div [ class "identifier" ]
            [ a [ href "#" ] [ text <| t Invite ] ]
        , a
            [ id "new-bill"
            , href "#"
            , class "btn btn-primary"
            , attribute "data-toggle" "modal"
            , attribute "data-target" "#bill-form"
            ]
            [ text "Add a new bill" ]
        ]


billBoardTable : (LocaleIdentifier -> String) -> List Bill -> Html Msg
billBoardTable t bills =
    table [ id "bill_table", class "col table table-striped table-hover" ]
        [ thead []
            [ tr []
                [ th [] [ text "When?" ]
                , th [] [ text "Who paid?" ]
                , th [] [ text "For what?" ]
                , th [] [ text "For whom?" ]
                , th [] [ text "How much?" ]
                , th [] [ text "Actions" ]
                ]
            ]
        , List.map (billInfoView t) bills
            |> tbody []
        ]


billInfoView : (LocaleIdentifier -> String) -> Bill -> Html Msg
billInfoView t bill =
    tr []
        [ td [] [ text bill.date ]
        , td [] [ text bill.payer ]
        , td [] [ text bill.label ]
        , td []
            [ List.sort bill.owers
                |> String.join ", "
                |> text
            ]
        , td []
            [ let
                amount =
                    round 2 bill.amount

                numberOfPeople =
                    List.length bill.owers |> toFloat

                amountEach =
                    round 2 <| bill.amount / numberOfPeople
              in
              amount
                ++ " ("
                ++ amountEach
                ++ " each)"
                |> text
            ]
        , td [ class "bill-actions" ]
            [ a [ class "edit", href "#", title "edit" ] [ text "edit" ]
            , a [ class "delete", href "#", title "delete" ] [ text "delete" ]
            ]
        ]
