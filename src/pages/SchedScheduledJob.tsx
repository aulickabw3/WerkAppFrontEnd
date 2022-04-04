import React, { useEffect, useState } from "react";
import { Redirect, Route, Link } from "react-router-dom";
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
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import GetUser from "../components/GetUser";
import axios from "axios";

const SchedScheduledJob: React.FC = () => {

  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface SchedJobData {
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

  const [schedJob, setSchedJob] = useState<SchedJobData>({
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
      .get(
        "http://localhost:3000/shifts/SchedScheduledShifts/" +
        schedJob.ShiftId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchMyJob().then((data) => setSchedJob(data.JobInfo));
  }, []);

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
            <IonRow>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Job ID/#:</h1>
                  </IonLabel>
                  <h1>{schedJob.ShiftIdentifier}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <h1>{schedJob.DateDay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Start:</h1>
                  </IonLabel>
                  <h1>{schedJob.StartDateTime}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>End:</h1>
                  </IonLabel>
                  <h1>{schedJob.FinishDateTime}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company:</h1>
                  </IonLabel>
                  <h1>{schedJob.Company}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  <h1>{schedJob.Location}</h1>
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
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>$</h1>
                  </IonLabel>
                  <h1>{schedJob.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  <h1>{schedJob.ShiftNotes}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol></IonCol>
            
            <IonCol>
              <IonButton onClick={handleCancel} color="danger" size="large" fill="solid">
                Cancel 
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          </form>
          
        </IonGrid>
      </IonContent>
    </IonPage>      

  );
};

export default SchedScheduledJob;