import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
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
  IonItem,
  useIonViewDidEnter,
  IonAvatar,
  IonList,
  IonSegment,
  IonSegmentButton,
  useIonAlert,
} from "@ionic/react";
import {
  closeCircleOutline,
  documentTextOutline,
  peopleOutline,
  chatboxOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface ShiftDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SchedShiftWerkers: React.FC<ShiftDetailsProps> = ({ match }) => {
  const [present] = useIonAlert();

  /////////////////////////////////////////
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  //////////////////////////////////////////////////
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

  //////////////////////////
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

  //////////////////////////
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
        "https://werkapp-server.com/shifts/SchedShiftDetails/" + match.params.id,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  //////////////////////////////////////////////////////////////////////////////
  interface InvitedWerkersData {
    UserId: number;
    FirstName: string;
    LastName: string;
    ProfilePicURL: string;
  }
  const [invitedWerkers, setInvitedWerkers] = useState<InvitedWerkersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      ProfilePicURL: "",
    },
  ]);

  const fetchInvitedWerkers = () => {
    return axios
      .get("https://werkapp-server.com/shifts/InvitedWerkers/" + match.params.id, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  //////////////////////////////////////////////////////////
  useEffect(() => {
    fetchSchedJob().then((data) => {
      setSchedJob(data.WerkShift);
      setWerkers(data.Werkers);
      setOpenShifts(data.OpenShifts);
    });
    fetchInvitedWerkers().then((invitedData) =>
      setInvitedWerkers(invitedData.invitedWerkerList)
    );
  }, [profile]);

  ///////////////////////////////////////////////////////////////
  const [cancelWerker, setCancelWerker] = useState<number>(0);

  const handleCancelWerker = () => {
    axios
      .delete(
        "https://werkapp-server.com/shifts/RemoveWerkerFromShift/" +
          cancelWerker + "/" +
          match.params.id +
          "/Scheduler/" +
          profile.UserId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/SchedShiftWerker/" + match.params.id;
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  const handleDecrementOpenSpotByOne = () => {
    axios
      .put(
        "https://werkapp-server.com/shifts/AddRemoveShiftSlot/" +
          match.params.id + "/Remove",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/SchedShiftWerkers/" + match.params.id;
      });
  };

  ////////////////////////////////////////////////////////////////////////////////
  const incrementNumberOfWerkersNeeded = () => {
    axios
      .put(
        "https://werkapp-server.com/shifts/AddRemoveShiftSlot/" +
          match.params.id + "/Add",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/SchedShiftWerkers/" + match.params.id;
      });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Werkers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Werkers
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
                    window.location.href =
                      `${e.detail.value}` + match.params.id;
                  }}
                >
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

        <h4>Scheduled:</h4>
        <IonList>
          {werkers.map((werker) => (
            <IonItem key={werker.UserId}>
              <IonAvatar className="avatario" slot="start">
                <img src={werker.ProfilePicURL} />
              </IonAvatar>
              <IonLabel className="labelo">
                {werker.FirstName} {werker.LastName}
              </IonLabel>
              <IonIcon
                onClick={() => {
                  if (openShifts.ShiftStatus !== "Past") {
                    setCancelWerker(werker.UserId); 
                    present({
                      header: "Cancel Werker?",
                      buttons: [
                        "No", { text: "Yes", handler: handleCancelWerker },
                      ],
                      onDidDismiss: (e) => console.log("did dismiss"),
                    });
                  } return null
                }}
                className="cancelbox"
                color={openShifts.ShiftStatus == "Past" ? "success" : "danger"}
                size="large"
                icon={openShifts.ShiftStatus == "Past" ? checkmarkCircleOutline : closeCircleOutline}
              />
            </IonItem>
          ))}
        </IonList>
        <IonList>
          {[...Array(openShifts.unfilledshifts)].map((openShift, i) => (
            <IonItem key={i}>
              <IonLabel className="labelo">
                Open Shift
                <p>Shift # {i + 1 + werkers.length}</p>
              </IonLabel>
              <IonIcon
                onClick={() =>
                  present({
                    header: "Remove Open Shift?",
                    buttons: [
                      "Cancel",
                      { text: "Ok", handler: handleDecrementOpenSpotByOne },
                    ],
                    onDidDismiss: (e) => console.log("did dismiss"),
                  })
                }
                className="cancelbox"
                color="danger"
                size="large"
                icon={closeCircleOutline}
              />
            </IonItem>
          ))}
        </IonList>
        <br></br>
        <h4>Invited:</h4>
        <IonList>
          {invitedWerkers.map((invitedWerker) => (
            <IonItem key={invitedWerker.UserId}>
              <IonAvatar className="avatario" slot="start">
                <img src={invitedWerker.ProfilePicURL} />
              </IonAvatar>
              <IonLabel className="labelo">
                {invitedWerker.FirstName} {invitedWerker.LastName}
              </IonLabel>
              <IonIcon
                className="cancelbox"
                color="danger"
                size="large"
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={() =>
                present({
                  header: "Add Another Slot?",
                  buttons: [
                    "Cancel",
                    { text: "Ok", handler: incrementNumberOfWerkersNeeded },
                  ],
                  onDidDismiss: (e) => console.log("did dismiss"),
                })
              }
              color="secondwarning"
              fill="solid"
              expand="block"
            >
              Add Slot +
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        {/* <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              // onClick={republishShift}
              color="medium"
              fill="solid"
              expand="block"
            >
              Edit Werkers
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow> */}
      </React.Fragment>
      <br></br>
    </IonPage>
  );
};

export default SchedShiftWerkers;
