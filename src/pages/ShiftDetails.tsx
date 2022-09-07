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
  IonSegment,
  IonSegmentButton,
  IonList,
  useIonAlert,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
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

const ShiftDetails: React.FC<ShiftDetailsProps> = ({ match }) => {
  interface ShiftDetailsData {
    ShiftId: number;
    ShiftIdentifier: string;
    UserUserId: string;
    DateDay: string;
    StartDateTime: string;
    FinishDateTime: string;
    Company: string;
    Location: string;
    Pay: string;
    ShiftNotes: string;
    ShiftStatus: string;
    SchedFirstName: string;
    SchedLastName: string;
    IsPaid: boolean;
  }

  const [shiftDetails, setshiftDetails] = useState<ShiftDetailsData>({
    ShiftId: 0,
    ShiftIdentifier: "",
    UserUserId: "",
    DateDay: "",
    StartDateTime: "",
    FinishDateTime: "",
    Company: "",
    Location: "",
    Pay: "",
    ShiftNotes: "",
    ShiftStatus: "",
    SchedFirstName: "",
    SchedLastName: "",
    IsPaid: false,
  });

  const fetchAvailableJob = () => {
    return axios
      .get(
        "https://werkapp-server.com/shifts/ShiftDetails/" +
          match.params.id +
          "/" +
          profile.UserId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useEffect(() => {
    fetchAvailableJob().then((data) => setshiftDetails(data.werkShift));
  }, [profile]);

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, [shiftDetails]);

  // Button for available job summary
  //////////////////////////////////////////
  const handleWerk = () => {
    const werkJob = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
      SchedID: shiftDetails.UserUserId,
    };

    axios
      .post("https://werkapp-server.com/shifts/WerkShift/", {
        werkJob,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/ShiftDetails/" + shiftDetails.ShiftId;
      });
  };

  const [present] = useIonAlert();

  const AvailableJobButton: React.FC = () => {
    return (
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={() =>
                present({
                  header: "Werk This Job?",
                  buttons: ["Cancel", { text: "Ok", handler: handleWerk }],
                  onDidDismiss: (e) => console.log("did dismiss"),
                })
              }
              color="warning"
              fill="solid"
              expand="block"
            >
              Werk
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </React.Fragment>
    );
  };

  // Button for scheduled job summary
  /////////////////////////////
  const handleWerked = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
      UpdateStatus: "Werked",
      SchedID: shiftDetails.UserUserId,
    };
    axios
      .put("https://werkapp-server.com/shifts/ShiftStatusUpdate/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/ShiftDetails/" + shiftDetails.ShiftId;
      });
  };

  const handleCancel = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
      UpdateStatus: "Cancelled",
    };
    axios
      .put("https://werkapp-server.com/shifts/ShiftStatusUpdate/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/PastJob/" + shiftDetails.ShiftId;
      });
  };

  const ScheduledJobButton: React.FC = () => {
    return (
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={() =>
                present({
                  header: `Mark as "Werked"?`,
                  buttons: ["Cancel", { text: "Ok", handler: handleWerked }],
                  onDidDismiss: (e) => console.log("did dismiss"),
                })
              }
              color="warning"
              fill="solid"
              expand="block"
            >
              Werked
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={() =>
                present({
                  header: "Cancel Job?",
                  buttons: ["Cancel", { text: "Ok", handler: handleCancel }],
                  onDidDismiss: (e) => console.log("did dismiss"),
                })
              }
              color="medium"
              fill="solid"
              expand="block"
            >
              Cancel
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </React.Fragment>
    );
  };

  // Button for past job summary
  ///////////////////////////////////////////
  const handlePaid = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
      IsPaid: true,
      SchedID: shiftDetails.UserUserId,
    };

    axios
      .put("https://werkapp-server.com/shifts/WerkerIsPaid/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/ShiftDetails/" + shiftDetails.ShiftId;
      });
  };

  const PaidJobButton: React.FC = () => {
    return (
      <React.Fragment>
          {/* <IonRow>
            <IonCol size="5"></IonCol>
            <IonCol size="">
              <h2>Paid</h2>
            </IonCol>
            <IonCol></IonCol>
          </IonRow> */}
        </React.Fragment>
    );
  };

  // const ShiftDetails: React.FC<ShiftDetailsProps> = ({ match }) => {

  const PastJobButton: React.FC = () => {
      return (
        <React.Fragment>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="11">
              <IonButton
                onClick={() =>
                  present({
                    header: "Mark as Paid?",
                    buttons: ["Cancel", { text: "Ok", handler: handlePaid }],
                    onDidDismiss: (e) => console.log("did dismiss"),
                  })
                }
                color="warning"
                fill="solid"
                expand="block"
              >
                Mark Paid
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </React.Fragment>
      );
  };

  console.log(shiftDetails.ShiftStatus);
  // Conditionally render action buttons
  ///////////////////////////////////////
  const JobSummaryActions: React.FC = () => {
    if (shiftDetails.ShiftStatus == "Scheduled") {
      return <ScheduledJobButton />;
    }
    if (shiftDetails.ShiftStatus == "Cancelled") {
      return <PastJobButton />;
    }
    if (shiftDetails.ShiftStatus == "Werked") {
      return <PastJobButton />;
    }
    if (shiftDetails.ShiftStatus == "Paid") {
      return <PaidJobButton />;
    }
    return <AvailableJobButton />;
  };

  const ChatToolbar: React.FC = () => {
    return (
      <React.Fragment>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSegment
                  value="/ShiftDetails/"
                  onIonChange={(e: any) => {
                    window.location.href =
                      `${e.detail.value}` + match.params.id;
                  }}
                >
                  <IonSegmentButton value="/ShiftDetails/">
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel>
                      <h2>Details</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="/ShiftChat/">
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
      </React.Fragment>
    );
  };

  // const NotChatToolbar: React.FC = () => {
  //   return (
  //     <React.Fragment>
  //       <br></br>
  //     </React.Fragment>
  //   );
  // };

  // //Conditionally render ShiftDetails Toolbar w/ Chat
  // const ShiftDetailsToolbar: React.FC = () => {
  //   if (shiftDetails.ShiftStatus == "Scheduled") {
  //     return <ChatToolbar />;
  //   }
  //   if (shiftDetails.ShiftStatus == "Cancelled") {
  //     return <ChatToolbar />;
  //   }
  //   if (shiftDetails.ShiftStatus == "Werked") {
  //     return <ChatToolbar />;
  //   }
  //   return <NotChatToolbar />;
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Job Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Job Summary
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <ChatToolbar/>
        {/* <ShiftDetailsToolbar /> */}

        <IonItem>
          <IonAvatar className="avtr" slot="start">
            <img src={"../assets/profilePic.png"} />
          </IonAvatar>
          <IonLabel>
            {shiftDetails.SchedFirstName} {shiftDetails.SchedLastName}
          </IonLabel>
        </IonItem>
        <br></br>
        <IonGrid>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Date:</IonCol>
            <IonDatetime
              displayFormat="MMM D, YYYY"
              value={shiftDetails.DateDay}
            ></IonDatetime>
            <IonCol size="1"></IonCol>{" "}
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Start Time:</IonCol>
            <IonDatetime
              displayFormat="h:mm A"
              value={shiftDetails.StartDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Finish Time:</IonCol>
            <IonDatetime
              displayFormat="h:mm A"
              value={shiftDetails.FinishDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Pay:</IonCol>
            <h2>{shiftDetails.Pay}</h2>
            <IonCol size="1"></IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Company:</IonCol>
            {shiftDetails.Company}
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Location:</IonCol>
            {shiftDetails.Location}
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Job#:</IonCol>
            {shiftDetails.ShiftIdentifier}
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Notes:</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2"></IonCol>
            <IonCol size="9">{shiftDetails.ShiftNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
        </IonGrid>
      </IonContent>
      <JobSummaryActions />
    </IonPage>
  );
};

export default ShiftDetails;
