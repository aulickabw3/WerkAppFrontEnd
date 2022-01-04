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
      .get("http://localhost:3000/users/Logout", {
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
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <h1></h1>
        <IonGrid className="wholeGrid">
          <IonRow>
            <IonCol>
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
                href="/MyJobs"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                My Jobs
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/ScheduleJob"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Schedule Job
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/Profile"
                color="warning"
                size="large"
                expand="block"
                fill="solid"
              >
                Profile
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
