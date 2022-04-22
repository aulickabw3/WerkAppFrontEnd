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
  useIonViewDidEnter,
  IonAvatar,
  IonDatetime,
  IonThumbnail,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import "./MyJobs.css";
import GetUser from "../components/GetUser";
import axios from "axios";

const ScheduledJobs: React.FC = () => {
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
  interface MyScheduledJobsData {
    ShiftShiftId: number;
    // ShiftIdentifier: string;
    Company: string;
    Date: string;
    SchedulerProfilePicURL: string;
  }

  const [myScheduledJobs, setMyScheduledJobs] = React.useState<
    MyScheduledJobsData[]
  >([
    {
      ShiftShiftId: 0,
      // ShiftIdentifier: "",
      Company: "Go Get",
      Date: "Some Work!!",
      SchedulerProfilePicURL: "../assets/profilePic.png",
    },
  ]);

  const fetchScheduledJobs = () => {
    return axios
      .get("http://localhost:3000/shifts/MyScheduledJobs/" + profile.UserId, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchScheduledJobs().then((data) =>
      setMyScheduledJobs(data.scheduledShifts2)
    );
  }, [profile]);

  console.log(myScheduledJobs);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Scheduled Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Scheduled Jobs
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
          {myScheduledJobs.map((myScheduledJob) => (
            <IonItem href={`/ScheduledJob/${myScheduledJob.ShiftShiftId}`} key={myScheduledJob.ShiftShiftId}>
                <IonAvatar className="avatario" slot="start" >
                  <img src={myScheduledJob.SchedulerProfilePicURL}  /> 
                </IonAvatar>
              <IonLabel className="labelo">
                <h1>{myScheduledJob.Company}</h1>
                <p>{myScheduledJob.Company}</p>
              </IonLabel>
              <IonDatetime
                slot="end"
                displayFormat="DD-MMM-YY"
                value={myScheduledJob.Date}
              ></IonDatetime>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default ScheduledJobs;
