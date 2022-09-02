import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
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
  IonInput,
} from "@ionic/react";
import axios from "axios";
import "./CreateAccount.css";
import { arrowBackCircle } from "ionicons/icons";

const CreateAccount: React.FC = () => {

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

  const handleSubmit = () => {
     
    const newProfile = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      Company: company,
      Occupation: occupation,
    };

    axios
      .post("http://werkappserver-env.eba-qyjsvfm3.us-east-1.elasticbeanstalk.com/user/CreateAccount", { newProfile })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Create Account
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
          <IonCol>
              <Link to="/Login">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
          <form >
            <br></br>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Name:</h1>
                  </IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        type="text"
                        name="FirstName"
                        placeholder="First"
                        onIonChange={(e: any) => setFirstName(e.target.value)}
                        clearInput
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        type="text"
                        name="LastName"
                        placeholder="Last"
                        onIonChange={(e: any) => setLastName(e.target.value)}
                        clearInput
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Email:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="Email"
                    placeholder="Email"
                    onIonChange={(e: any) => setEmail(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Password:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="Password"
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company/Agency:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="company"
                    placeholder="Company/Agency Name"
                    onIonChange={(e: any) => setCompany(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Occupation:</h1>
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    onIonChange={(e: any) => setOccupation(e.target.value)}
                    clearInput
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <br></br>
            <IonRow>
              <IonCol></IonCol>
              <IonCol >
                <IonButton
                  href="/Login"
                  color="warning"
                  size="large"
                  fill="solid"
                  onClick={handleSubmit}
                >Create Account
                </IonButton>
              </IonCol>
              {/* <IonCol>
              <IonButton
                  href="/Login"
                  color="danger"
                  size="large"
                  fill="solid"
                >Cancel
                </IonButton>
              </IonCol> */}
              <IonCol></IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;