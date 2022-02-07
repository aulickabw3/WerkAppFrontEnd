import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
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
  IonSpinner,
} from "@ionic/react";


 //Loding screen
  /////////////////
  const MyLoadingScreen: React.FC = () => {
    return (
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid></IonGrid>
        <IonGrid></IonGrid>
        <IonGrid></IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonSpinner />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  };

  export default MyLoadingScreen;