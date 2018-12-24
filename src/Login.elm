module Login exposing (loginView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Types exposing (..)


loginView : Localizer -> Locale -> Html Msg
loginView t selectedLocale =
    div [ class "container-fluid" ]
        [ header [ id "header", class "row" ]
            [ div [ class "col-xs-12 col-sm-5 offset-md-2" ]
                [ h2 []
                    [ text <| t ManageYourExpenses
                    , br [] []
                    , text <| t EasilyShared
                    ]
                , a [ href "/demo", class "tryout btn" ] [ text <| t TryDemo ]
                ]
            , div [ class "col-xs-12 col-sm-4" ]
                [ p [ class "additional-content" ]
                    [ text <| t SharingHouse
                    , br [] []
                    , text <| t GoingOnHoliday
                    , br [] []
                    , text <| t SimplySharingMoney
                    , br [] []
                    , strong [] [ text <| t WeCanHelp ]
                    ]
                ]
            ]
        , div
            [ class "row home" ]
            [ div [ class "col-xs-12 col-sm-5 col-md-4 offset-md-2" ]
                [ Html.form [ id "authentication-form", class "form-horizontal" ]
                    [ fieldset [ class "form-group" ]
                        [ legend [] [ text <| t LogToExistingProject ]
                        , div [ class "form-group" ]
                            [ label [ for "id" ] [ text <| t ProjectID ]
                            , div [ class "controls" ]
                                [ input
                                    [ class "form-control"
                                    , id "id"
                                    , name "id"
                                    , required True
                                    , type_ "text"
                                    , value ""
                                    ]
                                    []
                                ]
                            ]
                        , div
                            [ class "form-group" ]
                            [ label [ for "password" ] [ text <| t PrivateCode ]
                            , div [ class "controls" ]
                                [ input
                                    [ class "form-control"
                                    , id "password"
                                    , name "password"
                                    , required True
                                    , type_ "password"
                                    , value ""
                                    ]
                                    []
                                ]
                            ]
                        ]
                    , div
                        [ class "controls" ]
                        [ button [ class "btn", type_ "submit" ] [ text <| t LogIn ]
                        , a [ class "password-reminder", href "#" ] [ text <| t CantRememberPassword ]
                        ]
                    ]
                ]
            , div
                [ class "col-xs-12 col-sm-5 col-md-3 offset-sm-1" ]
                [ Html.form [ id "creation-form", class "form-horizontal" ]
                    [ fieldset [ class "form-group" ]
                        [ legend [] [ text <| t CreateNewProject ]
                        , div [ class "form-group" ]
                            [ label [ for "name" ] [ text <| t ProjectName ]
                            , div [ class "controls" ]
                                [ input
                                    [ class "form-control"
                                    , id "name"
                                    , name "name"
                                    , required True
                                    , type_ "text"
                                    , value ""
                                    ]
                                    []
                                ]
                            ]
                        , div [ class "form-group" ]
                            [ label [ for "password" ] [ text <| t PrivateCode ]
                            , div [ class "controls" ]
                                [ input
                                    [ class "form-control"
                                    , id "password"
                                    , name "password"
                                    , required True
                                    , type_ "password"
                                    , value ""
                                    ]
                                    []
                                ]
                            ]
                        , div [ class "form-group" ]
                            [ label [ for "contact_email" ] [ text <| t Email ]
                            , div [ class "controls" ]
                                [ input
                                    [ class "form-control"
                                    , id "contact_email"
                                    , name "contact_email"
                                    , required True
                                    , type_ "text"
                                    , value ""
                                    ]
                                    []
                                ]
                            ]
                        ]
                    , div [ class "controls" ]
                        [ button [ class "btn", type_ "submit" ] [ text <| t LetsGetStarted ]
                        ]
                    ]
                ]
            ]
        ]
