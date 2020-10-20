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
import "./Logout.css";
import { Link } from "react-router-dom";

const Logout: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Logged Out</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Logged Out
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
        <IonRow>
            <IonCol></IonCol>
            <IonCol><h1></h1></IonCol>
            <IonCol><h1></h1></IonCol>
            <IonCol></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol><h1>...</h1></IonCol>
            <IonCol><h1>Logged</h1></IonCol>
            <IonCol><h1>Out</h1></IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        
        
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Logout;
