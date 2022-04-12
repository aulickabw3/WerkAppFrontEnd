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
    JJobId: any;
    JJobId2: any;
    SchedulerId: any;
    Company: any;
    Date: any;
    SchedulerProfilePicURL: any;
  }

  const [availableJobs, setAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      JJobId: 0,
      JJobId2: 0,
      SchedulerId: 0,
      Company: "No     Jobs",
      Date: "Yet",
      SchedulerProfilePicURL: "../assets/profilePic.png",
    },
  ]);

  const fetchAvailableJobs = () => {
    return axios
      .get("http://localhost:3000/shifts/SchedAvailableShifts/" + profile.UserId, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) => {
      setAvailableJobs(data.availableShifts2);
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

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList className="searchBar">
                {availableJobs.map((val, key) => {
                  return (
                    <Link to={`/SchedAvailableJob/${val.JJobId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="2" className="listCol">
                          <IonAvatar>
                            <img src={val.SchedulerProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="2" className="listCol">
                          {val.Company}
                        </IonCol>
                        <IonCol size="5" className="listCol">
                          <IonDatetime
                            displayFormat="DD-MMM-YY"
                            value={val.Date}
                          ></IonDatetime>
                        </IonCol>
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

export default SchedAvailableJobs;