import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import {
  person,
  personCircleOutline,
  arrowBackCircle,
  arrowBack,
} from "ionicons/icons";
import { Redirect, Route, Link, matchPath, useRouteMatch, RouteComponentProps } from "react-router-dom";
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
} from "@ionic/react";
import axios from "axios";
import "./Search.css";

export const Search: React.FC<RouteComponentProps> = ({match}) => {
  interface UsersData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    Password: string;
    isScheduler: boolean;
    isDeleted: boolean;
    company: string;
    occupation: string;
    associates: string;
  }

  const fetchUsers = () => {
    return axios
      .get("http://localhost:3000/users/tab13", {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  const [users, setUsers] = React.useState<UsersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      Username: "",
      Password: "",
      isScheduler: false,
      isDeleted: false,
      company: "",
      occupation: "",
      associates: "",
    },
  ]);

  React.useEffect(() => {
    fetchUsers().then((data) => setUsers(data.person));
  }, []);

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
        <IonRow>
          <IonCol>
            <Link to="/tab1">
              <IonIcon size="large" icon={arrowBackCircle} />
            </Link>
          </IonCol>
          <IonCol></IonCol>
          <IonCol></IonCol>
        </IonRow>
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
                      return value;
                    } else if (
                      value.FirstName.toLowerCase().includes(
                        searchText.toLowerCase()
                      )
                    ) {
                      return value;
                    }
                  })
                  .map((val, key) => {
                    return (
                      <Link to={`/tab14/${val.UserId}`}>
                        <IonItem className="searchBar">
                          <p>{val.FirstName}</p>
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

export default Search;
