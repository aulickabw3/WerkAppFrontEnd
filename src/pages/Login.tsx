import React, { useState, useEffect } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import axios from "axios";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    const logProfile = {
      Email: email,
      Password: password,
    };
    axios
      .post("http://localhost:3000/users/tab10", {
        logProfile,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title1">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title1" size="large">
              Login
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <br></br>
        <br></br>
        <IonGrid className="wholeGrid">
          <form onSubmit={handleSubmit}>
            <IonRow>
              <IonCol>
                <h2></h2>
              </IonCol>
            </IonRow>
            <IonRow>
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
            <IonRow>
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
            <br></br>
            <IonRow>
              <IonCol>
                <IonButton
                  href="/tab5"
                  type="submit"
                  color="medium"
                  size="large"
                  expand="block"
                  fill="solid"
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
            <br></br>
            <br></br>
            <IonRow>
              <IonCol>
                <IonButton
                  href="/tab12"
                  color="warning"
                  size="large"
                  expand="block"
                  fill="solid"
                >
                  Create Account
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
