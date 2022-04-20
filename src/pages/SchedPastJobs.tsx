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

const SchedPastJobs: React.FC = () => {

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
  interface SchedPastJobsData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<SchedPastJobsData[]>([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No Past",
      DateDay: "Jobs Yet",
    },
  ]);

  const fetchPastJobs = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/SchedPastShifts/" +
          profile.UserId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchPastJobs().then((data) => setMyPastJobs(data.SchedPastJob));
  }, [profile]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Past Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Past Jobs
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
                {myPastJobs.map((val, key) => {
                  return (
                    <Link to={`/SchedPastJob/${val.ShiftId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="2" className="listCol">
                          {val.ShiftIdentifier}
                        </IonCol>
                        <IonCol size="2" className="listCol">
                          {val.Company}
                        </IonCol>
                        <IonCol size="5" className="listCol">
                          <IonDatetime
                            displayFormat="DD-MMM-YY"
                            value={val.DateDay}
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

export default SchedPastJobs;
