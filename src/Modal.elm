module Modal exposing (handleModal)

import Capitalize exposing (toCapital)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Types exposing (..)


handleModal : Localizer -> Model -> Project -> Html Msg
handleModal t model project =
    case model.modal of
        MemberModal member_id ->
            let
                getMember =
                    List.filter (\m -> m.id == member_id) project.members |> List.head
            in
            case getMember of
                Just member ->
                    fieldset []
                        [ div [ class "form-group row" ]
                            [ label [ class "col-3", for "name" ] [ text <| t Name ]
                            , div [ class "controls col-9" ]
                                [ input
                                    [ class "form-control"
                                    , id "name"
                                    , type_ "text"
                                    , value model.fields.newMember
                                    , onInput NewMemberName
                                    ]
                                    []
                                ]
                            ]
                        , div [ class "form-group row" ]
                            [ label [ class "col-3", for "weight" ] [ text <| t Weight ]
                            , div [ class "controls col-9" ]
                                [ input
                                    [ class "form-control"
                                    , id "weight"
                                    , type_ "number"
                                    , onInput NewMemberWeight
                                    , Html.Attributes.min "0"
                                    , Html.Attributes.step "1"
                                    , value model.fields.newMemberWeight
                                    ]
                                    []
                                ]
                            ]
                        ]
                        |> modalView (t EditMember) (toCapital <| t Edit) (t Cancel) (TriggerEditMember member_id)

                Nothing ->
                    div [] []

        Hidden ->
            div [] []


modalView : String -> String -> String -> Msg -> Html Msg -> Html Msg
modalView title submitTitle cancelTitle msg form =
    div [ class "modal fade show", attribute "role" "dialog", style "display" "block" ]
        [ div [ class "modal-dialog", attribute "role" "document" ]
            [ div [ class "modal-content" ]
                [ div [ class "modal-header" ]
                    [ h3 [ class "modal-title" ] [ text title ]
                    , a [ href "#", class "close", onClick <| EditModal Hidden ] [ text "×" ]
                    ]
                , Html.form [ class "modal-body container", onSubmit msg ]
                    [ form
                    , div [ class "actions" ]
                        [ input [ class "btn btn-primary", type_ "submit", value submitTitle ] []
                        , input
                            [ class "btn"
                            , type_ "button"
                            , onClick <| EditModal Hidden
                            , value cancelTitle
                            ]
                            []
                        ]
                    ]
                ]
            ]
        ]
