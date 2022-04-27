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

interface PastJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const PastJob: React.FC<PastJobProps> = ({match}) => {

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

  const [myPastJob, setMyPastJob] = useState<MyJobData>({
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

  const fetchMyPastJob = () => {
    return axios
      .get("http://localhost:3000/shifts/ShiftDetails/" + match.params.id, {})
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchMyPastJob().then((data) => setMyPastJob(data.werkShift));
  }, [profile]);

  const handlePaid = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: myPastJob.ShiftId,
      IsPaid: true
    };

    axios
      .put("http://localhost:3000/shifts/WerkerIsPaid/", { updateWerkerShiftStatus })
      .then((response) => {
        console.log(response);
        // window.location.href = "/PastJob/" + myPastJob.ShiftId;
      });
  };

  console.log(match.params.id);

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
                <Link to="/PastJobs">
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
                  {myPastJob.ShiftIdentifier}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={myPastJob.DateDay}
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
                    value={myPastJob.StartDateTime}
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
                    value={myPastJob.FinishDateTime}
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
                  {myPastJob.Company}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  {myPastJob.Location}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="3">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="3">
                <h2></h2>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <h1 className="money">{myPastJob.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  {myPastJob.ShiftNotes}
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
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handlePaid}
                color="success"
                size="large"
                fill="solid"
                href="/SchedulerView"
              >
                Mark Paid
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
    </IonPage> 

  );
};

export default PastJob;