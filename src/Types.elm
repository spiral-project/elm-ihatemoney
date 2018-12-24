module Types exposing (Bill, Locale(..), LocaleIdentifier(..), Member, Model, Msg(..), Project)


type alias Model =
    { locale : Locale
    , project : String
    , members : List Member
    , bills : List Bill
    , memberField : String
    }


type Msg
    = NewNameTyped String
    | AddMember
    | ChangeLocale Locale


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


type Locale
    = EN
    | FR


type LocaleIdentifier
    = AppTitle String
    | Bills
    | Settle
    | Statistics
    | Options
    | ProjectSettings
    | StartNewProject
    | Logout
    | TypeUserName
    | Add
    | Deactivate
    | Edit
    | Delete
    | Invite
    | FreeSoftware
    | YouCanContribute
    | AddNewBill
    | When
    | WhoPaid
    | ForWhat
    | ForWhom
    | HowMuch
    | Actions
    | Each String
