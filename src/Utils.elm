module Utils exposing (getMemberBalance, sortByLowerCaseName)

import Types exposing (..)


sortByLowerCaseName : List { a | name : String } -> List { a | name : String }
sortByLowerCaseName =
    List.sortBy (String.toLower << .name)


getMemberBalance : List Bill -> Member -> Float
getMemberBalance bills member =
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
    totalPaid - totalOwed
