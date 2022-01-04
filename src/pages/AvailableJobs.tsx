import React from "react";
import {
  IonIcon,
  IonContent,
  IonRow,
  IonCol,
  IonList,
  IonLabel,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from 'ionicons/icons';
import ExploreContainer from "../components/ExploreContainer";
import "./AvailableJobs.css";
import { Link } from "react-router-dom";

const AvailableJobs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Available Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Available Jobs
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
            <Link to="/Main">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">P&S Paving</IonCol>
                    <IonCol className="listCol">8/22</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>

          {/* extra fake ones... */}
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">Archer Western</IonCol>
                    <IonCol className="listCol">8/18</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">P&S Paving</IonCol>
                    <IonCol className="listCol">8/17</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">Chinchor</IonCol>
                    <IonCol className="listCol">8/14</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">P&S Paving</IonCol>
                    <IonCol className="listCol">8/11</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">P&S Paving</IonCol>
                    <IonCol className="listCol">8/09</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/AvailableJob">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">P&S Paving</IonCol>
                    <IonCol className="listCol">8/08</IonCol>
                    <IonCol>4</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          
        </IonList>
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default AvailableJobs;
