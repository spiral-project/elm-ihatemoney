module Locales.FR exposing (getString)

import Types exposing (LocaleIdentifier(..))


getString : LocaleIdentifier -> String
getString id =
    case id of
        -- App title
        AppTitle projectName ->
            "Gestion de compte - " ++ projectName

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

        Delete ->
            "supprimer"

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
