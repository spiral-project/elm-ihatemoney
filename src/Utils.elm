module Utils exposing (sortByLowerCaseName)


sortByLowerCaseName : List { a | name : String } -> List { a | name : String }
sortByLowerCaseName =
    List.sortBy (String.toLower << .name)
