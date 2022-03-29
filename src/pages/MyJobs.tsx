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
import { arrowBackCircle } from "ionicons/icons";

export const MyJobs: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">My Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title1" size="large">
              My Jobs
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1></h1>
        <IonGrid>
          <IonRow>
            <IonCol size="2">
              <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol size="2"></IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
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
                href="/MyScheduledJobs"
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
          {/* <IonRow className="grid1">
            <IonCol >
              <IonButton
                href="/SchedulerView"
                color="medium"
                size="large"
                expand="block"
                fill="solid"
              >
                Scheduler View
              </IonButton>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyJobs;
