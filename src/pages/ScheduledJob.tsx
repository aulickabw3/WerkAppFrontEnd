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
  IonDatetime,
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
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
      .get("http://localhost:3000/shifts/MyScheduledShifts/" + myJob.JjobId, {})
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
      .put("http://localhost:3000/shifts/WerkedShift/" + myJob.JjobId, {
        werkJob,
      })
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
      .put("http://localhost:3000/shifts/CancelShift/" + myJob.JjobId, {
        werkJob,
      })
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
                <Link to="/AvailableJobs">
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
                  {myJob.SJobId}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={myJob.Date}
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
                    value={myJob.StartTime}
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
                    value={myJob.FinnishTime}
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
                  <h3>{myJob.Company}</h3>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  <h3>{myJob.Location}</h3>
                </IonItem>
              </IonCol>
            </IonRow>
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
                  <h3>{myJob.Notes}</h3>
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow>
              <IonCol></IonCol>
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
              <IonCol></IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyJobSummary;
