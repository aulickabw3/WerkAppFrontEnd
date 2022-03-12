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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  useIonViewDidEnter,
  IonList,
  IonCheckbox,
} from "@ionic/react";
import axios from "axios";
import "./CreateAccount.css";
import { arrowBackCircle } from "ionicons/icons";
import GetUser from "../components/GetUser";

const AddNewCrew: React.FC = () => {
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [myProfile, setMyProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setMyProfile(data.personDataFound));
  }, []);
  console.log(myProfile);

  // Get Array Of All My Associates
  interface AssociatesData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [associatesCrew, setAssociatesCrew] = React.useState<AssociatesData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Company: "",
      Occupation: "",
      ProfilePicURL: "",
    },
  ]);

  const fetchAssociates = () => {
    return axios
      .get(
        "http://localhost:3000/businessassociate/ListOfAssociates/" +
          myProfile.UserId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchAssociates().then((data) => setAssociatesCrew(data.listOfAssociates2));
  }, [myProfile]);

  console.log(associatesCrew);
  console.log(typeof associatesCrew);

  const [crewName, setCrewName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [werkers, setWerkers] = useState<string[]>([]);

  const handleSubmit = () => {
    const newCrew = {
      CrewName: crewName,
      Description: description,
      Werkers: werkers,
    };

    axios
      .post("http://localhost:3000/user/CreateCrew", { newCrew })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      
    </IonPage>
  );
};

export default AddNewCrew;
