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
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from "ionicons/icons";
import "./AvailableJobs.css";
import { Link } from "react-router-dom";
import axios from "axios";
import GetUser from "../components/GetUser";

const AvailableJobs: React.FC = () => {
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
    JJobId: number;
    JJobId2: any;
    SchedulerId: any;
    Company: any;
    Location: string;
    Date: any;
    SchedulerProfilePicURL: any;
  }

  const [availableJobs, setAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      JJobId: 0,
      JJobId2: 0,
      SchedulerId: 0,
      Company: "No     Jobs",
      Location: "",
      Date: "Yet",
      SchedulerProfilePicURL: "../assets/profilePic.png",
    },
  ]);

  const fetchAvailableJobs = () => {
    return axios
      .get("http://localhost:3000/shifts/AvailableShifts/" + profile.UserId, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) => {
      setAvailableJobs(data.availableShifts2);
      console.log();
    });
  }, [profile]);

  console.log(availableJobs);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Available Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Available Jobs
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
          {availableJobs.map((availableJob) => (
            <IonItem href={`/AvailableJob/${availableJob.JJobId}`} key={availableJob.JJobId}>
                <IonAvatar className="avatario" slot="start" >
                  <img src={availableJob.SchedulerProfilePicURL}  /> 
                </IonAvatar>
              <IonLabel className="labelo">
                <h1>{availableJob.Company}</h1>
                <p>{availableJob.Location}</p>
              </IonLabel>
              <IonDatetime
                slot="end"
                displayFormat="DD-MMM-YY"
                value={availableJob.Date}
              ></IonDatetime>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default AvailableJobs;
