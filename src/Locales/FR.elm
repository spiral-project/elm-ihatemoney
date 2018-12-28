module Locales.FR exposing (getString)

import Types exposing (LocaleIdentifier(..), Localizer)


getString : Localizer
getString id =
    case id of
        -- App title
        AppTitle (Just projectName) ->
            "Gestion de compte - " ++ projectName

        AppTitle Nothing ->
            "Gestion de compte"

        -- NavBar
        Bills ->
            "Factures"

        Settle ->
            "Remboursements"

        Statistics ->
            "Statistiques"

        Options ->
            "options"

        ProjectSettings ->
            "Options du projet"

        StartNewProject ->
            "Nouveau projet"

        Logout ->
            "Se déconnecter"

        -- SideBar
        TypeUserName ->
            "Nouveau Participant"

        Add ->
            "Ajouter"

        Deactivate ->
            "désactiver"

        Edit ->
            "éditer"

        EditMember ->
            "Éditer le membre"

        Delete ->
            "supprimer"

        Reactivate ->
            "ré-activer"

        -- Bills Board
        Invite ->
            "Invitez d’autres personnes à rejoindre ce projet !"

        AddNewBill ->
            "Nouvelle facture"

        When ->
            "Quand ?"

        WhoPaid ->
            "Qui a payé ?"

        ForWhat ->
            "Pour quoi ?"

        ForWhom ->
            "Pour qui ?"

        HowMuch ->
            "Combien ?"

        Actions ->
            "Actions"

        Each amountEach ->
            " (" ++ amountEach ++ " chacun)"

        -- Footer
        FreeSoftware ->
            "Ceci est un logiciel libre"

        YouCanContribute ->
            ", vous pouvez y contribuer et l'améliorer !"

        -- Login
        ManageYourExpenses ->
            "Gérez vos dépenses"

        EasilyShared ->
            "partagées, facilement"

        TryDemo ->
            "Essayez la démo"

        SharingHouse ->
            "Vous êtes en colocation ?"

        GoingOnHoliday ->
            "Partez en vacances avec des amis ?"

        SimplySharingMoney ->
            "Ça vous arrive de partager de l’argent avec d’autres ?"

        WeCanHelp ->
            "On peut vous aider !"

        LogToExistingProject ->
            "Se connecter à un projet existant…"

        ProjectID ->
            "Identifiant du projet"

        PrivateCode ->
            "Code d’accès"

        LogIn ->
            "Se connecter"

        CantRememberPassword ->
            "Vous ne vous souvenez plus du code d’accès ?"

        CreateNewProject ->
            "…ou créez en un nouveau"

        ProjectName ->
            "Nom de projet"

        Email ->
            "E-mail"

        LetsGetStarted ->
            "C’est parti !"

        -- Member Edit Form
        Name ->
            "Nom"

        Weight ->
            "Parts"

        Cancel ->
            "Annuler"
