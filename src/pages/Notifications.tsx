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
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import "./Notifications.css";
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
          <IonRow className="">
            <IonCol className="title2"></IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          <IonItem className="listJobs">
            <IonLabel>

                  <IonList className="searchBar">
                    {requests.map((val, key) => {
                      return (
                        <Link to={`/AssociateProfile/${val.UserId}`}>
                          <IonItem className="searchBar">
                            <IonCol className="listCol">
                            <IonThumbnail>
                                <img src={val.ProfilePicURL} />
                              </IonThumbnail>
                            </IonCol>
                            <IonCol className="listCol">
                              {val.FirstName} {val.LastName} Requested You
                            </IonCol>
                            <IonCol className="listCol">{}</IonCol>
                            <IonCol></IonCol>
                          </IonItem>
                        </Link>
                      );
                    })}
                  </IonList>

            </IonLabel>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Notifications;
