module Statistic exposing (statisticView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Ratio exposing (Rational)
import Round
import Types exposing (..)
import Utils exposing (getMemberStats, sortByLowerCaseName)


statisticView : Localizer -> List Member -> List Bill -> Html Msg
statisticView t members bills =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ table [ id "bill_table", class "col table table-striped table-hover" ]
            [ thead []
                [ tr []
                    [ th [] [ text <| t Who ]
                    , th [] [ text <| t Paid ]
                    , th [] [ text <| t Spent ]
                    , th [] [ text <| t Balance ]
                    ]
                ]
            , statisticInfoView t members bills
                |> tbody []
            ]
        ]


statisticInfoView : Localizer -> List Member -> List Bill -> List (Html Msg)
statisticInfoView t members bills =
    List.sortBy .name members
        |> List.map (\member -> ( member, getMemberStats bills member ))
        |> List.map showStats


showStats : ( Member, ( Rational, Rational ) ) -> Html Msg
showStats ( ower, ( totalPaid, totalOwed ) ) =
    tr []
        [ td [] [ text ower.name ]
        , td [] [ text <| Round.round 2 <| Ratio.toFloat totalPaid ]
        , td [] [ text <| Round.round 2 <| Ratio.toFloat totalOwed ]
        , td [] [ text <| Round.round 2 <| Ratio.toFloat (Ratio.subtract totalPaid totalOwed) ]
        ]
