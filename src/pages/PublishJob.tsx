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
  IonFooter,
  IonTabs,
  IonTabBar,
} from "@ionic/react";
import axios from "axios";
import "./CreateAccount.css";
import { arrowBackCircle } from "ionicons/icons";
import GetUser from "../components/GetUser";

const PublishJob: React.FC = () => {

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

  const [werkers, setWerkers] = useState<string[]>([]);

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/user/PublishJob", { werkers })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Choose Werkers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Choose Werkers
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/Crews">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
          <form>
            <IonGrid>
              <IonList className="searchBar">
                {associatesCrew.map((val, key) => {
                  console.log(val.ProfilePicURL);
                  return (
                    <Link to={`/AssociateProfile/${val.UserId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="1">
                          <IonCheckbox
                            className="listCol1"
                            // checked={checked}
                            // onIonChange={(e) => setChecked(e.detail.checked)}
                          />
                        </IonCol>
                        <IonCol size="1" className="listCol">
                          <IonAvatar>
                            <img src={val.ProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="listCol">
                          {val.FirstName} {val.LastName}
                        </IonCol>
                        <IonCol size="2" className="listCol">
                          {val.Company}
                        </IonCol>
                      </IonItem>
                    </Link>
                  );
                })}
              </IonList>
            </IonGrid>
          </form>
        </IonGrid>
      </IonContent>

      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol >
              <IonButton
                href="/SchedulerView"
                color="danger"
                size="large"
                fill="solid"
                onClick={handleSubmit}
              >
                Schedule
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PublishJob;
