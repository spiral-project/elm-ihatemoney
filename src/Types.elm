module Types exposing (Bill, Member, Model, Msg(..), Project)


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
