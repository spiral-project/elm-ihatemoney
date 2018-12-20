module BillBoard exposing (billBoardView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


billBoardView : Model -> Html Msg
billBoardView model =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ billBoardHeader model
        , billBoardTable model.bills
        ]


billBoardHeader : Model -> Html Msg
billBoardHeader model =
    div []
        [ div [ class "identifier" ]
            [ a [ href "#" ] [ text "Invite people to join this project!" ] ]
        , a
            [ id "new-bill"
            , href "#"
            , class "btn btn-primary"
            , attribute "data-toggle" "modal"
            , attribute "data-target" "#bill-form"
            ]
            [ text "Add a new bill" ]
        ]


billBoardTable : List Bill -> Html Msg
billBoardTable bills =
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
        , List.map billInfoView bills
            |> tbody []
        ]


billInfoView : Bill -> Html Msg
billInfoView bill =
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
