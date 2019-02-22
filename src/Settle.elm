module Settle exposing (settleView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
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


settleInfoView : Localizer -> List Member -> List Bill -> List (Html Msg)
settleInfoView t members bills =
    let
        membersBalance =
            List.map (\member -> ( member, getMemberBalance bills member )) members

        owers =
            List.filter (\( member, balance ) -> balance < 0.0) membersBalance
                |> List.sortBy Tuple.second
                |> Debug.log "owers"

        owes =
            List.filter (\( member, balance ) -> balance > 0.0) membersBalance
                |> List.sortBy Tuple.second
                |> List.reverse
                |> Debug.log "owes"

        transactions =
            reduceBalance [] owers owes
                |> List.reverse
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

                        _ =
                            Debug.log "amount" amount

                        newResult =
                            List.append [ ( ower, amount, owe ) ] results

                        newOwerBalance =
                            (ower_balance + amount)
                                |> Debug.log "newOwerBalance"

                        newOwers =
                            (if newOwerBalance < 0 then
                                List.append [ ( ower, newOwerBalance ) ] remaining_owers
                                    |> List.sortBy Tuple.second

                             else
                                remaining_owers
                            )
                                |> Debug.log "newOwers"

                        newOweBalance =
                            (owe_balance - amount)
                                |> Debug.log "newOweBalance"

                        newOwes =
                            (if newOweBalance > 0 then
                                List.append [ ( owe, newOweBalance ) ] remaining_owes
                                    |> List.sortBy Tuple.second
                                    |> List.reverse

                             else
                                remaining_owes
                            )
                                |> Debug.log "newOwes"
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
        , td [] [ text <| round 2 amount ]
        , td [] [ text owe.name ]
        ]
