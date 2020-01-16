module Settle exposing (buildTransactions, settleView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Ratio exposing (Rational)
import Types exposing (..)
import Utils exposing (displayAmount, getMemberBalance, sortByLowerCaseName)


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


buildTransactions : List Member -> List Bill -> List ( Member, Rational, Member )
buildTransactions members bills =
    let
        membersBalance =
            List.map (\member -> ( member, getMemberBalance bills member )) members

        owers =
            List.filter (\( member, balance ) -> Ratio.lt balance (Ratio.fromInt 0)) membersBalance
                |> List.sortBy (Tuple.second >> Ratio.toFloat)

        owes =
            List.filter (\( member, balance ) -> Ratio.gt balance (Ratio.fromInt 0)) membersBalance
                |> List.sortBy (Tuple.second >> Ratio.toFloat)
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


reduceBalance : List ( Member, Rational, Member ) -> List ( Member, Rational ) -> List ( Member, Rational ) -> List ( Member, Rational, Member )
reduceBalance results owers owes =
    case owers of
        ( ower, ower_balance ) :: remaining_owers ->
            case owes of
                ( owe, owe_balance ) :: remaining_owes ->
                    let
                        amount =
                            if Ratio.gt (Ratio.abs ower_balance) (Ratio.abs owe_balance) then
                                Ratio.abs owe_balance

                            else
                                Ratio.abs ower_balance

                        newResult =
                            List.append [ ( ower, amount, owe ) ] results

                        newOwerBalance =
                            Ratio.add ower_balance amount

                        newOwers =
                            if Ratio.lt newOwerBalance (Ratio.fromInt 0) then
                                List.append [ ( ower, newOwerBalance ) ] remaining_owers
                                    |> List.sortBy (Tuple.second >> Ratio.toFloat)

                            else
                                remaining_owers

                        newOweBalance =
                            Ratio.subtract owe_balance amount

                        newOwes =
                            if Ratio.gt newOweBalance (Ratio.fromInt 0) then
                                List.append [ ( owe, newOweBalance ) ] remaining_owes
                                    |> List.sortBy (Tuple.second >> Ratio.toFloat)
                                    |> List.reverse

                            else
                                remaining_owes
                    in
                    reduceBalance newResult newOwers newOwes

                [] ->
                    results

        [] ->
            results


showTransaction : ( Member, Rational, Member ) -> Html Msg
showTransaction ( ower, amount, owe ) =
    tr []
        [ td [] [ text ower.name ]
        , td [] [ text <| displayAmount amount ]
        , td [] [ text owe.name ]
        ]
