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

        -- Bills Board
        Invite ->
            "Invitez d’autres personnes à rejoindre ce projet !"

        --Quand ?	Qui a payé ?	Pour quoi ?	Pour qui ?	Combien ?"
        -- Footer
        FreeSoftware ->
            "Ceci est un logiciel libre"

        YouCanContribute ->
            ", vous pouvez y contribuer et l'améliorer !"
