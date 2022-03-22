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
import ExploreContainer from "../components/ExploreContainer";
import "./MyJobSummary.css";
import GetUser from "../components/GetUser";
import axios from "axios";

const MyJobSummary: React.FC = () => {

  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface MyJobData {
    JjobId: number;
    SJobId: string;
    SchedulerId: string;
    Date: string;
    StartTime: string;
    FinnishTime: string;
    Company: string;
    Location: string;
    Pay: string;
    Notes: string;
  }

  const [myJob, setMyJob] = useState<MyJobData>({
    JjobId: 0,
    SJobId: "",
    SchedulerId: "",
    Date: "",
    StartTime: "",
    FinnishTime: "",
    Company: "",
    Location: "",
    Pay: "",
    Notes: "",
  });

  const fetchMyJob = () => {
    return axios
      .get(
        "http://localhost:3000/job/AvailableJobs/" +
          myJob.JjobId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {      
    fetchMyJob().then((data) => setMyJob(data.JobInfo));
  }, []);

  const handleWerked = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/job/WerkedJob/" + myJob.JjobId, { werkJob })
      .then((response) => {
        console.log(response);
        window.location.href = "/MyJobSummary/" + myJob.JjobId;
      });
  };

  const handleCancel = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/job/CancelJob/" + myJob.JjobId, { werkJob })
      .then((response) => {
        console.log(response);
        window.location.href = "/MyJobSummary/" + myJob.JjobId;
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
                <Link to="/MyScheduledJobs">
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
                  <h1>{myJob.SJobId}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <h1>{myJob.Date}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Start:</h1>
                  </IonLabel>
                  <h1>{myJob.StartTime}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>End:</h1>
                  </IonLabel>
                  <h1>{myJob.FinnishTime}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company:</h1>
                  </IonLabel>
                  <h1>{myJob.Company}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  <h1>{myJob.Location}</h1>
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
                  <h1>{myJob.Pay}</h1>
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
                  <h1>{myJob.Notes}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={handleWerked} color="success" size="large" fill="solid">
                Werked
              </IonButton>
            </IonCol>
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

export default MyJobSummary;