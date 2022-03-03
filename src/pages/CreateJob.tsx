import React from "react";
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
  IonModal,
  IonItem,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle } from "ionicons/icons";

const CreateJob: React.FC = () => {
  const [jobId, setJobId] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pay, setPay] = React.useState("");
  const [pocName, setPocName] = React.useState("");
  const [pocPhone, setPocPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = () => {
    const newJob = {
      JobID: jobId,
      Date: date,
      Time: time,
      Company: company,
      Location: location,
      Pay: pay,
      POCName: pocName,
      POCPhone: pocPhone,
      Notes: notes,
    };

    axios
      .post("http://localhost:3000/jobs/CreateJob", { newJob })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Create Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Create Job
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/SchedulerView">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
            </IonRow>
          </IonRow>
          <form >
          <br></br>
          <IonRow>
            <IonCol size="12">
            <IonItem>
                <IonLabel position="stacked">
                  <h1>Job ID/#:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Date"
                  onIonChange={(e: any) => setJobId(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* <IonRow className="jobGrid">
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Date:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Date"
                  onIonChange={(e: any) => setDate(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Time:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Time"
                  onIonChange={(e: any) => setTime(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow> */}
          <IonRow className="jobGrid">
            <IonCol size="12">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Company:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Company"
                  onIonChange={(e: any) => setCompany(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol>
            {/* <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Location:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Location"
                  onIonChange={(e: any) => setLocation(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol> */}
          </IonRow>
          <br></br>
          {/* <IonRow className="jobGrid">
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Pay:</h1>
                </IonLabel>
                <IonInput
                  type="text"
                  name="Pay"
                  onIonChange={(e: any) => setPay(e.target.value)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              
            </IonCol>
          </IonRow> */}
          <br></br>
          <IonRow className="jobGrid">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Point Of Contact:</h1>
                </IonLabel>
                <IonRow>
                  <IonCol size="6">
                    <IonInput
                      type="text"
                      name="POCName"
                      placeholder="Name"
                      onIonChange={(e: any) => setPocName(e.target.value)}
                      clearInput
                    ></IonInput>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput
                      type="text"
                      name="POCPhone"
                      placeholder="Phone"
                      onIonChange={(e: any) => setPocPhone(e.target.value)}
                      clearInput
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="jobGrid">
            <IonCol size="12">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Notes:</h1>
                </IonLabel>
                <IonTextarea
                  name="Time"
                  onIonChange={(e: any) => setNotes(e.target.value)}
                  clearOnEdit={true}
                ></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handleSubmit}
                href="/ScheduleJob"
                color="danger"
                size="large"
                fill="solid"
              >
                Create Job
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

export default CreateJob;