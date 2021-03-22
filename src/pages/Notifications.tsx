import React from "react";
import {
    IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from 'ionicons/icons';
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import "./Notifications.css";

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="titleNoti">Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="titleNotif" size="large">
              Notifications
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/tab1">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>

            {/* Extra fake ones.. */}
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem><IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>

        </IonList>
        {/* <ExploreContainer name="don" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
