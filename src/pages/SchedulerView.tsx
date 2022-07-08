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
  IonTabBar,
  IonTabButton,
  IonList,
} from "@ionic/react";
import "./Main.css";
import axios from "axios";
import GetUser from "../components/GetUser";
import "./Main.css";
import {
  add,
  addCircle,
  addCircleOutline,
  addCircleSharp,
  arrowBackCircle,
  arrowUp,
} from "ionicons/icons";

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

  // Search Users/////////////////////
  ///////////////////////////////////////////////////////
  interface UsersData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    IsScheduler: boolean;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [users, setUsers] = React.useState<UsersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      IsScheduler: false,
      Company: "",
      Occupation: "",
      ProfilePicURL: "",
    },
  ]);

  const fetchUsers = () => {
    return axios
      .get("http://localhost:3000/user/Search/" + profile.UserId, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchUsers().then((data) => setUsers(data.personArray));
  }, [profile]);

  // Available Jobs Segment
  //////////////////////////////////////
  interface AvailableJobData {
    ShiftId: any;
    ShiftIdentifier: any;
    UserUserId: any;
    Company: any;
    DateDay: any;
    Location: string;
    Pay: string;
  }

  const [schedAvailableJobs, setSchedAvailableJobs] = React.useState<
    AvailableJobData[]
  >([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No     Jobs",
      DateDay: "Yet",
      Location: "",
      Pay: "",
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
                <img src={profile.ProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>
                  {profile.FirstName} {profile.LastName}
                </h2>
              </IonLabel>
              <IonButton
                href={`/SchedShiftDetails/${availableJob.ShiftId}`}
                fill="outline"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>Job#:</IonCol>
                  <IonCol>{availableJob.ShiftIdentifier}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Company:</IonCol>
                  <IonCol>{availableJob.Company}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Location:</IonCol>
                  <IonCol>{availableJob.Location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Pay:</IonCol>
                  <IonCol>{availableJob.Pay}</IonCol>
                </IonRow>
                <br></br>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
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
    Pay: string;
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
      Pay: "",
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
                <img src={profile.ProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>
                  {profile.FirstName} {profile.LastName}
                </h2>
              </IonLabel>
              <IonButton
                href={`/SchedShiftDetails/${schedScheduledJob.ShiftId}`}
                fill="outline"
                slot="end"
              >
                View
              </IonButton>
            </IonItem>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>Job#:</IonCol>
                  <IonCol>{schedScheduledJob.ShiftIdentifier}</IonCol>
                </IonRow>
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
                  <IonCol>{schedScheduledJob.Pay}</IonCol>
                </IonRow>
                <br></br>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
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
    Pay: string;
  }

  const [myPastJobs, setMyPastJobs] = React.useState<SchedPastJobsData[]>([
    {
      ShiftId: 0,
      ShiftIdentifier: 0,
      UserUserId: 0,
      Company: "No Past",
      DateDay: "Jobs Yet",
      Location: "",
      Pay: "",
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
                <img src={profile.ProfilePicURL} />
              </IonAvatar>
              <IonLabel>
                <h2>
                  {profile.FirstName} {profile.LastName}
                </h2>
              </IonLabel>
              <IonButton
                href={`/SchedShiftDetails/${myPastJob.ShiftId}`}
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
                <br></br>
                <IonRow>
                  <IonCol>Date:</IonCol>
                  <IonDatetime
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
    fetchPastJobs().then((data) => setMyPastJobs(data.SchedPastJob));
  }, [profile]);

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
    return <SelectAJobList />;
  };

  //Toggle
  //////////////////////////
  const [checked, setChecked] = React.useState<boolean>(true);
  const handleToggle = () => {
    if (checked) window.location.href = "/Main";
    return;
  };

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
                  value={searchText}
                  onIonChange={(e) => setSearchText(e.detail.value!)}
                  animated
                  className="srchbr"
                ></IonSearchbar>
              </IonCol>
              <IonCol size="1">
                <IonAvatar slot="" className="tinyavatar">
                  <img src={profile.ProfilePicURL} />
                </IonAvatar>
              </IonCol>
            </IonRow>

            <IonList className="searchBar">
                {users
                  .filter((value) => {
                    if (searchText == "") {
                      return "";
                    } else if (
                      value.FirstName.toLowerCase().includes(
                        searchText.toLowerCase()
                      )
                    ) {
                      return value;
                    } else if (
                      value.LastName.toLowerCase().includes(
                        searchText.toLowerCase()
                      )
                    ) {
                      return value;
                    }
                  })
                  .map((user) => (
                    <IonItem
                      href={`/AssociateProfile/${user.UserId}`}
                      key={user.UserId}
                    >
                      <IonAvatar className="avatario" slot="start">
                        <img src={user.ProfilePicURL} />
                      </IonAvatar>
                      <IonLabel className="labelo">
                        <h1>
                          {user.FirstName} {user.LastName}
                        </h1>
                        <p>{user.Company}</p>
                      </IonLabel>
                      <br></br>
                    </IonItem>
                  ))}
              </IonList>

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
        {/* /////////////// */}
      </IonContent>

      <IonRow>
        <IonCol size="1"></IonCol>
        <IonCol size="10">
          <IonButton
            expand="block"
            color="secondwarning"
            fill="solid"
            href="/ScheduleJob"
          >
            + Schedule New Job
          </IonButton>
        </IonCol>
        <IonCol size="1"></IonCol>
      </IonRow>
    </IonPage>
  );
};

export default SchedulerView;
