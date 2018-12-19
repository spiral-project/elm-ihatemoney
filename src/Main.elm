module Main exposing (main)

import Browser
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import Html exposing (Html)


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
    layout [ height fill, Font.size 18 ] <|
        column [ height fill, width fill ]
            [ menu model.project
            , row [ width fill, height fill ]
                [ column
                    [ fillPortion 1
                        |> minimum 300
                        |> width
                    , Background.color <| rgb255 171 225 40
                    , height fill
                    , paddingXY 10 10
                    , spacing 10
                    ]
                  <|
                    memberList model.memberField model.members
                , column
                    [ width <| fillPortion 5
                    , height fill
                    , padding 10
                    ]
                  <|
                    billsList model.bills
                ]
            ]


menu : Project -> Element Msg
menu project =
    row
        [ width fill
        , height <| px 56
        , Background.color <| rgb255 30 30 30
        , Font.color <| rgb255 255 255 255
        , paddingXY 15 5
        ]
        [ column [ width <| fillPortion 1 ]
            [ text "#! money? "
            , el [ Font.size 16, padding 5 ] <| text project
            ]
        , column [ width <| fillPortion 1 ]
            [ row [ Font.center, centerX, Font.size 18 ]
                [ text "Bills | "
                , text "Settle | "
                , text "Statistics"
                ]
            ]
        , column [ width <| fillPortion 1 ]
            [ el [ alignRight ] <| text "⚙ Options"
            ]
        ]


memberList : String -> List Member -> List (Element Msg)
memberList newMemberName members =
    [ row [ width fill ]
        [ Input.text
            [ Border.roundEach
                { topLeft = 5
                , topRight = 0
                , bottomLeft = 5
                , bottomRight = 0
                }
            , Border.color <| rgb255 200 200 200
            , width fill
            ]
            { onChange = NewNameTyped
            , text = newMemberName
            , label = Input.labelHidden "Enter user name here"
            , placeholder = Just <| Input.placeholder [] <| text "Type user name here"
            }
        , buttonAddMember
        ]
    ]
        ++ List.map displayMember members


displayMember : Member -> Element Msg
displayMember member =
    row
        [ paddingXY 10 10
        , Border.widthEach
            { top = 1
            , left = 0
            , right = 0
            , bottom = 0
            }
        , Border.color <| rgb255 255 255 255
        , width fill
        ]
        [ text member.name
        , let
            color =
                if member.balance < 0 then
                    rgb255 255 0 0

                else
                    rgb255 0 125 125

            sign =
                if member.balance > 0 then
                    "+"

                else
                    ""
          in
          String.fromFloat member.balance
            |> (++) sign
            |> text
            |> el [ alignRight, Font.color color, Font.bold ]
        ]


buttonAddMember : Element Msg
buttonAddMember =
    Input.button
        [ padding 10
        , Border.width 1
        , Border.roundEach
            { topLeft = 0
            , topRight = 5
            , bottomLeft = 0
            , bottomRight = 5
            }
        , Background.color <| rgb 150 150 150
        , Border.color <| rgb255 200 200 200
        , height fill
        ]
        { onPress = Just AddMember
        , label = text "Add"
        }


billsList : List Bill -> List (Element Msg)
billsList bills =
    [ buttonAddBill ]


buttonAddBill : Element Msg
buttonAddBill =
    Input.button
        [ padding 10
        , Border.width 1
        , Border.rounded 5
        , Background.color <| rgb255 2 117 216
        , Font.color <| rgb 1 1 1
        , Border.color <| rgb255 200 200 200
        ]
        { onPress = Nothing
        , label = text "Add a new bill"
        }
