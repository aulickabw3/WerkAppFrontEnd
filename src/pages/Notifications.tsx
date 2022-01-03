import React, { useState, useEffect } from "react";
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import "./Notifications.css";
import GetUser from "../components/GetUser";

export const Notifications: React.FC<RouteComponentProps> = ({match}) => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    associates: string;
    requests: string;
  }

  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    associates: "",
    requests: "",
  });

  // console.log(profile);
  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);


  console.log(profile);


  React.useEffect(() => {
    axios
      .post("http://localhost:3000/associates/tab7", { profile })
      .then((response) => {
        console.log(response);
      });
  })

  // var requests = profile.requests;
  // var myRequestsArray = JSON.parse("[" + requests + "]");
  // console.log(myRequestsArray);
  // console.log(typeof myRequestsArray[0]);



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="titleNoti">Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="titleNotif" size="large">
              Notifications
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/tab1">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">
                    <IonList className="searchBar">
                {/* {myRequestsArray
                  .map(() => {
                    return (
                      <Link to={`/tab14/${requests}`}>
                        <IonItem className="searchBar">
                          <p>requests</p>
                        </IonItem>
                      </Link>
                    );
                  })} */}
              </IonList>
                    </IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          {/* <h3>{profile.Email}</h3> */}
          {/* Extra fake ones.. */}

          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          <IonItem className="listJobs">
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <Link to="/tab1">
                    <IonCol className="listCol">
                      <IonIcon icon={person} />
                    </IonCol>
                    <IonCol className="listCol">A Thing Happened</IonCol>
                    <IonCol className="listCol"></IonCol>
                  </Link>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
        </IonList>
        {/* <ExploreContainer name="don" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
