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
  IonThumbnail,
  IonAvatar,
  IonImg,
  useIonViewDidEnter,
  IonButton,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack, people } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./Associates.css";
import "./Search.css";
import GetUser from "../components/GetUser";

const Crews: React.FC = () => {
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">My Crews</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              My Crews
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/SchedulerView">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br></br>
        <IonGrid>
          <IonRow className="">
            <IonCol className="title2">
              <IonIcon size="large" icon={people} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className="grid1">
            <IonCol>
              <IonButton
                href="/AddNewCrew"
                color="secondwarning"
                size="large"
                expand="block"
                fill="outline"
              >
                + Add New
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Crews;
