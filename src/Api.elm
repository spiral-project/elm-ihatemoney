module Api exposing
    ( addMemberToProject
    , createProject
    , deleteProjectMember
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


decodeProjectInfo : Decode.Decoder Project
decodeProjectInfo =
    Decode.map4 Project
        (Decode.field "name" Decode.string)
        (Decode.field "contact_email" Decode.string)
        (Decode.field "members" <| Decode.map (List.sortBy .name) (Decode.list decodeMember))
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
    Decode.map5 Bill
        (Decode.field "date" Decode.string)
        (Decode.field "amount" Decode.float)
        (Decode.field "what" Decode.string)
        (Decode.field "payer_id" Decode.int)
        (Decode.field "owers" (Decode.list decodeMember))


fetchProjectBills : Authentication -> String -> Cmd Msg
fetchProjectBills auth projectID =
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


editProjectMember : Authentication -> Int -> String -> Int -> Cmd Msg
editProjectMember auth member_id name weight =
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
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/members/" ++ String.fromInt member_id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson MemberEdited decodeMember
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| Encode.object [ ( "name", Encode.string name ), ( "weight", Encode.int weight ) ]
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


reactivateProjectMember : Authentication -> Int -> String -> Cmd Msg
reactivateProjectMember auth member_id name =
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
        , url = iHateMoneyUrl ++ "/projects/" ++ projectID ++ "/members/" ++ String.fromInt member_id
        , headers = [ headersForAuth auth ]
        , expect = Http.expectJson MemberEdited decodeMember
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody <| Encode.object [ ( "name", Encode.string name ), ( "activated", Encode.bool True ) ]
        }