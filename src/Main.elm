module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Model =
    { project : String
    , members : List Member
    , bills : List Bill
    , memberField : String
    }


type Msg
    = NewNameTyped String
    | AddMember


type alias Project =
    String


type alias Member =
    { name : String
    , balance : Float
    }


type alias Bill =
    { date : String
    , amount : Float
    , label : String
    , payer : String
    , owers : List String
    }


type alias Message =
    { author : String, time : String, text : String }


init : () -> ( Model, Cmd Msg )
init flags =
    ( { members =
            [ { name = "Alexis", balance = 10 }
            , { name = "Fred", balance = -10 }
            , { name = "Rémy", balance = 20 }
            ]
      , bills =
            [ { date = "2018-12-21"
              , amount = 12.2
              , label = "Bar"
              , payer = "Rémy"
              , owers = [ "Rémy", "Alexis" ]
              }
            , { date = "2018-12-22"
              , amount = 52.2
              , label = "Resto"
              , payer = "Alexis"
              , owers = [ "Rémy", "Alexis", "Fred" ]
              }
            ]
      , project = "Week-end Août 2018"
      , memberField = ""
      }
    , Cmd.none
    )


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewNameTyped new_member_name ->
            ( { model | memberField = new_member_name }, Cmd.none )

        AddMember ->
            ( { model
                | members = model.members ++ [ Member model.memberField 0 ]
                , memberField = ""
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> Html Msg
view model =
    navBar model.project


navBar : Project -> Html Msg
navBar project =
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
                        [ a [ class "nav-link", href "/demo/" ] [ text "Bills" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "/demo/settle_bills" ] [ text "Settle" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "/demo/statistics" ] [ text "Statistics" ] ]
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
                                [ a [ class "dropdown-item", href "/demo/edit" ]
                                    [ text "Project settings" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "/create" ]
                                    [ text "Start a new project" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "/exit" ]
                                    [ text "Logout" ]
                                ]
                            ]
                        ]
                    , li [ class "nav-item" ]
                        [ a [ class "nav-link", href "/lang/fr" ] [ text "fr" ] ]
                    , li [ class "nav-item active" ]
                        [ a [ class "nav-link", href "/lang/en" ] [ text "en" ]
                        ]
                    ]
                ]
            ]
        ]



-- memberList : String -> List Member -> List (Element Msg)
-- memberList newMemberName members =
--     [ row [ width fill ]
--         [ Input.text
--             [ Border.roundEach
--                 { topLeft = 5
--                 , topRight = 0
--                 , bottomLeft = 5
--                 , bottomRight = 0
--                 }
--             , Border.color <| rgb255 200 200 200
--             , width fill
--             ]
--             { onChange = NewNameTyped
--             , text = newMemberName
--             , label = Input.labelHidden "Enter user name here"
--             , placeholder = Just <| Input.placeholder [] <| text "Type user name here"
--             }
--         , buttonAddMember
--         ]
--     ]
--         ++ List.map displayMember members
-- displayMember : Member -> Element Msg
-- displayMember member =
--     row
--         [ paddingXY 10 10
--         , Border.widthEach
--             { top = 1
--             , left = 0
--             , right = 0
--             , bottom = 0
--             }
--         , Border.color <| rgb255 255 255 255
--         , width fill
--         ]
--         [ text member.name
--         , let
--             color =
--                 if member.balance < 0 then
--                     rgb255 255 0 0
--                 else
--                     rgb255 0 125 125
--             sign =
--                 if member.balance > 0 then
--                     "+"
--                 else
--                     ""
--           in
--           String.fromFloat member.balance
--             |> (++) sign
--             |> text
--             |> el [ alignRight, Font.color color, Font.bold ]
--         ]
-- buttonAddMember : Element Msg
-- buttonAddMember =
--     Input.button
--         [ padding 10
--         , Border.width 1
--         , Border.roundEach
--             { topLeft = 0
--             , topRight = 5
--             , bottomLeft = 0
--             , bottomRight = 5
--             }
--         , Background.color <| rgb 150 150 150
--         , Border.color <| rgb255 200 200 200
--         , height fill
--         ]
--         { onPress = Just AddMember
--         , label = text "Add"
--         }
-- billsList : List Bill -> List (Element Msg)
-- billsList bills =
--     [ buttonAddBill ]
-- buttonAddBill : Element Msg
-- buttonAddBill =
--     Input.button
--         [ padding 10
--         , Border.width 1
--         , Border.rounded 5
--         , Background.color <| rgb255 2 117 216
--         , Font.color <| rgb 1 1 1
--         , Border.color <| rgb255 200 200 200
--         ]
--         { onPress = Nothing
--         , label = text "Add a new bill"
--         }
