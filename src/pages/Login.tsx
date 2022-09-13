import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie] = useCookies(["jwt"]);

  const handleClick = () => {
    const logProfile = {
      Email: email,
      Password: password,
    };
    axios
      .post("https://werkapp-server.com/user/Login", {
        logProfile,
        withCredentials: true,
      })
      .then((response) => {
        if (response.data !== "Person not found" || "Wrong Password" || "" ) {
          setCookie("jwt", response.data, { path: "/" });
          window.location.href = "/Main";
        }
        if (response.data == "Wrong Password") {
          console.log(response.data);
          alert(response.data);
          window.location.href = "/Login";
        }
        if (response.data == "Person not found") {
          console.log(response.data);
          alert(response.data);
          window.location.href = "/Login";
        } if (!response) {
          alert("Invalid Email or Password");
          window.location.href = "/Login";
        }
        return
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
          <form>
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
                    type="password"
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
                  onClick={handleClick}
                  color="warning"
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
                  href="/CreateAccount"
                  color="medium"
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
