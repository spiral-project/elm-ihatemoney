module SideBar exposing (sideBarView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)
import Types exposing (..)


sideBarView : Localizer -> String -> List Member -> List Bill -> Html Msg
sideBarView t memberField members bills =
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
                [ List.map (memberInfo t bills) members
                    |> table [ class "balance table" ]
                ]
            ]
        ]


getMemberBalance : Member -> List Bill -> Float
getMemberBalance member bills =
    let
        totalPaid =
            List.filter (\bill -> bill.payer == member.id) bills
                |> List.map .amount
                |> List.sum

        -- Return the sum of the shares
        billsShares =
            List.filter (\bill -> List.any (\ower -> ower.id == member.id) bill.owers) bills
                |> List.map
                    (\bill ->
                        bill.amount
                            / (List.map .weight bill.owers
                                |> List.sum
                                |> toFloat
                              )
                    )
                |> List.sum

        totalOwed =
            billsShares * toFloat member.weight
    in
    totalPaid - totalOwed


memberInfo : Localizer -> List Bill -> Member -> Html Msg
memberInfo t bills member =
    let
        memberBalance =
            getMemberBalance member bills

        className =
            if memberBalance <= -0.005 then
                "negative"

            else if memberBalance >= 0.005 then
                "positive"

            else
                ""

        sign =
            if memberBalance > 0 then
                "+"

            else
                ""
    in
    if not member.activated && memberBalance > -0.005 && memberBalance < 0.005 then
        -- Deactivated member with no balance
        span [] []

    else if member.activated then
        tr [ id "bal-member-1" ]
            [ td
                [ class "balance-name" ]
                [ text member.name
                , span [ class "light extra-info" ] [ text "(x1)" ]
                ]
            , td []
                [ div [ class "action delete" ] [ button [ type_ "button", onClick <| DeactivateMember member.id ] [ text <| t Deactivate ] ]
                , div [ class "action edit" ] [ button [ type_ "button", onClick <| EditModal (MemberModal member.id) ] [ text <| t Edit ] ]
                ]
            , td [ class <| "balance-value " ++ className ]
                [ round 2 memberBalance
                    |> (++) sign
                    |> text
                ]
            ]

    else
        tr [ id "bal-member-1", action "reactivate" ]
            [ td
                [ class "balance-name" ]
                [ text member.name
                , span [ class "light extra-info" ] [ text "(x1)" ]
                ]
            , td []
                [ div [ class "action reactivate" ]
                    [ button [ type_ "button", onClick <| ReactivateMember member.id member.name ] [ text <| t Reactivate ]
                    ]
                ]
            , td [ class <| "balance-value " ++ className ]
                [ round 2 memberBalance
                    |> (++) sign
                    |> text
                ]
            ]
