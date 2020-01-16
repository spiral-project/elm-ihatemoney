module Settle exposing (buildTransactions, settleView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round
import Types exposing (..)
import Utils exposing (getMemberBalance, sortByLowerCaseName)


settleView : Localizer -> List Member -> List Bill -> Html Msg
settleView t members bills =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ table [ id "bill_table", class "col table table-striped table-hover" ]
            [ thead []
                [ tr []
                    [ th [] [ text <| t WhoShouldPay ]
                    , th [] [ text <| t ForWhom ]
                    , th [] [ text <| t HowMuch ]
                    ]
                ]
            , settleInfoView t members bills
                |> tbody []
            ]
        ]


buildTransactions : List Member -> List Bill -> List ( Member, Float, Member )
buildTransactions members bills =
    let
        membersBalance =
            List.map (\member -> ( member, getMemberBalance bills member )) members

        owers =
            List.filter (\( member, balance ) -> balance < 0.0) membersBalance
                |> List.sortBy Tuple.second

        owes =
            List.filter (\( member, balance ) -> balance > 0.0) membersBalance
                |> List.sortBy Tuple.second
                |> List.reverse
    in
    reduceBalance [] owers owes
        |> List.reverse


settleInfoView : Localizer -> List Member -> List Bill -> List (Html Msg)
settleInfoView t members bills =
    let
        transactions =
            buildTransactions members bills
    in
    List.map showTransaction transactions


reduceBalance : List ( Member, Float, Member ) -> List ( Member, Float ) -> List ( Member, Float ) -> List ( Member, Float, Member )
reduceBalance results owers owes =
    case owers of
        ( ower, ower_balance ) :: remaining_owers ->
            case owes of
                ( owe, owe_balance ) :: remaining_owes ->
                    let
                        amount =
                            if abs ower_balance > abs owe_balance then
                                abs owe_balance

                            else
                                abs ower_balance

                        newResult =
                            List.append [ ( ower, amount, owe ) ] results

                        newOwerBalance =
                            ower_balance + amount

                        newOwers =
                            if newOwerBalance < 0 then
                                List.append [ ( ower, newOwerBalance ) ] remaining_owers
                                    |> List.sortBy Tuple.second

                            else
                                remaining_owers

                        newOweBalance =
                            owe_balance - amount

                        newOwes =
                            if newOweBalance > 0 then
                                List.append [ ( owe, newOweBalance ) ] remaining_owes
                                    |> List.sortBy Tuple.second
                                    |> List.reverse

                            else
                                remaining_owes
                    in
                    reduceBalance newResult newOwers newOwes

                [] ->
                    results

        [] ->
            results


showTransaction : ( Member, Float, Member ) -> Html Msg
showTransaction ( ower, amount, owe ) =
    tr []
        [ td [] [ text ower.name ]
        , td [] [ text <| Round.round 2 amount ]
        , td [] [ text owe.name ]
        ]
