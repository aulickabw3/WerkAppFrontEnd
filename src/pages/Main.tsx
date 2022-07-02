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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  arrowBack,
  createOutline,
  reorderFour,
  reorderFourOutline,
  reorderThreeOutline,
  pin,
  wifi,
  wine,
  warning,
  walk,
  arrowUp,
} from "ionicons/icons";
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
    dentifier: string;
    SchedulerId: any;
    Company: any;
    Location: string;
    Date: any;
    Pay: string;
    FirstName: string;
    SchedulerProfilePicURL: any;
  }

  const [availableJobs, setAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      JJobId: 0,
      JJobId2: 0,
      dentifier: "",
      SchedulerId: 0,
      Company: "No     Jobs",
      Location: "",
      Date: "Yet",
      Pay: "",
      FirstName: "",
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
      <React.Fragment>
        {availableJobs.map((availableJob) => (
          <IonCard key={availableJob.JJobId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={availableJob.SchedulerProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>{availableJob.FirstName}</h2>
              </IonLabel>
              <IonButton
                href={`/ShiftDetails/${availableJob.JJobId}`}
                color="medium"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
              
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className=""
                    displayFormat="DD-MMM-YY"
                    value={availableJob.Date}
                  ></IonDatetime>
                </IonRow>
                <IonRow>
                  <IonCol>Job#:</IonCol>
                  <IonCol>{availableJob.dentifier}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Company:</IonCol>
                  <IonCol>{availableJob.Company}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Location::</IonCol>
                  <IonCol>{availableJob.Location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Pay:</IonCol>
                  <IonCol>{availableJob.Pay}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  // Scheduled Jobs Segment
  //////////////////////////////////////////////
  interface MyScheduledJobsData {
    ShiftShiftId: number;
    ShiftIdentifier: string;
    Company: string;
    Location: string;
    Date: string;
    Pay: string;
    FirstName: string;
    SchedulerProfilePicURL: string;
  }

  const [myScheduledJobs, setMyScheduledJobs] = React.useState<
    MyScheduledJobsData[]
  >([
    {
      ShiftShiftId: 0,
      ShiftIdentifier: "",
      Company: "Go Get",
      Location: "",
      Date: "Some Work!!",
      Pay: "",
      FirstName: "",
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
      <React.Fragment>
        {myScheduledJobs.map((myScheduledJob) => (
          <IonCard key={myScheduledJob.ShiftShiftId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={myScheduledJob.SchedulerProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>{myScheduledJob.FirstName}</h2>
              </IonLabel>
              <IonButton
                href={`/ShiftDetails/${myScheduledJob.ShiftShiftId}`}
                color="medium"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
              <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className=""
                    displayFormat="DD-MMM-YY"
                    value={myScheduledJob.Date}
                  ></IonDatetime>
                </IonRow>
                <IonRow>
                  <IonCol>Job#:</IonCol>
                  <IonCol>{myScheduledJob.ShiftIdentifier}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Company:</IonCol>
                  <IonCol>{myScheduledJob.Company}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Location::</IonCol>
                  <IonCol>{myScheduledJob.Location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Pay:</IonCol>
                  <IonCol>{myScheduledJob.Pay}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  // Past Jobs Segment
  /////////////////////////////////////////
  interface MyPastJobsData {
    ShiftShiftId: number;
    ShiftIdentifier: string;
    Company: string;
    Location: string;
    Date: string;
    Pay: string;
    FirstName: string;
    SchedulerProfilePicURL: string;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<MyPastJobsData[]>([
    {
      ShiftShiftId: 0,
      ShiftIdentifier: "",
      Company: "Go Get",
      Location: "",
      Date: "Some Work!!",
      Pay: "",
      FirstName: "",
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
      <React.Fragment>
        {myPastJobs.map((myPastJob) => (
          <IonCard key={myPastJob.ShiftShiftId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={myPastJob.SchedulerProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>{myPastJob.FirstName}</h2>
              </IonLabel>
              <IonButton
                href={`/ShiftDetails/${myPastJob.ShiftShiftId}`}
                color="medium"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
              <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className=""
                    displayFormat="DD-MMM-YY"
                    value={myPastJob.Date}
                  ></IonDatetime>
                </IonRow>
                <IonRow>
                  <IonCol>Job#:</IonCol>
                  <IonCol>{myPastJob.ShiftIdentifier}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Company:</IonCol>
                  <IonCol>{myPastJob.Company}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Location::</IonCol>
                  <IonCol>{myPastJob.Location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Pay:</IonCol>
                  <IonCol>{myPastJob.Pay}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  console.log(myPastJobs);

  const SelectAJobList: React.FC = () => {
    return (
      <React.Fragment>
      <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonIcon slot="" size="large" icon={arrowUp} />
          </IonCol>
          <IonCol></IonCol>
          <IonCol>
            <IonIcon size="large" icon={arrowUp} />
          </IonCol>
          <IonCol></IonCol>
          <IonCol>
            <IonIcon size="large" icon={arrowUp} />
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="7">
            <h1>Select A Job List</h1>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
    </React.Fragment>
    );
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) => {
      setAvailableJobs(data.availableShifts2);
    });
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
    return <SelectAJobList />
  };

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleToggle = () => {
    if (!checked) window.location.href = "/SchedulerView";
    return;
  };

  const handleSearch = () => {
    window.location.href = "/Search";
  };

  const [searchText, setSearchText] = useState("");

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
                <IonToggle
                  checked={checked}
                  onIonChange={(e) => {
                    setChecked(e.detail.checked);
                    handleToggle();
                  }}
                  color="danger"
                ></IonToggle>
                <IonLabel className="smallfont">Scheduler</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSearchbar
                  className="srchbr"
                  value={searchText}
                  onIonChange={handleSearch}
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
