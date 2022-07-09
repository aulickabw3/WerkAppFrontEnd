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
  IonButton,
  IonAvatar,
  // useIonActionSheet,
  IonModal,
  useIonAlert,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  people,
  pencilSharp,
  ellipsisHorizontalOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import "./Profile.css";
import GetUser from "../components/GetUser";
import axios from "axios";


const Profile: React.FC = () => {

  const [present] = useIonAlert();

  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    IsScheduler: boolean;
    IsDeleted: boolean;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
    UserBio: string;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    IsScheduler: false,
    IsDeleted: false,
    Company: "",
    Occupation: "",
    ProfilePicURL: "",
    UserBio: "",
  });

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/user/Logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/Login";
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
          <br></br>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonAvatar className="avatarino">
                <img src={profile.ProfilePicURL}></img>
              </IonAvatar>
            </IonCol>
            <IonCol className="title2"></IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol size="">
              <h1>
                {profile.FirstName} {profile.LastName}
              </h1>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol size="11">
              <p>
                {profile.Occupation} @ {profile.Company}
              </p>
              <p>{profile.Email}</p>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol size="8">
              <Link to="/EditProfile">
                <IonButton
                  color="warning"
                  // size="large"
                  expand="block"
                  fill="solid"
                >
                  <IonIcon icon={pencilSharp} />
                  Edit Profile
                </IonButton>
              </Link>
            </IonCol>
            <IonCol size="3">
              <IonButton
                color="medium"
                expand="block"
                fill="solid"
                onClick={() =>
                  present({
                    header: "Logout",
                    buttons: ["Cancel", { text: "Ok", handler: handleLogout }],
                    onDidDismiss: (e) => console.log("did dismiss"),
                  })
                }
              >
                <IonIcon icon={ellipsisHorizontal} />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>{profile.UserBio}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
