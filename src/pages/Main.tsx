import React, { useState } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import {
  IonIcon,
  IonSearchbar,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import axios from "axios";
import "./Main.css";

export const Main: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    axios
      .get("http://localhost:3000/user/Logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">WerkApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title1" size="large">
              WerkApp
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1></h1>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                animated
              ></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/AvailableJobs"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Available Jobs
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/ScheduledJobs"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Scheduled Jobs
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/PastJobs"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Past Jobs
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol >
              <IonButton
                href="/SchedulerView"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Scheduler View
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                onClick={handleClick}
                href="/Login"
                color="medium"
                size="large"
                expand="block"
                fill="solid"
              >
                Log Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Main;
