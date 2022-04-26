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
  useIonViewDidEnter,
  IonDatetime,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import "./AvailableJobs.css";
import "./Search.css";
import GetUser from "../components/GetUser";

export const Notifications: React.FC<RouteComponentProps> = ({ match }) => {
  //GET MY PROFILE DATA
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);
  console.log(profile);

  // GET ARRAY OF ALL NEW REQUESTS
  interface NotificationsDate {
    NotificationId: number;
    isRead: boolean;
    SenderPicUrl: string;
    NotificationType: string
    Message: string;
    MessageDate: string;
    NotificationLink: string
  }

  const [notifications, setNotifications] = React.useState<NotificationsDate[]>([
    {
      NotificationId: 0,
      isRead: false,
      SenderPicUrl: "../assets/profilePic.png",
      NotificationType: "No Notifications",
      Message: "Here Yet! Go do stuff!",
      MessageDate: "Yet!",
      NotificationLink: ""
    },
  ]);

  const fetchRequests = () => {
    return axios
      .get(
        "http://localhost:3000/notifications/WhatWillItBeCalled?" + profile.UserId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchRequests().then((data) => setNotifications(data.happyResult2));
  }, [profile]);



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

        <IonList>
          {notifications.map((notification) => (
            <IonItem href={`${notification.NotificationLink}`} key={notification.NotificationId}>
                <IonAvatar className="avatario" slot="start" >
                  <img src={notification.SenderPicUrl}  /> 
                </IonAvatar>
              <IonLabel className="labelo">
                <h1>{notification.NotificationType}</h1>
                <p>{notification.Message}</p>
              </IonLabel>
              <IonDatetime
                slot="end"
                displayFormat="DD-MMM-YY"
                value={notification.MessageDate}
              ></IonDatetime>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Notifications;
