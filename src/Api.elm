module Api exposing (addMemberToProject, createProject, fetchProjectInfo)

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
        (Decode.field "members" <| Decode.list decodeMember)
        (Decode.succeed [])


decodeMember : Decode.Decoder Member
decodeMember =
    Decode.map5 Member
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "weight" Decode.int)
        (Decode.field "activated" Decode.bool)
        (Decode.succeed 0.0)


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
