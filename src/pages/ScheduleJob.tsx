import React, { useState, useEffect } from "react";
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
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
// import { format, parseISO } from 'date-fns';
import axios from "axios";
import { person, arrowBackCircle } from "ionicons/icons";
import "./ScheduleJob.css";
import GetUser from "../components/GetUser";

const ScheduleJob: React.FC = () => {
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = React.useState<ProfileData>({
    UserId: 0,
  });

  React.useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  const [jobId, setJobId] = React.useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [beginSelectedDate, setBeginSelectedDate] = useState("");
  const [endSelectedDate, setEndSelectedDate] = useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pay, setPay] = React.useState("");
  const [numberOfWorkers, setnumberOfWorkers] = React.useState(0);
  const [notes, setNotes] = React.useState("");

  const handleSubmit = () => {
    const newShift = {
      UserUserId: profile.UserId,
      ShiftIdentifier: jobId,
      DateDay: selectedDate,
      StartDateTime: beginSelectedDate,
      FinishDateTime: endSelectedDate,
      Company: company,
      Location: location,
      Pay: pay,
      NumberOfWerkers: numberOfWorkers,
      ShiftNotes: notes,
    };

    axios
      .post("http://localhost:3000/shifts/CreateShift", { newShift })
      .then((response) => { 
        console.log(response);
        return response.data
      }).then((data) => {
        console.log(data.ShiftId);
        window.location.href = "/PublishJob/" + data.ShiftId;
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Schedule Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Schedule Job
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
          <form>
            <br></br>
            <IonRow>
              <IonCol size="6">
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
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    min="2022-01-01"
                    max="2030-01-01"
                    value={selectedDate}
                    onIonChange={(e) => setSelectedDate(e.detail.value!)}
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
                    displayFormat="HH:mm"
                    value={beginSelectedDate}
                    onIonChange={(e) => setBeginSelectedDate(e.detail.value!)}
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
                    value={endSelectedDate}
                    onIonChange={(e) => setEndSelectedDate(e.detail.value!)}
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
                  <IonInput
                    type="text"
                    name="Company"
                    onIonChange={(e: any) => setCompany(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="6">
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
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
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
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>How Many:</h1>
                  </IonLabel>
                  <IonInput
                    type="number"
                    name="NumberOfWerkers"
                    onIonChange={(e: any) => setnumberOfWorkers(e.target.value)}
                    clearInput
                  ></IonInput>
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
                  // href="/PublishJob"
                  onClick={handleSubmit}
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

export default ScheduleJob;

