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

  // const [jobId, setJobId] = React.useState("");
  // const [date, setDate] = React.useState("");
  // const [time, setTime] = React.useState("");
  // const [company, setCompany] = React.useState("");
  // const [location, setLocation] = React.useState("");
  // const [pay, setPay] = React.useState("");
  // const [pocName, setPocName] = React.useState("");
  // const [pocPhone, setPocPhone] = React.useState("");
  // const [notes, setNotes] = React.useState("");

  // const handleSubmit = () => {
  //   const newJob = {
  //     JobID: jobId,
  //     Date: date,
  //     Time: time,
  //     Company: company,
  //     Location: location,
  //     Pay: pay,
  //     POCName: pocName,
  //     POCPhone: pocPhone,
  //     Notes: notes,
  //   };

  //   axios
  //     .post("http://localhost:3000/jobs/CreateJob", { newJob })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  return (
    <IonPage>
     
    </IonPage>
  );
};

export default CreateJob;