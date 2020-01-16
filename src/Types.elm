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
    , Page(..)
    , Project
    , emptyBill
    )

import Http


type alias Model =
    { auth : Authentication
    , page : Page
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
    , projectName : String
    , projectPassword : String
    , projectEmail : String
    , projectError : Maybe String
    , currentAmount : String
    }


type Page
    = BillsPage
    | SettlePage
    | StatisticPage


type Authentication
    = Basic String String
    | Unauthenticated


type Msg
    = NewMemberName String
    | NewMemberWeight String
    | AddMember
    | Refresh
    | TriggerEditMember Int
    | TriggerAddBill Bill
    | TriggerEditBill Bill
    | BillUpdate Bill (Result Http.Error Int)
    | ReactivateMember Member
    | DemoLogin
    | LoginProjectID String
    | LoginPassword String
    | Login
    | LogoutUser
    | LogoutUserAndCreate
    | NewProjectName String
    | NewProjectPassword String
    | NewProjectEmail String
    | CreateProject
    | ChangeLocale Locale
    | ProjectCreated (Result Http.Error String)
    | ProjectEdited (Result Http.Error String)
    | ProjectFetched (Result Http.Error Project)
    | BillsFetched Project (Result Http.Error (List Bill))
    | MemberAdded (Result Http.Error Int)
    | MemberEdited (Result Http.Error Member)
    | MemberDeleted Int (Result Http.Error String)
    | EditModal ModalType
    | DeactivateMember Int
    | SelectBill (Maybe Bill)
    | RemoveBill Bill
    | BillDeleted Int (Result Http.Error String)
    | NewBillDate Bill String
    | NewBillLabel Bill String
    | NewBillPayer Bill Int
    | NewBillAmount Bill String
    | NewBillToggleOwer Bill Member
    | NewBillToggleAllOwers Bill (List Member)
    | NewBillToggleNoneOwers Bill
    | SelectPage Page
    | TriggerEditProject
    | NoOp


type ModalType
    = MemberModal Int
    | BillModal (Maybe Bill)
    | ProjectOptions
    | Hidden


type alias Member =
    { id : Int
    , name : String
    , weight : Int
    , activated : Bool
    }


type alias Bill =
    { id : Int
    , date : String
    , amount : Float
    , label : String
    , payer : Int
    , owers : List Member
    }


emptyBill : Bill
emptyBill =
    Bill 0 "" 0.0 "" 0 []


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
    | WhoShouldPay
    | Who
    | Paid
    | Spent
    | Balance
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
    | EditBill
    | Date
    | What
    | Payer
    | Amount
    | Owers
    | SelectAll
    | SelectNone
    | DownloadSettle
    | DownloadBills
