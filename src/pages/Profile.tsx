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
  useIonActionSheet,
  IonModal,
  useIonAlert,
  IonTabButton,
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
      .get("http://werkappserver-env.eba-qyjsvfm3.us-east-1.elasticbeanstalk.com/user/Logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/Login";
      });
  };

  const [present] = useIonAlert();

  // Get Array Of All My Associates
  interface AssociatesData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [associates, setAssociates] = React.useState<AssociatesData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Company: "",
      Occupation: "",
      ProfilePicURL: "../assets/profilePic.png",
    },
  ]);

  const fetchAssociates = () => {
    return axios
      .get(
        "http://werkappserver-env.eba-qyjsvfm3.us-east-1.elasticbeanstalk.com/businessassociate/ListOfAssociates/" +
          profile.UserId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchAssociates().then((data) => setAssociates(data.listOfAssociates2));
  }, [profile]);

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
          <IonTabButton tab="Associates" href="/Associates">
            <IonIcon size="large" icon={people} />
            <IonLabel>
              <h4>Associates</h4>
            </IonLabel>
          </IonTabButton>
          <IonList>
            {/* Need to rewrite this so the ".filter" and ".sort" methods are not
                being called on render... */}
            {associates
              .sort((a, b) => a.FirstName.localeCompare(b.FirstName))
              .map((associate) => (
                <IonItem
                  href={`/AssociateProfile/${associate.UserId}`}
                  key={associate.UserId}
                >
                  <IonAvatar className="avatario" slot="start">
                    <img src={associate.ProfilePicURL} />
                  </IonAvatar>
                  <IonLabel className="labelo">
                    <h1>
                      {associate.FirstName} {associate.LastName}
                    </h1>
                    <p>{associate.Company}</p>
                  </IonLabel>
                  <br></br>
                </IonItem>
              ))}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
