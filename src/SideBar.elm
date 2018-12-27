module SideBar exposing (sideBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


sideBarView : Localizer -> String -> List Member -> Html Msg
sideBarView t memberField members =
    div [ class "row", style "height" "100%" ]
        [ aside [ id "sidebar", class "sidebar col-xs-12 col-md-3 ", style "height" "100%" ]
            [ Html.form [ id "add-member-form", onSubmit AddMember, class "form-inline" ]
                [ div [ class "input-group" ]
                    [ label [ class "sr-only", for "name" ] [ text <| t TypeUserName ]
                    , input
                        [ class "form-control"
                        , id "name"
                        , placeholder <| t TypeUserName
                        , required True
                        , type_ "text"
                        , value memberField
                        , onInput NewMemberName
                        ]
                        []
                    , button [ class " input-group-addon btn" ] [ text <| t Add ]
                    ]
                ]
            , div [ id "table_overflow" ]
                [ List.map (memberInfo t) members
                    |> table [ class "balance table" ]
                ]
            ]
        ]


memberInfo : Localizer -> Member -> Html Msg
memberInfo t member =
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
            [ div [ class "action delete" ] [ button [ type_ "button", onClick <| DeactivateMember member.id ] [ text <| t Deactivate ] ]
            ]
        , td []
            [ div [ class "action edit" ] [ button [ type_ "button", onClick <| EditModal (MemberModal member.id) ] [ text <| t Edit ] ]
            ]
        , td [ class <| "balance-value " ++ className ]
            [ round 2 member.balance
                |> (++) sign
                |> text
            ]
        ]
