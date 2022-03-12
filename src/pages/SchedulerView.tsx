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
import "./Main.css";
import { arrowBackCircle } from "ionicons/icons";

export const SchedulerView: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">WerkApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title1" size="large">
              Scheduler View
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1></h1>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/MyJobs">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
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
          {/* <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/CreateJob"
                color="secondwarning"
                size="large"
                expand="block"
                fill="outline"
              >
                Create Job
              </IonButton>
            </IonCol>
          </IonRow> */}
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/MyJobs"
                color="secondwarning"
                size="large"
                expand="block"
                fill="outline"
              >
                My Jobs
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/Crews"
                color="secondwarning"
                size="large"
                expand="block"
                fill="outline"
              >
                Manage Crews
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SchedulerView;