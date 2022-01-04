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
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./ScheduleForm.css";

const ScheduleForm: React.FC = () => {
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Job Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Job Summary
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/Main">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
            </IonRow>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <h1>Date:</h1>
              <br></br>
              8/22/20
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <h1>Time:</h1>
              <br></br>
              9p-5a
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <h1>Company:</h1>
              <br></br>
              P&S Paving
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <h1>Location:</h1>
              <br></br>
              I4/I95
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <br></br>
          <IonRow className="jobGrid">
            <IonCol>
              <h1>Pay:</h1>
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <h1>$65/hr</h1>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton href="/" color="success" size="large" fill="solid">
                Schedule
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <h1>Notes:</h1>
            </IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              4 hr min. Meet at BP on 92
            </IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol>
              <h1>Point Of Contact:</h1>
              <br></br>
              John Doe (386)123-4567
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default ScheduleForm;