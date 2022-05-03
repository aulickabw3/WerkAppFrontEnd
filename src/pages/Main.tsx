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
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonToggle,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  arrowBack,
  createOutline,
  reorderFour,
  reorderFourOutline,
  reorderThreeOutline,
} from "ionicons/icons";
import "./AvailableJobs.css";
import { Link } from "react-router-dom";
import axios from "axios";
import GetUser from "../components/GetUser";
import "./Main.css";
import { create } from "domain";

export const Main: React.FC = () => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    ProfilePicURL: string;
  }
  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    ProfilePicURL: "",
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  // Available Jobs Segment
  //////////////////////////////////////
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

  console.log(availableJobs);

  const AvailableJobsSegment: React.FC = () => {
    return (
      <IonList>
        {availableJobs.map((availableJob) => (
          <IonItem
            href={`/AvailableJob/${availableJob.JJobId}`}
            key={availableJob.JJobId}
          >
            <IonAvatar className="avatario" slot="start">
              <img src={availableJob.SchedulerProfilePicURL} />
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
    );
  };

  // Scheduled Jobs Segment
  //////////////////////////////////////////////
  interface MyScheduledJobsData {
    ShiftShiftId: number;
    Company: string;
    Date: string;
    SchedulerProfilePicURL: string;
  }

  const [myScheduledJobs, setMyScheduledJobs] = React.useState<
    MyScheduledJobsData[]
  >([
    {
      ShiftShiftId: 0,
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

  const ScheduledJobsSegment: React.FC = () => {
    return (
      <IonList>
        {myScheduledJobs.map((myScheduledJob) => (
          <IonItem
            href={`/ScheduledJob/${myScheduledJob.ShiftShiftId}`}
            key={myScheduledJob.ShiftShiftId}
          >
            <IonAvatar className="avatario" slot="start">
              <img src={myScheduledJob.SchedulerProfilePicURL} />
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
    );
  };

  // Past Jobs Segment
  /////////////////////////////////////////
  interface MyPastJobsData {
    ShiftShiftId: number;
    Company: string;
    Date: string;
    SchedulerProfilePicURL: string;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<MyPastJobsData[]>([
    {
      ShiftShiftId: 0,
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

  const PastJobsSegment: React.FC = () => {
    return (
      <IonList>
        {myPastJobs.map((myPastJob) => (
          <IonItem
            href={`/PastJob/${myPastJob.ShiftShiftId}`}
            key={myPastJob.ShiftShiftId}
          >
            <IonAvatar className="avatario" slot="start">
              <img src={myPastJob.SchedulerProfilePicURL} />
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
    );
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) =>
      setAvailableJobs(data.availableShifts2)
    );
    fetchScheduledJobs().then((data) =>
      setMyScheduledJobs(data.scheduledShifts2)
    );
    fetchPastJobs().then((data) => setMyPastJobs(data.pastShifts2));
  }, [profile]);

  const [mainSegment, setMainSegment] = useState<string>("");

  const MainSegmentActions: React.FC = () => {
    if (mainSegment == "past") {
      return <PastJobsSegment />;
    }
    if (mainSegment == "scheduled") {
      return <ScheduledJobsSegment />;
    } 
    if (mainSegment == "available") {
      return <AvailableJobsSegment />;
    }
    return <h2></h2>;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">WerkApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title1" size="large">
              WerkApp
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar className="bckgrnd">
          <IonGrid>
            <IonRow className="tpmrgn">
              <IonCol size="2">
                {/* <IonIcon size="large" icon={reorderThreeOutline}></IonIcon> */}
                <IonToggle color="danger"></IonToggle>
                <IonLabel className="smallfont">Scheduler</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSearchbar
                  className="srchbr"
                  // value={searchText}
                  // onIonChange={(e) => setSearchText(e.detail.value!)}
                  animated
                ></IonSearchbar>
              </IonCol>
              <IonCol size="1">
                <IonAvatar slot="" className="tinyavatar">
                  <img src={profile.ProfilePicURL} />
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonSegment
                  className="bckgrnd"
                  // value=""
                  onIonChange={(e: any) => {
                    setMainSegment(e.detail.value!);
                    console.log(mainSegment);
                  }}
                >
                  <IonSegmentButton value="available">
                    <IonLabel>
                      <h2>Available</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="scheduled">
                    <IonLabel>
                      <h2>Scheduled</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="past">
                    <IonLabel>
                      <h2>Past</h2>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>

        <MainSegmentActions />
      </IonContent>
    </IonPage>
  );
};

export default Main;
