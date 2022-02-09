import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonLabel,
  IonButton,
  IonInput,
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
// import "../components/GetUser";
import GetUser from "../components/GetUser";

// const checkboxList = [{ val: "Scheduler", isChecked: true }];

const EditProfile: React.FC = () => {
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

  const [profile, setProfile] = React.useState<ProfileData>({
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

  // console.log(profile);
  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  console.log(profile);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

  const handleSubmit = () => {
    const editProfile = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Company: company,
      Occupation: occupation,
    };

    // axios
    //   .put("http://localhost:3000/user/EditProfile", { editProfile })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Edit Profile
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/Profile">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <form>
            <br></br>
            <IonRow className="profileGrid">
              <IonCol>
                <IonImg src={profile.ProfilePicURL}></IonImg>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Name:</h1>
                  </IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        type="text"
                        name="FirstName"
                        value={firstName}
                        placeholder={profile.FirstName}
                        onIonChange={(e: any) => setFirstName(e.target.value)}
                        clearInput
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        type="text"
                        name="LastName"
                        placeholder={profile.LastName}
                        onIonChange={(e: any) => setLastName(e.target.value)}
                        clearInput
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Email:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="Email"
                    placeholder={profile.Email}
                    onIonChange={(e: any) => setEmail(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company/Agency:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="company"
                    placeholder={profile.Company}
                    onIonChange={(e: any) => setCompany(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Occupation:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="occupation"
                    placeholder={profile.Occupation}
                    onIonChange={(e: any) => setOccupation(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <IonButton
                  href="/Login"
                  // type="submit"
                  color="danger"
                  size="large"
                  expand="block"
                  fill="solid"
                  onClick={handleSubmit}
                >
                  Save
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default EditProfile;
