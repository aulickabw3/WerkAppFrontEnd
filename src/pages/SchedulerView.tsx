import React, { useEffect, useState } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import {
  IonIcon,
  IonSearchbar,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonToggle,
  IonLabel,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  useIonViewDidEnter,
  IonCard,
  IonItem,
  IonCardContent,
  IonDatetime,
} from "@ionic/react";
import "./Main.css";
import axios from "axios";
import GetUser from "../components/GetUser";
import "./Main.css";
import { arrowBackCircle } from "ionicons/icons";

export const SchedulerView: React.FC = () => {
  // Get self Data
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
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
    Location: string;
  }

  const [schedAvailableJobs, setSchedAvailableJobs] = React.useState<AvailableJobData[]>([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No     Jobs",
      DateDay: "Yet",
      Location: "",
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

  const AvailableJobsSegment: React.FC = () => {
    return (
      <React.Fragment>
        {schedAvailableJobs.map((availableJob) => (
          <IonCard key={availableJob.ShiftId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={"../assets/profilePic.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Dave Wigley</h2>
              </IonLabel>
              <IonButton
                href={`/SchedAvailableJob/${availableJob.ShiftId}`}
                fill="outline"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
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
                  <IonCol>$75/hr + 2</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className="daterino"
                    displayFormat="DD-MMM-YY"
                    value={availableJob.DateDay}
                  ></IonDatetime>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  // SchedScheduled Jobs Segment
  //////////////////////////////////////////////
  interface SchedScheduledJobsData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
    Location: string;
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
      Location: "",
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

  const ScheduledJobsSegment: React.FC = () => {
    return (
      <React.Fragment>
        {schedScheduledJobs.map((schedScheduledJob) => (
          <IonCard key={schedScheduledJob.ShiftId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={"../assets/profilePic.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Dave Wigley</h2>
              </IonLabel>
              <IonButton
                href={`/SchedScheduledJob/${schedScheduledJob.ShiftId}`}
                fill="outline"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>Company:</IonCol>
                  <IonCol>{schedScheduledJob.Company}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Location::</IonCol>
                  <IonCol>{schedScheduledJob.Location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Pay:</IonCol>
                  <IonCol>$75/hr + 2</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className="daterino"
                    displayFormat="DD-MMM-YY"
                    value={schedScheduledJob.DateDay}
                  ></IonDatetime>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  //Sched Past Jobs Segment
  /////////////////////////////////////
  interface SchedPastJobsData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
    Location: string;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<SchedPastJobsData[]>([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No Past",
      DateDay: "Jobs Yet",
      Location: "",
    },
  ]);

  const fetchPastJobs = () => {
    return axios
      .get("http://localhost:3000/shifts/SchedPastShifts/" + profile.UserId, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  const PastJobsSegment: React.FC = () => {
    return (
      <React.Fragment>
        {myPastJobs.map((myPastJob) => (
          <IonCard key={myPastJob.ShiftId}>
            <IonItem>
              <IonAvatar className="avtr" slot="start">
                <img src={"../assets/profilePic.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Dave Wigley</h2>
              </IonLabel>
              <IonButton
                href={`/SchedPastJob/${myPastJob.ShiftId}`}
                fill="outline"
                slot="end"
                color="medium"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
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
                  <IonCol>$75/hr + 2</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
                    className="daterino"
                    displayFormat="DD-MMM-YY"
                    value={myPastJob.DateDay}
                  ></IonDatetime>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </React.Fragment>
    );
  };

  useEffect(() => {
    fetchAvailableJobs().then((data) => {
      setSchedAvailableJobs(data.SchedAvailableJob);
    });
    fetchScheduledJobs().then((data) =>
      setSchedScheduledJobs(data.SchedScheduledJob)
    );
    fetchPastJobs().then((data) => 
    setMyPastJobs(data.SchedPastJob)
    );
  }, [profile]);

  //Segment Actions Logic
  /////////////////////////////////////
  const [mainSegment, setMainSegment] = useState<string>("");

  const MainSegmentActions: React.FC = () => {
    if (mainSegment == "past") {
      return <PastJobsSegment />;
    }
    if (mainSegment == "scheduled") {
      return <ScheduledJobsSegment />;
    }
    if (mainSegment == "open") {
      return <AvailableJobsSegment />;
    }
    return <h2></h2>;
  };

  //Toggle
  //////////////////////////
  const [checked, setChecked] = React.useState<boolean>(true);
  const handleToggle = () => {
    if (checked)
    window.location.href = "/Main";
    return
  }

  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title1">WerkApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
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
                <IonToggle
                  checked
                  // checked={checked}
                  onIonChange={e => {
                    setChecked(e.detail.checked);
                    handleToggle();
                  }
                }
                  color="danger"
                ></IonToggle>
                <IonLabel className="smallfont">Scheduler</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSearchbar
                  className="srchbr"
                  value={searchText}
                  onIonChange={(e) => setSearchText(e.detail.value!)}
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
                  className="schdbckgrnd"
                  // value=""
                  onIonChange={(e: any) => {
                    setMainSegment(e.detail.value!);
                    console.log(mainSegment);
                  }}
                >
                  <IonSegmentButton value="open">
                    <IonLabel>
                      <h2>Open</h2>
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

        {/* Segment Lists */}
        <MainSegmentActions />

      </IonContent>
    </IonPage>
  );
};

export default SchedulerView;
