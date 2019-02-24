module Data exposing (buildBillsDataUrl)

import Base64
import Json.Encode as Encode
import Types exposing (Bill, Member, Project)


encodeMember : Member -> Encode.Value
encodeMember member =
    Encode.object [ ( "name", Encode.string member.name ), ( "weight", Encode.int member.weight ), ( "activated", Encode.bool member.activated ) ]


encodeBill : List Member -> Bill -> Encode.Value
encodeBill members bill =
    let
        payed_for =
            List.map .id bill.owers

        memberIds ids =
            List.filter (\m -> List.member m.id ids) members
                |> List.map .name
                |> List.sort

        payerName =
            List.filter (\m -> m.id == bill.payer) members
                |> List.head
                |> Maybe.withDefault (Member 0 "Unknown" 1 False)
                |> .name
    in
    Encode.object
        [ ( "date", Encode.string bill.date )
        , ( "what", Encode.string bill.label )
        , ( "amount", Encode.float bill.amount )
        , ( "payer", Encode.string payerName )
        , ( "payed_for", Encode.list Encode.string <| memberIds payed_for )
        ]


buildBillsDataUrl : Project -> String
buildBillsDataUrl project =
    Encode.object
        [ ( "bills", Encode.list (encodeBill project.members) project.bills )
        , ( "name", Encode.string project.name )
        ]
        |> Encode.encode 2
        |> Base64.encode
        |> (++) "data:application/json;base64,"
