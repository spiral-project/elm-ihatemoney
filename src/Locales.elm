module Locales exposing (getString)

import Locales.EN
import Locales.FR
import Locales.NL
import Types exposing (Locale(..), LocaleIdentifier(..))


getString : Locale -> LocaleIdentifier -> String
getString locale id =
    case locale of
        EN ->
            Locales.EN.getString id

        FR ->
            Locales.FR.getString id

        NL ->
            Locales.NL.getString id
