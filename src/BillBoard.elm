module BillBoard exposing (billBoardView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Ratio
import Types exposing (..)
import Utils exposing (displayAmount, sortByLowerCaseName)


billBoardView : Localizer -> List Member -> List Bill -> Html Msg
billBoardView t members bills =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ billBoardHeader t
        , billBoardTable t members bills
        ]


billBoardHeader : Localizer -> Html Msg
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
            , onClick <| EditModal <| BillModal Nothing
            ]
            [ text <| t AddNewBill ]
        ]


billBoardTable : Localizer -> List Member -> List Bill -> Html Msg
billBoardTable t members bills =
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
        , List.map (billInfoView t members) bills
            |> tbody []
        ]


billInfoView : Localizer -> List Member -> Bill -> Html Msg
billInfoView t members bill =
    let
        payerName =
            List.filter (\m -> m.id == bill.payer) members
                |> List.head
                |> Maybe.withDefault (Member 0 "Unknown" 1 False)
                |> .name
    in
    tr [ onMouseEnter <| SelectBill (Just bill), onMouseLeave <| SelectBill Nothing ]
        [ td [] [ text bill.date ]
        , td [] [ text payerName ]
        , td [] [ text bill.label ]
        , td []
            [ sortByLowerCaseName bill.owers
                |> List.map .name
                |> String.join ", "
                |> text
            ]
        , td []
            [ let
                amount =
                    displayAmount bill.amount

                numberOfShares =
                    List.map .weight bill.owers
                        |> List.sum

                amountEach =
                    displayAmount <| Ratio.divide bill.amount (Ratio.fromInt numberOfShares)
              in
              amount ++ t (Each amountEach) |> text
            ]
        , td [ class "bill-actions" ]
            [ a
                [ class "edit"
                , href "#"
                , title <| t Edit
                , onClick <| EditModal <| BillModal <| Just bill
                ]
                [ text <| t Edit ]
            , a
                [ class "delete"
                , href "#"
                , title <| t Delete
                , onClick <| RemoveBill bill
                ]
                [ text <| t Delete ]
            ]
        ]
