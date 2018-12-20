module Locales.EN exposing (getString)

import Types exposing (LocaleIdentifier(..))


getString : LocaleIdentifier -> String
getString id =
    case id of
        -- App title
        AppTitle projectName ->
            "Account Manager - " ++ projectName

        -- NavBar
        Bills ->
            "Bills"

        Settle ->
            "Settle"

        Statistics ->
            "Statistics"

        Options ->
            "options"

        ProjectSettings ->
            "Project settings"

        StartNewProject ->
            "Start a new project"

        Logout ->
            "Logout"

        -- SideBar
        TypeUserName ->
            "Type user name here"

        Add ->
            "Add"

        Deactivate ->
            "deactivate"

        Edit ->
            "edit"

        -- Bills Board
        Invite ->
            "Invite people to join this project!"

        -- Footer
        FreeSoftware ->
            "This is a Free software"

        YouCanContribute ->
            ", you can contribute and improve it!"
