module Utils exposing (getMemberBalance, getMemberStats, sortByLowerCaseName)

import Types exposing (..)


sortByLowerCaseName : List { a | name : String } -> List { a | name : String }
sortByLowerCaseName =
    List.sortBy (String.toLower << .name)


getMemberStats : List Bill -> Member -> ( Float, Float )
getMemberStats bills member =
    let
        totalPaid =
            List.filter (\bill -> bill.payer == member.id) bills
                |> List.map .amount
                |> List.sum

        -- Return the sum of the shares
        billsShares =
            List.filter (\bill -> List.any (\ower -> ower.id == member.id) bill.owers) bills
                |> List.map
                    (\bill ->
                        bill.amount
                            / (List.map .weight bill.owers
                                |> List.sum
                                |> toFloat
                              )
                    )
                |> List.sum

        totalOwed =
            billsShares * toFloat member.weight
    in
    ( totalPaid, totalOwed )


getMemberBalance : List Bill -> Member -> Float
getMemberBalance bills member =
    let
        ( totalPaid, totalOwed ) =
            getMemberStats bills member
    in
    totalPaid - totalOwed
