module Locales.EN exposing (getString)

import Types exposing (LocaleIdentifier(..), Localizer)


getString : Localizer
getString id =
    case id of
        -- App title
        AppTitle (Just projectName) ->
            "Account Manager - " ++ projectName

        AppTitle Nothing ->
            "Account Manager"

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

        EditMember ->
            "Edit this member"

        Delete ->
            "delete"

        Reactivate ->
            "reactivate"

        -- Bills Board
        Invite ->
            "Invite people to join this project!"

        AddNewBill ->
            "Add a new bill"

        EditBill ->
            "Edit a bill"

        When ->
            "When?"

        WhoPaid ->
            "Who paid?"

        ForWhat ->
            "For what?"

        ForWhom ->
            "For whom?"

        HowMuch ->
            "How much?"

        Actions ->
            "Actions"

        Each amountEach ->
            " (" ++ amountEach ++ " each)"

        -- Footer
        FreeSoftware ->
            "This is a Free software"

        YouCanContribute ->
            ", you can contribute and improve it!"

        -- Login
        ManageYourExpenses ->
            "Manage your shared"

        EasilyShared ->
            "expenses, easily"

        TryDemo ->
            "Try out the demo"

        SharingHouse ->
            "You're sharing a house?"

        GoingOnHoliday ->
            "Going on holidays with friends?"

        SimplySharingMoney ->
            "Simply sharing money with others?"

        WeCanHelp ->
            "We can help!"

        LogToExistingProject ->
            "Log to an existing project…"

        ProjectID ->
            "Project identifier"

        PrivateCode ->
            "Private code"

        LogIn ->
            "Log in"

        CantRememberPassword ->
            "Can't remember your password?"

        CreateNewProject ->
            "…or create a new one"

        ProjectName ->
            "Project name"

        Email ->
            "Email"

        LetsGetStarted ->
            "Let's get started"

        -- Member Edit Form
        Name ->
            "Name"

        Weight ->
            "Weight"

        Cancel ->
            "Cancel"

        Date ->
            "Date"

        What ->
            "What?"

        Payer ->
            "Payer"

        Amount ->
            "Amount paid"

        Owers ->
            "For who?"

        SelectAll ->
            "Select all"

        SelectNone ->
            "Select none"
