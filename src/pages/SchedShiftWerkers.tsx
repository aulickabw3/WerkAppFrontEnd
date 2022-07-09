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
  IonDatetime,
  IonTabBar,
  IonCard,
  IonAvatar,
  IonCardContent,
  IonList,
  IonCheckbox,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  closeOutline,
  closeCircleOutline,
  closeCircle,
  chatbubbleOutline,
  people,
  document,
  documentOutline,
  documentTextOutline,
  peopleOutline,
  chatboxOutline,
} from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface ShiftDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SchedShiftWerkers: React.FC<ShiftDetailsProps> = ({ match }) => {
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface SchedJobData {
    ShiftId: number;
    ShiftIdentifier: string;
    UserUserId: string;
    DateDay: string;
    StartDateTime: string;
    FinishDateTime: string;
    NumberOfWerkers: number;
    Company: string;
    Location: string;
    Pay: string;
    ShiftNotes: string;
  }

  const [schedJob, setSchedJob] = useState<SchedJobData>({
    ShiftId: 0,
    ShiftIdentifier: "",
    UserUserId: "",
    DateDay: "",
    StartDateTime: "",
    FinishDateTime: "",
    NumberOfWerkers: 0,
    Company: "",
    Location: "",
    Pay: "",
    ShiftNotes: "",
  });

  interface SchedWerkersData {
    UserId: number;
    FirstName: string;
    LastName: string;
    ProfilePicURL: string;
  }
  const [werkers, setWerkers] = useState<SchedWerkersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      ProfilePicURL: "",
    },
  ]);

  interface OpenShiftData {
    unfilledshifts: number;
    ShiftStatus: string;
  }
  const [openShifts, setOpenShifts] = useState<OpenShiftData>({
    unfilledshifts: 0,
    ShiftStatus: "",
  });

  const fetchSchedJob = () => {
    return axios
      .get(
        "http://localhost:3000/shifts/SchedShiftDetails/" + match.params.id,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  useEffect(() => {
    fetchSchedJob().then((data) => {
      setSchedJob(data.WerkShift);
      setWerkers(data.Werkers);
      setOpenShifts(data.OpenShifts);
    });
  }, [profile]);

  

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Job Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Job Summary
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonSegment
                value="/SchedShiftWerkers/"
                 onIonChange={(e: any) => {
                  window.location.href = `${e.detail.value}` + match.params.id;
                 }}>
                  <IonSegmentButton value="/SchedShiftDetails/">
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel>
                      <h2>Details</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="/SchedShiftWerkers/">
                    <IonIcon icon={peopleOutline} />
                    <IonLabel>
                      <h2>Werkers</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="/SchedShiftChat/">
                    <IonIcon icon={chatboxOutline} />
                    <IonLabel>
                      <h2>Chat</h2>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>

        <IonGrid>
          <IonRow className="jobGrid">
            <IonCol size="">
              <IonList>
                {werkers.map((werker) => (
                  <IonItem key={werker.UserId}>
                    <IonAvatar className="avatario" slot="start">
                      <img src={werker.ProfilePicURL} />
                    </IonAvatar>
                    <IonLabel className="labelo">
                      <h1>
                        {werker.FirstName} {werker.LastName}
                      </h1>
                    </IonLabel>
                    <IonIcon
                      className="cancelbox"
                      color="danger"
                      size="large"
                      icon={closeCircleOutline}
                    />
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol size="1"></IonCol>
            <IonCol size="10">
              You have {openShifts.unfilledshifts} vacant spots
            </IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>

          <br></br>

          
        </IonGrid>
      </IonContent>
      <br></br>

    </IonPage>
  );
};

export default SchedShiftWerkers;