import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, person, notifications } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import ScheduleJob from './pages/ScheduleJob';
import Profile from './pages/Profile';
import AvailableJob from './pages/AvailableJob';
import Notifications from './pages/Notifications';
import MyJobSummary from './pages/MyJobSummary';
import Associates from './pages/Associates';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CreateAccount from './pages/CreateAccount';
// import ProfileData from './Interfaces/ProfileData';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/tab4" component={ScheduleJob} />
          <Route path="/tab5" component={Profile} />
          <Route path="/tab6" component={AvailableJob} />
          <Route path="/tab7" component={Notifications} />
          <Route path="/tab8" component={MyJobSummary} />
          <Route path="/tab9" component={Associates} />
          <Route path="/tab10" component={Login} />
          <Route path="/tab11" component={Logout} />
          <Route path="/tab12" component={CreateAccount} />
          <Route path="/" render={() => <Redirect to="/tab10" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon icon={person} />
            <IonLabel></IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={home} />
            <IonLabel></IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab7" href="/tab7">
            <IonIcon icon={notifications} />
            <IonLabel></IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
