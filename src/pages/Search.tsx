import React, { useState, useEffect } from "react";
import AssociateProfile from "./AssociateProfile";
import {
  person,
  personCircleOutline,
  arrowBackCircle,
  arrowBack,
} from "ionicons/icons";
import {
  Redirect,
  Route,
  Link,
  matchPath,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import {
  IonIcon,
  IonSearchbar,
  IonButton,
  IonList,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import axios from "axios";
import GetUser from "../components/GetUser";
import "./Search.css";

export const Search: React.FC<RouteComponentProps> = ({ match }) => {
  interface ProfileData {
    UserId: number;
  }
  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
  });

  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);
  console.log(profile);

  interface UsersData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    IsScheduler: boolean;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [users, setUsers] = React.useState<UsersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      IsScheduler: false,
      Company: "",
      Occupation: "",
      ProfilePicURL: ""
    },
  ]);

  const fetchUsers = () => {
    return axios
      .get("http://localhost:3000/user/Search/" + profile.UserId, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchUsers().then((data) => setUsers(data.personArray));
  }, [profile]);

  console.log(users);
  console.log(typeof users);

  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title1" size="large">
              Search
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="wholeGrid">
          <IonRow>
            <IonCol className="listCol">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                animated
              ></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="searchBar">
              <IonList className="searchBar">
                {users
                  .filter((value) => {
                    if (searchText == "") {
                      return "";
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
                  .map((user) => (
                    <IonItem
                      href={`/AssociateProfile/${user.UserId}`}
                      key={user.UserId}
                    >
                      <IonAvatar className="avatario" slot="start">
                        <img src={user.ProfilePicURL} />
                      </IonAvatar>
                      <IonLabel className="labelo">
                        <h1>
                          {user.FirstName} {user.LastName}
                        </h1>
                        <p>{user.Company}</p>
                      </IonLabel>
                      <br></br>
                    </IonItem>
                  ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Search;
