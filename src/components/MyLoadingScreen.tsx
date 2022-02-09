import React from "react";
import {
    IonContent,
    IonButton,
    IonLabel,
    IonRouterLink,
    IonList,
    IonItem,
    IonSpinner,
    IonIcon,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,

  } from "@ionic/react";
  import { person, arrowBackCircle, people } from "ionicons/icons";




const MyLoadingScreen: React.FC = () => {
    return (
      <IonPage>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonContent>

                <IonSpinner />

              </IonContent>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonPage>
    )
  };

  export default MyLoadingScreen;
