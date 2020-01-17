module Utils exposing (displayAmount, getMemberBalance, getMemberStats, sortByLowerCaseName)

import Ratio exposing (Rational)
import Round
import Types exposing (..)


sortByLowerCaseName : List { a | name : String } -> List { a | name : String }
sortByLowerCaseName =
    List.sortBy (String.toLower << .name)


getMemberStats : List Bill -> Member -> ( Rational, Rational )
getMemberStats bills member =
    let
        sum =
            List.foldl Ratio.add (Ratio.fromInt 0)

        totalPaid =
            List.filter (\bill -> bill.payer == member.id) bills
                |> List.map .amount
                |> sum

        -- Return the sum of the shares
        billsShares =
            List.filter (\bill -> List.any (\ower -> ower.id == member.id) bill.owers) bills
                |> List.map
                    (\bill ->
                        Ratio.divide
                            bill.amount
                            (List.map .weight bill.owers |> List.sum |> Ratio.fromInt)
                    )
                |> sum

        totalOwed =
            Ratio.multiply billsShares (Ratio.fromInt member.weight)
    in
    ( totalPaid, totalOwed )


getMemberBalance : List Bill -> Member -> Rational
getMemberBalance bills member =
    let
        ( totalPaid, totalOwed ) =
            getMemberStats bills member
    in
    Ratio.subtract totalPaid totalOwed


displayAmount : Rational -> String
displayAmount amount =
    Round.round 2 <| Ratio.toFloat amount / 100
