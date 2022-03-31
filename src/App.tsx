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
import AvailableJobs from "./pages/AvailableJobs";
import MyJobs from "./pages/MyJobs";
import ScheduleJob from "./pages/ScheduleJob";
import Profile from "./pages/Profile";
import AvailableJob from "./pages/AvailableJob";
import Notifications from "./pages/Notifications";
import ScheduledJob from "./pages/ScheduledJob";
import Associates from "./pages/Associates";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CreateAccount from "./pages/CreateAccount";
import Search from "./pages/Search";
import AssociateProfile from "./pages/AssociateProfile";
import EditProfile from "./pages/EditProfile";
import SchedulerView from "./pages/SchedulerView";
import CreateJob from "./pages/CreateJob";
import Crews from "./pages/Crews";
import AddNewCrew from "./pages/AddNewCrew";
import PastJobs from "./pages/PastJobs";
import ScheduledJobs from "./pages/ScheduledJobs";
import PublishJob from "./pages/PublishJob";
import MyPastJobSummary from "./pages/MyPastJobSummary";
import SScheduledJobs from "./pages/SScheduledJobs";
import SScheduledJob from "./pages/SScheduledJob";
import SchedAvailableJobs from "./pages/SchedAvailableJobs";
import SchedAvailableJob from "./pages/SchedAvailableJob";
import SchedPastJobs from "./pages/SchedPastJobs";
import SchedPastJob from "./pages/SchedPastJob";

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
          <Route path="/AvailableJobs" component={AvailableJobs} exact={true} />
          <Route path="/MyJobs" component={MyJobs} />
          <Route path="/ScheduleJob" component={ScheduleJob} />
          <Route path="/Profile" component={Profile} />
          <Route path="/AvailableJob/:id" component={AvailableJob} />
          <Route path="/Notifications" component={Notifications} />
          <Route path="/ScheduledJob/:id" component={ScheduledJob} />
          <Route path="/Associates" component={Associates} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Search" component={Search} />
          <Route path="/AssociateProfile/:id" component={AssociateProfile} />
          <Route path="/EditProfile" component={EditProfile} />
          <Route path="/SchedulerView" component={SchedulerView} />
          <Route path="/CreateJob" component={CreateJob} />
          <Route path="/Crews" component={Crews} />
          <Route path="/AddNewCrew" component={AddNewCrew} />
          <Route path="/PastJobs" component={PastJobs} />
          <Route path="/ScheduledJobs" component={ScheduledJobs} />
          <Route path="/PublishJob/:id" component={PublishJob} />
          <Route path="/MyPastJobSummary/:id" component={MyPastJobSummary} />
          <Route path="/SScheduledJobs" component={SScheduledJobs} />
          <Route path="/SScheduledJob/:id" component={SScheduledJob} />
          <Route path="/SchedAvailableJobs" component={SchedAvailableJobs} />
          <Route path="/SchedAvailableJob/:id" component={SchedAvailableJob} />
          <Route path="/SchedPastJobs" component={SchedPastJobs} />
          <Route path="/SchedPastJob/:id" component={SchedPastJob} />
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
