import React, { useState } from "react";
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
  IonThumbnail,
  IonAvatar,
  IonImg,
  useIonViewDidEnter,
  IonDatetime,
  IonSearchbar,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack, people } from "ionicons/icons";
import { Link } from "react-router-dom";
// import "./Associates.css";
// import "./Search.css";
import "./Main.css";
import GetUser from "../components/GetUser";

const Associates: React.FC = () => {
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
        "http://localhost:3000/businessassociate/ListOfAssociates/" +
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

  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Associates</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Associates
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                animated
              ></IonSearchbar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          {associates
          .filter((value) => {
            if (searchText == "") {
              return value;
            } else if (
              value.FirstName.toLowerCase().includes(
                searchText.toLowerCase()
              )
            ) {
              return value;
            } else if (
              value.LastName.toLowerCase().includes(
                searchText.toLowerCase()
              )
            ) {
              return value;
            }
          })
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
      </IonContent>
    </IonPage>
  );
};

export default Associates;
