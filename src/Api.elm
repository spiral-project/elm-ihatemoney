module Api exposing
    ( addBillToProject
    , addMemberToProject
    , createProject
    , deleteProjectBill
    , deleteProjectMember
    , editProject
    , editProjectBill
    , editProjectMember
    , fetchProjectBills
    , fetchProjectInfo
    , reactivateProjectMember
    )

import Base64
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Slug
import Types exposing (..)
import Utils exposing (sortByLowerCaseName)


iHateMoneyUrl =
    "https://ihatemoney.org/api"


alwaysEncode : String -> String
alwaysEncode string =
    Base64.encode string


{-| Return the header name and value for the given `Auth`.

    headersForAuth (Basic "username" "password")

-}
headersForAuth : Authentication -> Http.Header
headersForAuth auth =
    case auth of
        Unauthenticated ->
            Http.header "Authorization" ""

        Basic username password ->
            Http.header "Authorization" ("Basic " ++ alwaysEncode (username ++ ":" ++ password))


encodeProject : String -> String -> String -> Encode.Value
encodeProject projectName projectCode projectEmail =
    let
        slug =
            case Slug.generate projectName of
                Just s ->
                    Slug.toString s

                Nothing ->
                    ""
    in
    Encode.object
        [ ( "name", Encode.string projectName )
        , ( "id", Encode.string slug )
        , ( "password", Encode.string projectCode )
        , ( "contact_email", Encode.string projectEmail )
        ]


encodeProjectEdit : String -> String -> String -> Encode.Value
encodeProjectEdit projectName projectCode projectEmail =
    Encode.object
        [ ( "name", Encode.string projectName )
        , ( "password", Encode.string projectCode )
        , ( "contact_email", Encode.string projectEmail )
        ]


createProject : String -> String -> String -> Cmd Msg
createProject projectName projectCode projectEmail =
    Http.request
        { method = "POST"
        , url = iHateMoneyUrl ++ "/projects"
        , headers = []
        , expect = Http.expectJson ProjectCreated Decode.string
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| encodeProject projectName projectCode projectEmail
        }


editProject : Authentication -> String -> String -> String -> Cmd Msg
editProject auth projectName projectCode projectEmail =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "PUT"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson ProjectEdited Decode.string
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| encodeProjectEdit projectName projectCode projectEmail
        }


decodeProjectInfo : Decode.Decoder Project
decodeProjectInfo =
    Decode.map4 Project
        (Decode.field "name" Decode.string)
        (Decode.field "contact_email" Decode.string)
        (Decode.field "members" <| Decode.map sortByLowerCaseName (Decode.list decodeMember))
        (Decode.succeed [])


decodeMember : Decode.Decoder Member
decodeMember =
    Decode.map4 Member
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "weight" Decode.int)
        (Decode.field "activated" Decode.bool)


fetchProjectInfo : Authentication -> String -> Cmd Msg
fetchProjectInfo auth projectID =
    Http.request
        { method = "GET"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson ProjectFetched decodeProjectInfo
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        }


decodeProjectBill : Decode.Decoder Bill
decodeProjectBill =
    Decode.map6 Bill
        (Decode.field "id" Decode.int)
        (Decode.field "date" Decode.string)
        (Decode.field "amount" Decode.float)
        (Decode.field "what" Decode.string)
        (Decode.field "payer_id" Decode.int)
        (Decode.field "owers" (Decode.list decodeMember))


fetchProjectBills : Authentication -> Cmd Msg
fetchProjectBills auth =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "GET"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/bills"
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson BillsFetched (Decode.list decodeProjectBill)
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        }


addMemberToProject : Authentication -> String -> Cmd Msg
addMemberToProject auth name =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "POST"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/members"
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson MemberAdded Decode.int
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| Encode.object [ ( "name", Encode.string name ) ]
        }


editProjectMember : Authentication -> Member -> Cmd Msg
editProjectMember auth member =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "PUT"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/members/" ++ String.fromInt member.id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson MemberEdited decodeMember
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| Encode.object [ ( "name", Encode.string member.name ), ( "weight", Encode.int member.weight ), ( "activated", Encode.bool member.activated ) ]
        }


deleteProjectMember : Authentication -> Int -> Cmd Msg
deleteProjectMember auth member_id =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "DELETE"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/members/" ++ String.fromInt member_id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson (MemberDeleted member_id) Decode.string
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        }


reactivateProjectMember : Authentication -> Member -> Cmd Msg
reactivateProjectMember auth member =
    editProjectMember auth { member | activated = True }


deleteProjectBill : Authentication -> Int -> Cmd Msg
deleteProjectBill auth bill_id =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "DELETE"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/bills/" ++ String.fromInt bill_id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson (BillDeleted bill_id) Decode.string
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        }


addBillToProject : Authentication -> Bill -> Cmd Msg
addBillToProject auth bill =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "POST"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/bills"
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson (BillUpdate bill) Decode.int
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| encodeBill bill
        }


editProjectBill : Authentication -> Bill -> Cmd Msg
editProjectBill auth bill =
    let
        projectID =
            case auth of
                Basic user _ ->
                    user

                Unauthenticated ->
                    ""
    in
    Http.request
        { method = "PUT"
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/bills/" ++ String.fromInt bill.id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson (BillUpdate bill) Decode.int
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| encodeBill bill
        }


encodeBill : Bill -> Encode.Value
encodeBill bill =
    let
        payed_for =
            List.map .id bill.owers
    in
    Encode.object
        [ ( "date", Encode.string bill.date )
        , ( "what", Encode.string bill.label )
        , ( "amount", Encode.float bill.amount )
        , ( "payer", Encode.int bill.payer )
        , ( "payed_for", Encode.list Encode.int payed_for )
        ]
