import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
  IonLabel,
  IonRouterLink,
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
import {
  Link,
  matchPath,
  match,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import "./AssociateProfile.css";
import GetUser from "../components/GetUser";

// const checkboxList = [{ val: "Scheduler", isChecked: true }];

interface AssociateProfileProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const MyAssociateProfile: React.FC<AssociateProfileProps> = ({ match }) => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    isScheduler: boolean;
    isDeleted: boolean;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [ListProfile, setListProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    isScheduler: false,
    isDeleted: false,
    Company: "",
    Occupation: "",
    ProfilePicURL: ""
  });

  // console.log(match.params.id);

  const fetchProfile = () => {
    return axios
      .get("http://localhost:3000/user/AssociateProfile/" + match.params.id, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        return response.data;
      });
  };

  // console.log(profile);
  React.useEffect(() => {
    fetchProfile().then((data) => setListProfile(data.user));
  }, []);

  console.log(ListProfile);

  interface SelfData {
    UserId: number;
  }

  const [Self, setSelf] = React.useState<SelfData>({
    UserId: 0,
  });

  React.useEffect(() => {
    GetUser().then((data) => setSelf(data.personDataFound));
  }, []);

  console.log(Self);

  var requestResponse = {};

  const handleClick = () => {
    requestResponse = {"RequestStatus":"Fired"};
    axios
      .put("http://localhost:3000/businessassociate/UpdateRequest", { Self, ListProfile, requestResponse })
      .then((response) => {
        console.log(response);
      });
  };

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
              <Link to="/Notifications">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonImg src={ListProfile.ProfilePicURL}></IonImg>
            </IonCol>
            <IonCol className="title2">
              <h1>{ListProfile.FirstName}</h1>
              <h1>{ListProfile.LastName}</h1>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Company/Agency:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Company}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Occupation:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Occupation}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Email:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Email}</h3>
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
              <Link to="/Associates">
                <IonButton
                  onClick={handleClick}
                  href="/MyJobs"
                  color="danger"
                  size="large"
                  expand="block"
                  fill="solid"
                >
                  Fire Associate
                </IonButton>
                <br></br>
              </Link>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default MyAssociateProfile;
