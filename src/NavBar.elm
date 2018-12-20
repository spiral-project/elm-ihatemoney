module NavBar exposing (navBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Types exposing (..)


navBarView : Project -> Html Msg
navBarView project =
    div
        [ class "container" ]
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
                        [ a [ class "nav-link", href "#" ] [ text "Bills" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "Settle" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "Statistics" ] ]
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
                            [ text "⚙ options" ]
                        , ul
                            [ class "dropdown-menu dropdown-menu-right"
                            , attribute "aria-labelledby" "navbarDropdownMenuLink"
                            ]
                            [ li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Project settings" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Start a new project" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Logout" ]
                                ]
                            ]
                        ]
                    , li [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "fr" ] ]
                    , li [ class "nav-item active" ]
                        [ a [ class "nav-link", href "#" ] [ text "en" ]
                        ]
                    ]
                ]
            ]
        ]
