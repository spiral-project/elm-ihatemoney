module Main exposing (main)

import Browser exposing (Document)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Round exposing (round)


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


navBarView : Project -> Html Msg
navBarView project =
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
                        [ a [ class "nav-link", href "#" ] [ text "Bills" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "Settle" ] ]
                    , li
                        [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "Statistics" ] ]
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
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Project settings" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Start a new project" ]
                                ]
                            , li [ class "dropdown-divider" ] []
                            , li []
                                [ a [ class "dropdown-item", href "#" ]
                                    [ text "Logout" ]
                                ]
                            ]
                        ]
                    , li [ class "nav-item" ]
                        [ a [ class "nav-link", href "#" ] [ text "fr" ] ]
                    , li [ class "nav-item active" ]
                        [ a [ class "nav-link", href "#" ] [ text "en" ]
                        ]
                    ]
                ]
            ]
        ]


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


billBoardView : Model -> Html Msg
billBoardView model =
    div
        [ class "offset-md-3 col-xs-12 col-md-9" ]
        [ billBoardHeader model
        , billBoardTable model.bills
        ]


billBoardHeader : Model -> Html Msg
billBoardHeader model =
    div []
        [ div [ class "identifier" ]
            [ a [ href "#" ] [ text "Invite people to join this project!" ] ]
        , a
            [ id "new-bill"
            , href "#"
            , class "btn btn-primary"
            , attribute "data-toggle" "modal"
            , attribute "data-target" "#bill-form"
            ]
            [ text "Add a new bill" ]
        ]


billBoardTable : List Bill -> Html Msg
billBoardTable bills =
    table [ id "bill_table", class "col table table-striped table-hover" ]
        [ thead []
            [ tr []
                [ th [] [ text "When?" ]
                , th [] [ text "Who paid?" ]
                , th [] [ text "For what?" ]
                , th [] [ text "For whom?" ]
                , th [] [ text "How much?" ]
                , th [] [ text "Actions" ]
                ]
            ]
        , List.map billInfoView bills
            |> tbody []
        ]


billInfoView : Bill -> Html Msg
billInfoView bill =
    tr []
        [ td [] [ text bill.date ]
        , td [] [ text bill.payer ]
        , td [] [ text bill.label ]
        , td []
            [ List.sort bill.owers
                |> String.join ","
                |> text
            ]
        , td []
            [ let
                amount =
                    round 2 bill.amount

                numberOfPeople =
                    List.length bill.owers |> toFloat

                amountEach =
                    round 2 <| bill.amount / numberOfPeople
              in
              amount
                ++ " ("
                ++ amountEach
                ++ " each)"
                |> text
            ]
        , td [ class "bill-actions" ]
            [ a [ class "edit", href "#", title "edit" ] [ text "edit" ]
            , a [ class "delete", href "#", title "delete" ] [ text "delete" ]
            ]
        ]


footerView : Html Msg
footerView =
    footer []
        [ p []
            [ a [ href "https://github.com/spiral-project/ihatemoney" ]
                [ text "This is a free software" ]
            , text
                ", you can contribute and improve it!"
            ]
        ]
