module Footer exposing (footerView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (Msg)


footerView : Html Msg
footerView =
    footer []
        [ p []
            [ a [ href "https://github.com/spiral-project/ihatemoney" ]
                [ text "This is a free software" ]
            , text
                ", you can contribute and improve it!"
            ]
        ]
