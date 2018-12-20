module Main exposing (main)

import BillBoard exposing (billBoardView)
import Browser exposing (Document)
import Footer exposing (footerView)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import NavBar exposing (navBarView)
import Round exposing (round)
import SideBar exposing (sideBarView)
import Types exposing (..)


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
    Browser.document
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


view : Model -> Document Msg
view model =
    { title = "Account manager - " ++ model.project
    , body =
        [ navBarView model.project
        , div
            [ class "container-fluid" ]
            [ sideBarView model
            , billBoardView model
            ]
        , div [ class "messages" ] []
        , footerView
        ]
    }
