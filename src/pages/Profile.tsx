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
} from "@ionic/react";
import { person, arrowBackCircle, people, pencilSharp } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./Profile.css";
import GetUser from "../components/GetUser";

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
  });

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);


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
              <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
              <Link to="/EditProfile">
                <IonButton color="danger" fill="outline">
                  edit profile
                  {/* <IonIcon size="large" icon={pencilSharp} /> */}
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonAvatar className="avatarino">
                <img src={profile.ProfilePicURL}></img>
              </IonAvatar>
              {/* <IonImg src={profile.ProfilePicURL}></IonImg> */}
            </IonCol>
            <IonCol className="title2">
              {/* <h1>{profile.FirstName}</h1>
              <h1>{profile.LastName}</h1> */}
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            {/* <IonCol size=""></IonCol> */}
            <IonCol size="">
              <h1>{profile.FirstName} {profile.LastName}</h1>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
          {/* <IonCol size="">
            </IonCol> */}
            <IonCol >
              <p>{profile.Occupation} @ {profile.Company}</p>
              <p>{profile.Email}</p>
            </IonCol>
          </IonRow>
          {/* <IonRow className="profileGrid">
            <IonCol size="1">
            </IonCol>
            <IonCol >
              {profile.Email}
            </IonCol>
          </IonRow> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <IonRow className="profileGrid">
            {/* <IonCol size="1"></IonCol> */}
            <IonCol >
                This is a temporary bio! Just a quick few sentence or about who
                I am or whatever. I am a robot and I used to be a clown.
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
          
          
          <IonRow className="listCol1">
            <IonCol className="listJobs">
              <Link to="/Associates">
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
      </IonContent>
    </IonPage>
  );
};
export default Profile;
