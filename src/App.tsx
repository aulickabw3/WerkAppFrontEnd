import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route, Link } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonCol,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  home,
  person,
  notifications,
  searchCircle,
  searchOutline,
  people,
} from "ionicons/icons";
import Main from "./pages/Main";
import ScheduleJob from "./pages/ScheduleJob";
import Profile from "./pages/Profile";
import AvailableJob from "./pages/AvailableJob";
import Notifications from "./pages/Notifications";
import Associates from "./pages/Associates";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CreateAccount from "./pages/CreateAccount";
import Search from "./pages/Search";
import AssociateProfile from "./pages/AssociateProfile";
import EditProfile from "./pages/EditProfile";
import SchedulerView from "./pages/SchedulerView";
import Crews from "./pages/Crews";
import PublishJob from "./pages/PublishJob";
import PastJob from "./pages/PastJob";
import ShiftDetails from "./pages/ShiftDetails";
import SchedShiftDetails from "./pages/SchedShiftDetails";
import EditShift from "./pages/EditShift";
import ShiftChat from "./pages/ShiftChat";
import SchedShiftWerkers from "./pages/SchedShiftWerkers";
import SchedShiftChat from "./pages/SchedShiftChat";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/Main" component={Main} exact={true} />
          <Route path="/ScheduleJob" component={ScheduleJob} />
          <Route path="/Profile" component={Profile} />
          <Route path="/AvailableJob/:id" component={AvailableJob} />
          <Route path="/Notifications" component={Notifications} />
          <Route path="/Associates" component={Associates} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Search" component={Search} />
          <Route path="/AssociateProfile/:id" component={AssociateProfile} />
          <Route path="/EditProfile" component={EditProfile} />
          <Route path="/SchedulerView" component={SchedulerView} />
          <Route path="/Crews" component={Crews} />
          <Route path="/PublishJob/:id" component={PublishJob} />
          <Route path="/PastJob/:id" component={PastJob} />
          <Route path="/ShiftDetails/:id" component={ShiftDetails} />
          <Route path="/SchedShiftDetails/:id" component={SchedShiftDetails} />
          <Route path="/EditShift/:id" component={EditShift} />
          <Route path="/ShiftChat/:id" component={ShiftChat} />
          <Route path="/SchedShiftWerkers/:id" component={SchedShiftWerkers} />
          <Route path="/SchedShiftChat/:id" component={SchedShiftChat} />
          
          <Route
            path="/"
            render={() => <Redirect to="/Login" />}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Search" href="/Search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile" href="/Profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Main" href="/Main">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Associates" href="/Associates">
            <IonIcon icon={people} />
            <IonLabel>Associates</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Notifications" href="/Notifications">
            <IonIcon icon={notifications} />
            <IonLabel>Notifications</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      <Route path="/Login" component={Login} />
      <Route path="/CreateAccount" component={CreateAccount} />
    </IonReactRouter>
  </IonApp>
);

export default App;
