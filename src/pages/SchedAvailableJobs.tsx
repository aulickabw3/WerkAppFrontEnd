import React, { useEffect, useState } from "react";
import {
  IonIcon,
  IonContent,
  IonRow,
  IonCol,
  IonList,
  IonLabel,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  useIonViewDidEnter,
  IonAvatar,
  IonDatetime,
  IonThumbnail,
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import "./AvailableJobs.css";
import { Link } from "react-router-dom";
import axios from "axios";
import GetUser from "../components/GetUser";

const SchedAvailableJobs: React.FC = () => {
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
  interface AvailableJobData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
  }

  const [availableJobs, setAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No     Jobs",
      DateDay: "Yet",
    },
  ]);

  const fetchAvailableJobs = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/SchedAvailableShifts/" + profile.UserId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) => {
      setAvailableJobs(data.SchedAvailableJob);
      // console.log("useEffect is working..");
    });
  }, [profile]);

  console.log(profile.UserId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Open Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Open Jobs
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
          {availableJobs.map((availableJob) => (
            // <Link to={`/SchedPastJob/${schedScheduledJob.ShiftId}`}>
            <IonItem
              href={`/SchedAvailableJob/${availableJob.ShiftId}`}
              className="listerillo"
              key={availableJob.ShiftId}
            >
              <IonLabel slot="">
                <h1>{availableJob.Company}</h1>
                <p>
                  {availableJob.ShiftIdentifier}/{" "}
                  {availableJob.ShiftIdentifier}
                </p>
              </IonLabel>
              <IonDatetime
                slot="end"
                displayFormat="DD-MMM-YY"
                value={availableJob.DateDay}
              ></IonDatetime>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SchedAvailableJobs;
