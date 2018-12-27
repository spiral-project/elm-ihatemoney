module Capitalize exposing (toCapital, toCapitalAll)

{-| Capitalize your sentences.


# Usage

@docs toCapital, toCapitalAll

-}

import String


{-| Capitalize only the first word of a sentence.
toCapital "hello world" -- "Hello world"
-}
toCapital : String -> String
toCapital str =
    String.toUpper (String.left 1 str) ++ String.dropLeft 1 str


{-| Capitalize each word of a sentence.
toCapitalAll "hello world" -- "Hello World"
-}
toCapitalAll : String -> String
toCapitalAll str =
    str
        |> String.split " "
        |> List.map toCapital
        |> String.join " "
