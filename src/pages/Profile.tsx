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

// const checkboxList = [{ val: "Scheduler", isChecked: true }];

const Profile: React.FC = () => {
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
      });
  };

  // const [present, dismiss] = useIonActionSheet();

  // const canDismiss = () => {
  //   return new Promise(async (resolve) => {
  //     await present({
  //       header: "Are you sure you want to discard your changes?",
  //       buttons: [
  //         {
  //           text: "Discard Changes",
  //           role: "destructive",
  //         },
  //         {
  //           text: "Keep Editing",
  //           role: "cancel",
  //         },
  //       ],
  //       onDidDismiss: (ev: CustomEvent) => {
  //         const role = ev.detail.role;

  //         if (role === "destructive") {
  //           resolve(true);
  //         }

  //         resolve(false);
  //       },
  //     });
  //   });
  // };

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
          <br></br>
          <br></br>
        </IonGrid>
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
          <br></br>
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
              {/* <IonModal trigger="trigger-button">
                <IonContent>Modal Content</IonContent>
              </IonModal> */}
              <Link to="/EditProfile">
                <IonButton
                  id="trigger-button"
                  color="medium"
                  // size="large"
                  expand="block"
                  fill="solid"
                >
                  <IonIcon icon={ellipsisHorizontal} />
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            {/* <IonCol size="1"></IonCol> */}
            <IonCol>
              {profile.UserBio}
            </IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol>
              <IonLabel>Scheduler: </IonLabel>
              <IonCheckbox
                className="listCol1"
                // checked={checked}
                // onIonChange={(e) => setChecked(e.detail.checked)}
              />
            </IonCol>
          </IonRow> */}
          <br></br>
          <br></br>

          <br></br>
          <br></br>
          <br></br>

          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>

          <IonRow className="grid1">
            <IonCol>
              <IonButton
                onClick={handleLogout}
                href="/Login"
                color="medium"
                size="large"
                expand="block"
                fill="solid"
              >
                Log Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
