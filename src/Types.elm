module Types exposing
    ( Authentication(..)
    , Bill
    , Fields
    , Locale(..)
    , LocaleIdentifier(..)
    , Localizer
    , Member
    , ModalType(..)
    , Model
    , Msg(..)
    , Project
    )

import Http


type alias Model =
    { auth : Authentication
    , locale : Locale
    , project : Maybe Project
    , fields : Fields
    , modal : ModalType
    , selectedBill : Maybe Bill
    }


type alias Project =
    { name : String
    , contact_email : String
    , members : List Member
    , bills : List Bill
    }


type alias Fields =
    { newMember : String
    , newMemberWeight : String
    , loginProjectID : String
    , loginPassword : String
    , newProjectName : String
    , newProjectPassword : String
    , newProjectEmail : String
    , newProjectError : Maybe String
    }


type Authentication
    = Basic String String
    | Unauthenticated


type Msg
    = NewMemberName String
    | NewMemberWeight String
    | AddMember
    | TriggerEditMember Int
    | ReactivateMember Int String
    | DemoLogin
    | LoginProjectID String
    | LoginPassword String
    | Login
    | LogoutUser
    | NewProjectName String
    | NewProjectPassword String
    | NewProjectEmail String
    | CreateProject
    | ChangeLocale Locale
    | ProjectCreated (Result Http.Error String)
    | ProjectFetched (Result Http.Error Project)
    | BillsFetched (Result Http.Error (List Bill))
    | MemberAdded (Result Http.Error Int)
    | MemberEdited (Result Http.Error Member)
    | MemberDeleted Int (Result Http.Error String)
    | EditModal ModalType
    | DeactivateMember Int
    | SelectBill (Maybe Bill)


type ModalType
    = MemberModal Int
    | Hidden


type alias Member =
    { id : Int
    , name : String
    , weight : Int
    , activated : Bool
    }


type alias Bill =
    { date : String
    , amount : Float
    , label : String
    , payer : Int
    , owers : List Member
    }


type Locale
    = EN
    | FR


type alias Localizer =
    LocaleIdentifier -> String


type LocaleIdentifier
    = AppTitle (Maybe String)
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
    | Reactivate
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
    | ManageYourExpenses
    | EasilyShared
    | TryDemo
    | SharingHouse
    | GoingOnHoliday
    | SimplySharingMoney
    | WeCanHelp
    | LogToExistingProject
    | ProjectID
    | PrivateCode
    | LogIn
    | CantRememberPassword
    | CreateNewProject
    | ProjectName
    | Email
    | LetsGetStarted
    | EditMember
    | Name
    | Weight
    | Cancel
