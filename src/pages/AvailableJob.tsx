import React, { useState, useEffect } from "react";
import {
  Link,
  matchPath,
  match,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
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
  useIonViewDidEnter,
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface AvailableJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AvailableJob: React.FC<AvailableJobProps> = ({ match }) => {
  console.log(match.params.id);

  interface AvailableJobData {
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

  const [availableJob, setAvailableJob] = useState<AvailableJobData>({
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

  const fetchAvailableJob = () => {
    return axios
      .get("http://localhost:3000/shifts/ShiftDetails/" + match.params.id, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        return response.data;
      });
  };

  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    fetchAvailableJob()
      .then((data) => setAvailableJob(data.werkShift))
  }, []);

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, [availableJob]);


  const handleSubmit = () => {
    const werkJob = {
      UserId: profile.UserId,
      ShiftId: availableJob.JjobId,
    };

    axios
      .post("http://localhost:3000/shifts/WerkShift/", {
        werkJob,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/MyJobSummary/" + availableJob.JjobId;
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
                  <h1>{availableJob.SJobId}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <h1>{availableJob.Date}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Start:</h1>
                  </IonLabel>
                  <h1>{availableJob.StartTime}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>End:</h1>
                  </IonLabel>
                  <h1>{availableJob.FinnishTime}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company:</h1>
                  </IonLabel>
                  <h1>{availableJob.Company}</h1>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  <h1>{availableJob.Location}</h1>
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
                  <h1>{availableJob.Pay}</h1>
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
                  <h1>{availableJob.Notes}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <IonButton
                  onClick={handleSubmit}
                  color="danger"
                  size="large"
                  fill="solid"
                >
                  Werk Job
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

export default AvailableJob;
