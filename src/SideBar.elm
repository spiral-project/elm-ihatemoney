module SideBar exposing (sideBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


sideBarView : Model -> Html Msg
sideBarView model =
    div [ class "row", style "height" "100%" ]
        [ aside [ id "sidebar", class "sidebar col-xs-12 col-md-3 ", style "height" "100%" ]
            [ Html.form [ id "add-member-form", onSubmit AddMember, class "form-inline" ]
                [ div [ class "input-group" ]
                    [ label [ class "sr-only", for "name" ] [ text "Type user name here" ]
                    , input
                        [ class "form-control"
                        , id "name"
                        , placeholder "Type user name here"
                        , required True
                        , type_ "text"
                        , value model.memberField
                        , onInput NewNameTyped
                        ]
                        []
                    , button [ class " input-group-addon btn" ] [ text "Add" ]
                    ]
                ]
            , div [ id "table_overflow" ]
                [ List.map memberInfo model.members
                    |> table [ class "balance table" ]
                ]
            ]
        ]


memberInfo : Member -> Html Msg
memberInfo member =
    let
        className =
            if member.balance < 0 then
                "negative"

            else
                "positive"

        sign =
            if member.balance > 0 then
                "+"

            else
                ""
    in
    tr [ id "bal-member-1" ]
        [ td
            [ class "balance-name" ]
            [ text member.name
            , span [ class "light extra-info" ] [ text "(x1)" ]
            ]
        , td []
            [ div [ class "action delete" ] [ button [ type_ "button" ] [ text "deactivate" ] ]
            ]
        , td []
            [ div [ class "action edit" ] [ button [ type_ "button" ] [ text "edit" ] ]
            ]
        , td [ class <| "balance-value " ++ className ]
            [ round 2 member.balance
                |> (++) sign
                |> text
            ]
        ]
