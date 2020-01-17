module SideBar exposing (sideBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Ratio
import Types exposing (..)
import Utils exposing (displayAmount, getMemberBalance)


sideBarView : Localizer -> String -> List Member -> List Bill -> Maybe Bill -> Html Msg
sideBarView t memberField members bills selectedBill =
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
                [ List.map (memberInfo t bills selectedBill) members
                    |> table [ class "balance table" ]
                ]
            ]
        ]


memberInfo : Localizer -> List Bill -> Maybe Bill -> Member -> Html Msg
memberInfo t bills selectedBill member =
    let
        zero =
            Ratio.fromInt 0

        memberBalance =
            getMemberBalance bills member

        balanceClassName =
            if Ratio.lt memberBalance zero then
                "negative"

            else if Ratio.gt memberBalance zero then
                "positive"

            else
                ""

        payerClassName =
            case selectedBill of
                Nothing ->
                    ""

                Just bill ->
                    if bill.payer == member.id then
                        "payer_line"

                    else
                        ""

        owerClassName =
            case selectedBill of
                Nothing ->
                    ""

                Just bill ->
                    let
                        isOwer =
                            (List.filter (\x -> x.id == member.id) bill.owers |> List.length) > 0
                    in
                    if isOwer then
                        "ower_line"

                    else
                        ""

        sign =
            if Ratio.gt memberBalance zero then
                "+"

            else
                ""
    in
    -- if not member.activated && memberBalance > -0.005 && memberBalance < 0.005 then
    --     -- Deactivated member with no balance
    --     span [] []
    -- else if member.activated then
    if member.activated then
        tr [ id "bal-member-1", class (payerClassName ++ " " ++ owerClassName) ]
            [ td
                [ class "balance-name" ]
                [ text member.name
                , span [ class "light" ] [ text <| " (x" ++ String.fromInt member.weight ++ ")" ]
                ]
            , td []
                [ div [ class "action delete" ] [ button [ type_ "button", onClick <| DeactivateMember member.id ] [ text <| t Deactivate ] ]
                , div [ class "action edit" ] [ button [ type_ "button", onClick <| EditModal (MemberModal member.id) ] [ text <| t Edit ] ]
                ]
            , td [ class <| "balance-value " ++ balanceClassName ]
                [ displayAmount memberBalance
                    |> (++) sign
                    |> text
                ]
            ]

    else
        tr [ id "bal-member-1", action "reactivate", class (payerClassName ++ " " ++ owerClassName) ]
            [ td
                [ class "balance-name" ]
                [ text member.name
                , span [ class "light" ] [ text <| " (x" ++ String.fromInt member.weight ++ ")" ]
                ]
            , td []
                [ div [ class "action reactivate" ]
                    [ button [ type_ "button", onClick <| ReactivateMember member ] [ text <| t Reactivate ]
                    ]
                ]
            , td [ class <| "balance-value " ++ balanceClassName ]
                [ displayAmount memberBalance
                    |> (++) sign
                    |> text
                ]
            ]
