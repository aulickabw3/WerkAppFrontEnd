import React, { useState } from "react";
import {
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCheckbox,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack, people } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import { Link } from "react-router-dom";
import "./Associates.css";

const checkboxList = [{ val: "Scheduler", isChecked: true }];

const Associates: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Associates</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
            Associates
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
          </IonRow>
        </IonGrid>
        <IonGrid>
          
          <IonRow className="">
            <IonCol className="title2">
              
                <IonIcon size="large" icon={people} />
                <br></br>
                <IonLabel><h1>Associates</h1></IonLabel>
             
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      

        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
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

export default Associates;