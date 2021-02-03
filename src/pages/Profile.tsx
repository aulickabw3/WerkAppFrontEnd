import React, { useState, useEffect } from "react";
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
  IonImg,
  IonCheckbox,
} from "@ionic/react";
import { person, arrowBackCircle, people } from "ionicons/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile.css";
import { Component } from "ionicons/dist/types/stencil-public-runtime";

// const checkboxList = [{ val: "Scheduler", isChecked: true }];

const Profile: React.FC = () => {

  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    Password: string;
    isScheduler: boolean;
    isDeleted: boolean;
    company: string;
    occupation: string;
    associates: string;
  }

  const fetchProfile = () => {
    return axios
      .get("http://localhost:3000/users/tab5", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    Password: "",
    isScheduler: false,
    isDeleted: false,
    company: "",
    occupation: "",
    associates: "",
  });

    // console.log(profile);
    React.useEffect(() => {
    fetchProfile().then((data) => setProfile(data.personDataFound));
  }, []);

  console.log(profile);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Profile
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/tab1">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonImg src="../assets/profilePic.png"></IonImg>
            </IonCol>
            <IonCol className="title2">
              <h1>{profile.FirstName}</h1>
              <h1>{profile.LastName}</h1>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Company/Agency:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{profile.company}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Occupation:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{profile.occupation}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Email:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{profile.Email}</h3>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Scheduler: </IonLabel>
              <IonCheckbox
                className="listCol1"
                // checked={checked}
                // onIonChange={(e) => setChecked(e.detail.checked)}
              />
            </IonCol>
          </IonRow>
          <br></br>
          <br></br>
          <IonRow className="listCol1">
            <IonCol className="listJobs">
              <Link to="/tab9">
                <IonIcon size="large" icon={people} />
                <br></br>
                <IonLabel>Associates</IonLabel>
              </Link>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        ​
        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          ​
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          ​
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab5">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">John Doe</IonCol>
                    <IonCol className="listCol">FWC</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          ​
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow className="listJobs">
                  <Link to="/tab9">
                    <IonCol className="listCol">See All</IonCol>
                  </Link>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
