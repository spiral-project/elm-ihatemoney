module Footer exposing (footerView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Locales exposing (getString)
import Types exposing (..)


footerView : Localizer -> Html Msg
footerView t =
    footer []
        [ p []
            [ a [ href "https://github.com/spiral-project/elm-ihatemoney" ]
                [ text <| t FreeSoftware ]
            , text <| t YouCanContribute
            ]
        ]
