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
            [ text <| t AddNewBill ]
        ]


billBoardTable : (LocaleIdentifier -> String) -> List Bill -> Html Msg
billBoardTable t bills =
    table [ id "bill_table", class "col table table-striped table-hover" ]
        [ thead []
            [ tr []
                [ th [] [ text <| t When ]
                , th [] [ text <| t WhoPaid ]
                , th [] [ text <| t ForWhat ]
                , th [] [ text <| t ForWhom ]
                , th [] [ text <| t HowMuch ]
                , th [] [ text <| t Actions ]
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
              amount ++ t (Each amountEach) |> text
            ]
        , td [ class "bill-actions" ]
            [ a [ class "edit", href "#", title <| t Edit ] [ text <| t Edit ]
            , a [ class "delete", href "#", title <| t Delete ] [ text <| t Delete ]
            ]
        ]
