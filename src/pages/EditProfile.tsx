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
  useIonViewDidEnter,
  IonTabBar,
  IonTabButton,
} from "@ionic/react";
import { person, arrowBackCircle, people,camera, trash, close } from "ionicons/icons";
import axios from "axios";
import { Link, RouteComponentProps } from "react-router-dom";
import "./Profile.css";
// import "../components/GetUser";
import GetUser from "../components/GetUser";


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
    UserBio: string;
  }

  // const checkboxList = [{ val: "Scheduler", isChecked: true }];

  const [editProfile, setEditProfile] = React.useState<ProfileData>({
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

  useIonViewDidEnter(() => {
    GetUser().then((data) => {
      setEditProfile(data.personDataFound);
    });
  }, []);

  const handleSubmit = () => {
    axios
      .put(
        "https://werkapp-server.com/user/PublicUpdateUserProfile/" +
          editProfile.UserId,
        {
          withCredentials: true,
          editProfile,
        }
      )
      .then((response) => {
        console.log(response);
      });
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
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
            <IonButton
                  href="/Profile"
                  color="danger"
                  fill="solid"
                  onClick={handleSubmit}
                >
                  Save
                </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <form>
            <IonRow className="profileGrid">
              <IonCol>
                <IonImg src={editProfile.ProfilePicURL}></IonImg>
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
                        value={editProfile.FirstName}
                        placeholder="First Name"
                        onIonChange={(e: any) =>
                          setEditProfile({
                            ...editProfile,
                            FirstName: e.target.value,
                          })
                        }
                        clearInput
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        type="text"
                        name="LastName"
                        value={editProfile.LastName}
                        placeholder="Last Name"
                        onIonChange={(e: any) =>
                          setEditProfile({
                            ...editProfile,
                            LastName: e.target.value,
                          })
                        }
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
                    value={editProfile.Email}
                    placeholder="Email Address"
                    onIonChange={(e: any) =>
                      setEditProfile({ ...editProfile, Email: e.target.value })
                    }
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Username:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="Username"
                    value={editProfile.Username}
                    placeholder="Username"
                    onIonChange={(e: any) =>
                      setEditProfile({
                        ...editProfile,
                        Username: e.target.value,
                      })
                    }
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
                    name="Company"
                    value={editProfile.Company}
                    placeholder="Company/Ageny You Work For..."
                    onIonChange={(e: any) =>
                      setEditProfile({
                        ...editProfile,
                        Company: e.target.value,
                      })
                    }
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
                    name="Occupation"
                    value={editProfile.Occupation}
                    placeholder="Your Occupation..."
                    onIonChange={(e: any) =>
                      setEditProfile({
                        ...editProfile,
                        Occupation: e.target.value,
                      })
                    }
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>About:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="Occupation"
                    value={editProfile.UserBio}
                    placeholder="About Me..."
                    onIonChange={(e: any) =>
                      setEditProfile({
                        ...editProfile,
                        UserBio: e.target.value,
                      })
                    }
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
          </form>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default EditProfile;
