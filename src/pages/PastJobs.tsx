import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTab,
  IonRouterLink,
  IonTabs,
  IonAvatar,
  useIonViewDidEnter,
  IonDatetime,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import "./MyJobs.css";
import GetUser from "../components/GetUser";
import axios from "axios";

const PastJobs: React.FC = () => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  // Get Array Of All My Associates
  interface MyPastJobsData {
    ShiftShiftId: number;
    // ShiftIdentifier: string;
    Company: string;
    Date: string;
    SchedulerProfilePicURL: string;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<MyPastJobsData[]>([
    {
      ShiftShiftId: 0,
      // ShiftIdentifier: "",
      Company: "Go Get",
      Date: "Some Work!!",
      SchedulerProfilePicURL: "../assets/profilePic.png",
    },
  ]);

  const fetchPastJobs = () => {
    return axios
      .get("http://localhost:3000/shifts/MyPastJobs/" + profile.UserId, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchPastJobs().then((data) => setMyPastJobs(data.pastShifts2));
  }, [profile]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Past Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Past Jobs
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

        <IonList>
          {myPastJobs.map((myPastJob) => (
            <IonItem href={`/PastJob/${myPastJob.ShiftShiftId}`} key={myPastJob.ShiftShiftId}>
                <IonAvatar className="avatario" slot="start" >
                  <img src={myPastJob.SchedulerProfilePicURL}  /> 
                </IonAvatar>
              <IonLabel className="labelo">
                <h1>{myPastJob.Company}</h1>
                <p>{myPastJob.Company}</p>
              </IonLabel>
              <IonDatetime
                slot="end"
                displayFormat="DD-MMM-YY"
                value={myPastJob.Date}
              ></IonDatetime>
            </IonItem>
          ))}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default PastJobs;
