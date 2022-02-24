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
  IonThumbnail,
  IonAvatar,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import "./Notifications.css";
import "./Search.css";
import GetUser from "../components/GetUser";

export const Notifications: React.FC<RouteComponentProps> = ({ match }) => {
  //GET MY PROFILE DATA
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
    LastName: string;
    Occupation: string;
    UserId: number;
    ProfilePicURL: string;
  }

  const [requests, setRequests] = React.useState<RequestsData[]>([
    {
      Company: "",
      FirstName: "",
      LastName: "",
      Occupation: "",
      UserId: 0,
      ProfilePicURL: "",
    },
  ]);

  const fetchRequests = () => {
    return axios
      .post(
        "http://localhost:3000/businessassociate/Notifications/RequestsReceived",
        {
          profile,
        }
      )
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
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
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonList>
                {requests.map((val, key) => {
                  return (
                    <Link to={`/AssociateProfile/${val.UserId}`}>
                      <IonItem>
                        <IonCol size="1" className="listCol">
                          <IonAvatar>
                            <img src={val.ProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="8" className="listCol">
                          {val.FirstName} {val.LastName} Has Requested You as an Associate
                        </IonCol>
                        
                      </IonItem>
                    </Link>
                  );
                })}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
