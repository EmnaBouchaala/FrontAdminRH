import { ActionReducerMap } from "@ngrx/store";
import { FilemanageReducer, FilemanagerState } from "./filemanager/filemanager.reducer";
import { EcoOrderState, OrderReducer } from "./orders/order.reducer";
import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";
import { CartReducer, CartState } from "./Cart/cart.reducer";
import { projectReducer, projectState } from "./ProjectsData/project.reducer";
import { UserReducer, UserState } from "./UserGrid/user.reducer";
import { UserListReducer, UserlistState } from "./UserList/userlist.reducer";
import { JoblistReducer, joblistState } from "./Job/job.reducer";
import { CandidateReducer, CandidateState } from "./Candidate/candidate.reducer";
import { InvoiceDataReducer, InvoiceDataState } from "./Invoices/invoices.reducer";
import { ChatReducer, ChatState } from "./Chat/chat.reducer";
import { tasklistReducer, tasklistState } from "./Tasks/tasks.reducer";
import { OrderdataState, OrdersReducer } from "./Crypto/crypto.reducer";
import { LayoutState, layoutReducer } from "./layouts/layouts.reducer";
import { CustomerReducer, CustomerState } from "./customer/customer.reducer";
import { MailReducer, MailState } from "./Email/email.reducer";


export interface RootReducerState {
    layout: LayoutState;
    auth: AuthenticationState;
    Filelist: FilemanagerState;
    EcoOrderList: EcoOrderState;
    CartList: CartState;
    Projectlist: projectState;
    usergrid: UserState;
    userList: UserlistState;
    Joblist: joblistState;
    CandidateList: CandidateState;
    InvoiceList: InvoiceDataState;
    chatList: ChatState;
    Tasklist: tasklistState;
    Order: OrderdataState;
    Customer: CustomerState;
    Maillist: MailState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    auth: authenticationReducer,
    Filelist: FilemanageReducer,
    EcoOrderList: OrderReducer,
    CartList: CartReducer,
    Projectlist: projectReducer,
    usergrid: UserReducer,
    userList: UserListReducer,
    Joblist: JoblistReducer,
    CandidateList: CandidateReducer,
    InvoiceList: InvoiceDataReducer,
    chatList: ChatReducer,
    Tasklist: tasklistReducer,
    Order: OrdersReducer,
    Customer: CustomerReducer,
    Maillist: MailReducer
}