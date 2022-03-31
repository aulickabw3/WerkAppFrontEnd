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

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList className="searchBar">
                {myScheduledJobs.map((val, key) => {
                  return (
                    <Link to={`/ScheduledJob/${val.ShiftShiftId}`}>
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

export default ScheduledJobs;