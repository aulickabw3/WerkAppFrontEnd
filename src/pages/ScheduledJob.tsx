import React, { useEffect, useState } from "react";
import {
  Link,
  matchPath,
  match,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
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
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import GetUser from "../components/GetUser";
import axios from "axios";

interface ScheduledJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ScheduledJob: React.FC<ScheduledJobProps> = ({match}) => {
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface MyJobData {
    ShiftId: number;
    ShiftIdentifier: string;
    SchedulerId: string;
    DateDay: string;
    StartDateTime: string;
    FinishDateTime: string;
    Company: string;
    Location: string;
    Pay: string;
    ShiftNotes: string;
  }

  const [myJob, setMyJob] = useState<MyJobData>({
    ShiftId: 0,
    ShiftIdentifier: "",
    SchedulerId: "",
    DateDay: "",
    StartDateTime: "",
    FinishDateTime: "",
    Company: "",
    Location: "",
    Pay: "",
    ShiftNotes: "",
  });

  const fetchMyJob = () => {
    return axios
      .get("http://localhost:3000/shifts/ShiftDetails/" + match.params.id, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchMyJob().then((data) => setMyJob(data.werkShift));
  }, [profile]);


  const handleWerked = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: myJob.ShiftId,
      UpdateStatus: 'Werked'
    };
    axios
      .put("http://localhost:3000/shifts/ShiftStatusUpdate/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/PastJob/" + myJob.ShiftId;
      });
  };

  const handleCancel = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: myJob.ShiftId,
      UpdateStatus: 'Cancelled'
    };
    axios
      .put("http://localhost:3000/shifts/ShiftStatusUpdate/", {
        updateWerkerShiftStatus,

      })
      .then((response) => {
        console.log(response);
        window.location.href = "/PastJob/" + myJob.ShiftId;
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Job Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Job Summary
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/ScheduledJobs">
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
                  {myJob.ShiftIdentifier}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={myJob.DateDay}
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
                    value={myJob.StartDateTime}
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
                    value={myJob.FinishDateTime}
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
                  {myJob.Company}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  {myJob.Location}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="1">
                <h1>$</h1>
              </IonCol>
              <IonCol size="5">
                <IonItem>
                  <h1 className="money">{myJob.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  {myJob.ShiftNotes}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
          </form>
        </IonGrid>
      </IonContent>
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol>
                <IonButton
                  onClick={handleWerked}
                  color="success"
                  size="large"
                  fill="solid"
                >
                  Werked
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  onClick={handleCancel}
                  color="danger"
                  size="large"
                  fill="solid"
                >
                  Cancel
                </IonButton>
              </IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default ScheduledJob;
