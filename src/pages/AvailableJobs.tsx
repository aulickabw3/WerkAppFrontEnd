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
} from "@ionic/react";
import { person, arrowBackCircle, arrowBack } from 'ionicons/icons';
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
    SchedulerId: string;
    Company: string;
    Date: string;
    SchedulerProfilePicURL: string;
  }

  const [availableJobs, setAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      JJobId: 0,
      SchedulerId: "",
      Company: "No     Jobs",
      Date: "Yet",
      SchedulerProfilePicURL: '../assets/profilePic.png',
    },
  ]);

  const fetchAvailableJobs = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/AvailableShifts/" +
          profile.UserId,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchAvailableJobs().then((data) => setAvailableJobs(data.listOfJobs));
  }, [profile]);


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

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList className="searchBar">
                {availableJobs.map((val, key) => {
                  return (
                    <Link to={`/AvailableJob/${val.JJobId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="2" className="listCol">
                          <IonAvatar>
                            <img src={val.SchedulerProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="listCol">
                          {val.Company}
                        </IonCol>
                        <IonCol size="2" className="listCol">
                          {val.Date}
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

export default AvailableJobs;
