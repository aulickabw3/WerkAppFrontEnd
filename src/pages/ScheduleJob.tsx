import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonItem,
  IonInput,
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./ScheduleJob.css";

const ScheduleJob: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Schedule Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Schedule Job
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/tab1">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
            </IonRow>
          </IonRow>
          <br></br>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Date:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Time:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Company:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Location:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <br></br>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Pay:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>How Many:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Point Of Contact:</h1>
                </IonLabel>
                <IonRow>
                  <IonCol>
                    <IonInput placeholder="Name"> </IonInput>
                  </IonCol>
                  <IonCol>
                    <IonInput placeholder="Phone"> </IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Notes:</h1>
                </IonLabel>
                <IonInput> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton href="/tab6" color="success" size="large" fill="solid">
                Schedule
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>

        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default ScheduleJob;
