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
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack, people } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./Associates.css";
import "./Search.css";
import GetUser from "../components/GetUser";

const Associates: React.FC = () => {
  //GET MY PROFILE DATA
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
  });

  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);
  console.log(profile);

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
      ProfilePicURL: "",
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

  console.log(associates);
  console.log(typeof associates);

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
              <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className="">
            <IonCol className="title2">
              <IonIcon size="large" icon={people} />
              <br></br>
              <IonLabel>
                <h1>Associates</h1>
              </IonLabel>
            </IonCol>
          </IonRow>
          <br></br>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList className="searchBar">
                {associates.map((val, key) => {
                  console.log(val.ProfilePicURL);
                  return (
                    <Link to={`/AssociateProfile/${val.UserId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="2" className="listCol">
                          <IonAvatar>
                            <img src={val.ProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="listCol">
                          {val.FirstName} {val.LastName}
                        </IonCol>
                        <IonCol size="2" className="listCol">{val.Company}</IonCol>
                      </IonItem>
                    </Link>
                  );
                })}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Associates;
