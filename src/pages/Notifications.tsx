import React, { useState, useEffect } from "react";
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import "./Notifications.css";
import GetUser from "../components/GetUser";

export const Notifications: React.FC<RouteComponentProps> = ({ match }) => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
  });

  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);
  console.log(profile);

  // GET ARRAY OF ALL NEW REQUESTS
  interface RequestsData {
    Company: string;
    FirstName: string;
    Lastname: string;
    Occupation: string;
    UserId: number;
  }

  const [requests, setRequests] = React.useState<RequestsData[]>([
    {
      Company: "",
      FirstName: "",
      Lastname: "",
      Occupation: "",
      UserId: 0,
    },
  ]);

  const fetchRequests = () => {
    return axios
      .post("http://localhost:3000/businessassociate/Notifications/RequestsReceived", {
        profile,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchRequests().then((data) => setRequests(data.happyResult2));
  }, [profile]);

  console.log(requests);
  console.log(typeof requests);

  // var NewRequests = requests.User;
  // var myRequestsArray = JSON.parse("[" + NewRequests + "]");
  // console.log(myRequestsArray);
  // console.log(typeof myRequestsArray[0]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="titleNoti">Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="titleNotif" size="large">
              Notifications
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonList className="searchBar">
                    {requests.map((val, key) => {
                      return (
                        <Link to={`/AssociateRequestProfile/${val.UserId}`}>
                          <IonItem className="searchBar">
                            <IonCol className="listCol">
                              <IonIcon icon={person} />
                            </IonCol>
                            <IonCol className="listCol">
                              {val.FirstName} has requested you!
                            </IonCol>
                            <IonCol className="listCol"></IonCol>
                            <IonCol></IonCol>
                          </IonItem>
                        </Link>
                      );
                    })}
                  </IonList>

                  <IonCol className="listCol"></IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>

          {/* <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/Main">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
