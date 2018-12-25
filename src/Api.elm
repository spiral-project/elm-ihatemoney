module Api exposing (createProject)

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
headersForAuth : Authentication -> ( String, String )
headersForAuth auth =
    case auth of
        Unauthenticated ->
            ( "Authorization", "" )

        Basic username password ->
            ( "Authorization"
            , "Basic " ++ alwaysEncode (username ++ ":" ++ password)
            )


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
