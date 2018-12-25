module NavBar exposing (navBarView, simpleNavBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Types exposing (..)



-- navBarView with the connected menu


navBarView : Localizer -> Project -> Locale -> Html Msg
navBarView t project selectedLocale =
    div [ class "container" ]
        [ nav
            [ class "navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse" ]
            [ button
                [ class "navbar-toggler"
                , type_ "button"
                , attribute "data-toggle" "collapse"
                , attribute "data-target" "#navbarToggler"
                , attribute "aria-controls" "navbarToggler"
                , attribute "aria-expanded" "false"
                , attribute "aria-label" "Toggle navigation"
                ]
                [ span [ class "navbar-toggler-icon" ] [] ]
            , div
                [ class "collapse navbar-collapse", id "navbarToggler" ]
                [ h1 [] [ a [ class "navbar-brand", href "#" ] [ text "#! money?" ] ]
                , ul [ class "navbar-nav" ]
                    [ li [ class "nav-item" ]
                        [ a
                            [ class "nav-link"
                            , href "#"
                            ]
                            [ strong [ class "navbar-nav" ] [ text project ] ]
                        ]
                    ]
                , ul
                    [ class "navbar-nav ml-auto mr-auto" ]
                    [ li
                        [ class "nav-item active" ]
                        [ a [ class "nav-link", href "#" ] [ text <| t Bills ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text <| t Settle ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text <| t Statistics ] ]
                    ]
                , ul
                    [ class "navbar-nav secondary-nav" ]
                    [ li
                        [ class "nav-item dropdown" ]
                        [ a
                            [ href "#"
                            , class "nav-link dropdown-toggle"
                            , id "navbarDropdownMenuLink"
                            , attribute "data-toggle" "dropdown"
                            , attribute "aria-haspopup" "true"
                            , attribute "aria-expanded" "false"
                            ]
                            [ text <| "⚙ " ++ t Options ]
                        , ul
                            [ class "dropdown-menu dropdown-menu-right"
                            , attribute "aria-labelledby" "navbarDropdownMenuLink"
                            ]
                            [ li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text <| t ProjectSettings ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text <| t StartNewProject ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#", onClick LogoutUser ]
                                    [ text <| t Logout ]
                                ]
                            ]
                        ]
                    , li
                        [ "nav-item"
                            ++ (if selectedLocale == FR then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale FR ] [ text "fr" ] ]
                    , li
                        [ "nav-item"
                            ++ (if selectedLocale == EN then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale EN ] [ text "en" ]
                        ]
                    ]
                ]
            ]
        ]



-- simpleNavBarView for unconnected pages


simpleNavBarView : Localizer -> Locale -> Html Msg
simpleNavBarView t selectedLocale =
    div [ class "container" ]
        [ nav
            [ class "navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse" ]
            [ button
                [ class "navbar-toggler"
                , type_ "button"
                , attribute "data-toggle" "collapse"
                , attribute "data-target" "#navbarToggler"
                , attribute "aria-controls" "navbarToggler"
                , attribute "aria-expanded" "false"
                , attribute "aria-label" "Toggle navigation"
                ]
                [ span [ class "navbar-toggler-icon" ] [] ]
            , div
                [ class "collapse navbar-collapse", id "navbarToggler" ]
                [ h1 [] [ a [ class "navbar-brand", href "#" ] [ text "#! money?" ] ]
                , ul [ class "navbar-nav ml-auto mr-auto" ] []
                , ul [ class "navbar-nav secondary-nav" ]
                    [ li
                        [ "nav-item"
                            ++ (if selectedLocale == FR then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale FR ] [ text "fr" ] ]
                    , li
                        [ "nav-item"
                            ++ (if selectedLocale == EN then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale EN ] [ text "en" ]
                        ]
                    ]
                ]
            ]
        ]
