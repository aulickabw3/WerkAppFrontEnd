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

const SchedScheduledJobs: React.FC = () => {
  interface ProfileData {
    UserId: number;
  }
  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  // Get Array Of All My Associates
  interface SchedScheduledJobsData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
  }

  const [schedScheduledJobs, setSchedScheduledJobs] = React.useState<
    SchedScheduledJobsData[]
  >([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No Jobs",
      DateDay: "Sched Yet",
    },
  ]);

  const fetchScheduledJobs = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/SchedScheduledShifts/" + profile.UserId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchScheduledJobs().then((data) =>
      setSchedScheduledJobs(data.SchedScheduledJob)
    );
  }, [profile]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Scheduled Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Scheduled Jobs
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/SchedulerView">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          {schedScheduledJobs.map((schedScheduledJob) => (
              <IonItem href={`/SchedScheduledJob/${schedScheduledJob.ShiftId}`} className="listerillo" key={schedScheduledJob.ShiftId}>
                <IonLabel>
                  <h1>{schedScheduledJob.Company}</h1>
                  <p>
                    {schedScheduledJob.ShiftIdentifier}/{" "}
                    {schedScheduledJob.ShiftIdentifier}
                  </p>
                </IonLabel>
                <IonDatetime
                  slot="end"
                  displayFormat="DD-MMM-YY"
                  value={schedScheduledJob.DateDay}
                ></IonDatetime>
              </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default SchedScheduledJobs;
