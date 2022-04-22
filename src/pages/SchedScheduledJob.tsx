import React, { useEffect, useState } from "react";
import { Link, match, RouteComponentProps, matchPath, useRouteMatch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonItem,
  IonDatetime,
  useIonViewDidEnter,
  IonTabBar,
  IonList,
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import GetUser from "../components/GetUser";
import axios from "axios";

interface SchedSchedJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SchedScheduledJob: React.FC<SchedSchedJobProps> = ({match}) => {

  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface SchedJobData {
    ShiftId: number;
    ShiftIdentifier: string;
    UserUserId: string;
    DateDay: string;
    StartDateTime: string;
    FinishDateTime: string;
    NumberOfWerkers: number;
    Company: string;
    Location: string;
    Pay: string;
    ShiftNotes: string;
  }

  const [schedJob, setSchedJob] = useState<SchedJobData>({
    ShiftId: 0,
    ShiftIdentifier: "",
    UserUserId: "",
    DateDay: "",
    StartDateTime: "",
    FinishDateTime: "",
    NumberOfWerkers: 0,
    Company: "",
    Location: "",
    Pay: "",
    ShiftNotes: "",
  });

  interface SchedWerkersData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [werkers, setWerkers] = useState<SchedWerkersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
    },
  ]);

  interface OpenShiftData {
    unfilledshifts: number;
  }
  const [openShifts, setOpenShifts] = useState<OpenShiftData>({
    unfilledshifts: 0,
  });

  const fetchSchedJob = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/SchedShiftDetails/" + match.params.id, {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchSchedJob().then((data) => {
      setSchedJob(data.WerkShift);
      setWerkers(data.Werkers);
      setOpenShifts(data.OpenShifts);
    });
  }, [profile]);

  const handleWerked = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/shifts/SchedulerWerkedShift/" + schedJob.ShiftId, { werkJob })
      .then((response) => {
        console.log(response);
        window.location.href = "/SScheduledJob/" + schedJob.ShiftId;
      });
  };

  const handleCancel = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/shifts/SchedulerCancelShift/" + schedJob.ShiftId, { werkJob })
      .then((response) => {
        console.log(response);
        window.location.href = "/SScheduledJob/" + schedJob.ShiftId;
      });
  };

  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Job Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Job Summary
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/SchedScheduledJobs">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
            </IonRow>
          </IonRow>
          <form>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Job ID/#:</h1>
                  </IonLabel>
                  {schedJob.ShiftIdentifier}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={schedJob.DateDay}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Start:</h1>
                  </IonLabel>
                  <IonDatetime
                    // hourValues={12}
                    // hour-cycle="h12"
                    displayFormat="HH:mm"
                    value={schedJob.StartDateTime}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>End:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="HH:mm"
                    value={schedJob.FinishDateTime}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company:</h1>
                  </IonLabel>
                  {schedJob.Company}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  {schedJob.Location}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="5">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="1">
                <h1>$</h1>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <h1 className="money">{schedJob.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  {schedJob.ShiftNotes}
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>

        <IonGrid>
          <IonRow className="jobGrid">
            <IonCol size="12">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Werkers:</h1>
                </IonLabel>
                <IonList className="searchBar">
                  {werkers.map((val, key) => {
                    return (
                      <Link to={`/AssociateProfile/${val.UserId}`}>
                        <IonItem className="searchBar">
                          {/* <IonCol className="listCol">
                            <IonAvatar>
                              <img src={val.ProfilePicURL} />
                            </IonAvatar>
                          </IonCol> */}
                          <IonCol size="" className="listCol">
                            {val.FirstName} {val.LastName}
                          </IonCol>
                        </IonItem>
                      </Link>
                    );
                  })}
                </IonList>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handleCancel}
                color="danger"
                size="large"
                fill="solid"
                href="/SchedulerView"
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
    </IonPage>      

  );
};

export default SchedScheduledJob;