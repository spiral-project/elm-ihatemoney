module NavBar exposing (navBarView, simpleNavBarView)

import Data exposing (buildBillsDataUrl, buildSettleDataUrl)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Settle exposing (buildTransactions)
import Types exposing (..)



-- navBarView with the connected menu


navBarView : Localizer -> Project -> Locale -> Page -> Html Msg
navBarView t project selectedLocale activePage =
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
                            , onClick <| SelectPage BillsPage
                            ]
                            [ strong [ class "navbar-nav" ] [ text project.name ] ]
                        ]
                    ]
                , let
                    active expected =
                        if activePage == expected then
                            "active"

                        else
                            ""
                  in
                  ul
                    [ class "navbar-nav ml-auto mr-auto" ]
                    [ li
                        [ class <| "nav-item " ++ active BillsPage ]
                        [ a [ class "nav-link", href "#", onClick <| SelectPage BillsPage ] [ text <| t Bills ] ]
                    , li
                        [ class <| "nav-item " ++ active SettlePage ]
                        [ a [ class "nav-link", href "#", onClick <| SelectPage SettlePage ] [ text <| t Settle ] ]
                    , li
                        [ class <| "nav-item " ++ active StatisticPage ]
                        [ a [ class "nav-link", href "#", onClick <| SelectPage StatisticPage ] [ text <| t Statistics ] ]
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
                                [ a [ class "dropdown-item", href "#", onClick <| EditModal ProjectOptions ] [ text <| t ProjectSettings ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#", onClick LogoutUserAndCreate ] [ text <| t StartNewProject ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href <| buildBillsDataUrl project, download <| project.name ++ "-bills.json" ] [ text <| t DownloadBills ]
                                ]
                            , li []
                                [ a
                                    [ class "dropdown-item"
                                    , href <| buildSettleDataUrl project <| buildTransactions project.members project.bills
                                    , download <| project.name ++ "-settlement.json"
                                    ]
                                    [ text <| t DownloadSettle ]
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
                    , li
                        [ "nav-item"
                            ++ (if selectedLocale == NL then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale NL ] [ text "nl" ]
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
                    , li
                        [ "nav-item"
                            ++ (if selectedLocale == NL then
                                    " active"

                                else
                                    ""
                               )
                            |> class
                        ]
                        [ a [ class "nav-link", href "#", onClick <| ChangeLocale NL ] [ text "nl" ]
                        ]
                    ]
                ]
            ]
        ]
