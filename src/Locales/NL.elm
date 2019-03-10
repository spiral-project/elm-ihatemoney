module Locales.EN exposing (getString)

import Types exposing (LocaleIdentifier(..), Localizer)


getString : Localizer
getString id =
    case id of
        -- App title
        AppTitle (Just projectName) ->
            "Accountbeheer - " ++ projectName

        AppTitle Nothing ->
            "Accountbeheer"

        -- NavBar
        Bills ->
            "Rekeningen"

        Settle ->
            "Schikken"

        Statistics ->
            "Statistieken"

        Options ->
            "opties"

        ProjectSettings ->
            "Projectinstellingen"

        StartNewProject ->
            "Nieuw project starten"

        Logout ->
            "Uitloggen"

        -- SideBar
        TypeUserName ->
            "Typ hier de gebruikersnaam"

        Add ->
            "Toevoegen"

        Deactivate ->
            "deactiveren"

        Edit ->
            "bewerken"

        EditMember ->
            "Deze deelnemer bewerken"

        Delete ->
            "verwijderen"

        Reactivate ->
            "heractiveren"

        -- Bills Board
        Invite ->
            "Nodig mensen uit voor dit project!"

        AddNewBill ->
            "Nieuwe rekening toevoegen"

        EditBill ->
            "Rekening bewerken"

        When ->
            "Wanneer?"

        WhoShouldPay ->
            "Wie betaalt?"

        WhoPaid ->
            "Wie heeft er betaald?"

        ForWhat ->
            "Voor wat?"

        ForWhom ->
            "Aan wie?"

        HowMuch ->
            "Hoeveel?"

        Who ->
            "Wie?"

        Paid ->
            "Betaald"

        Spent ->
            "Uitgegeven"

        Balance ->
            "Saldo"

        Actions ->
            "Acties"

        Each amountEach ->
            " (" ++ amountEach ++ " per persoon)"

        -- Footer
        FreeSoftware ->
            "Dit is vrije software"

        YouCanContribute ->
            ", je kunt bijdragen en de code verbeteren!"

        -- Login
        ManageYourExpenses ->
            "Beheer eenvoudig je gedeelde"

        EasilyShared ->
            "uitgaven"

        TryDemo ->
            "Probeer het uit"

        SharingHouse ->
            "Deel je een huis?"

        GoingOnHoliday ->
            "Ga je op vakantie met vrienden?"

        SimplySharingMoney ->
            "Of wil je eenvoudig geld delen?"

        WeCanHelp ->
            "Wij kunnen helpen!"

        LogToExistingProject ->
            "Log in op een bestaand project…"

        ProjectID ->
            "Project-id"

        PrivateCode ->
            "Privécode"

        LogIn ->
            "Inloggen"

        CantRememberPassword ->
            "Ben je je wachtwoord vergeten?"

        CreateNewProject ->
            "…of creëer een nieuw project"

        ProjectName ->
            "Projectnaam"

        Email ->
            "E-mailadres"

        LetsGetStarted ->
            "Aan de slag"

        -- Member Edit Form
        Name ->
            "Naam"

        Weight ->
            "Gewicht"

        Cancel ->
            "Annuleren"

        Date ->
            "Datum"

        What ->
            "Wat?"

        Payer ->
            "Betaler"

        Amount ->
            "Betaald bedrag"

        Owers ->
            "Aan wie?"

        SelectAll ->
            "Alles selecteren"

        SelectNone ->
            "Niets selecteren"

        DownloadSettle ->
            "Schikkingsresultaten downloaden (JSON)"

        DownloadBills ->
            "Rekeningen downloaden (JSON)"
