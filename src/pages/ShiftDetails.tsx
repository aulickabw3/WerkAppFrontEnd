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
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface ShiftDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ShiftDetails: React.FC<ShiftDetailsProps> = ({ match }) => {
  console.log(match.params.id);

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
  });

  const fetchAvailableJob = () => {
    return axios
      .get("http://localhost:3000/shifts/ShiftDetails/" + match.params.id, {
        withCredentials: true,
      })
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

  useIonViewDidEnter(() => {
    fetchAvailableJob().then((data) => setshiftDetails(data.werkShift));
  }, []);

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, [shiftDetails]);

  // Button for available job summary
  //////////////////////////////////////////
  const handleWerk = () => {
    const werkJob = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
    };

    axios
      .post("http://localhost:3000/shifts/WerkShift/", {
        werkJob,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/ShiftDetails/" + shiftDetails.ShiftId;
      });
  };

  const AvailableJobButton: React.FC = () => {
    return (
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={handleWerk}
              color="warning"
              fill="solid"
              expand="block"
            >
              Werk
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              // onClick={handleCant}
              color="medium"
              fill="solid"
              expand="block"
            >
              Can't Do It
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
    };
    axios
      .put("http://localhost:3000/shifts/ShiftStatusUpdate/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/PastJob/" + shiftDetails.ShiftId;
      });
  };

  const handleCancel = () => {
    const updateWerkerShiftStatus = {
      UserId: profile.UserId,
      ShiftId: shiftDetails.ShiftId,
      UpdateStatus: "Cancelled",
    };
    axios
      .put("http://localhost:3000/shifts/ShiftStatusUpdate/", {
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
              onClick={handleWerked}
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
              onClick={handleCancel}
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
    };

    axios
      .put("http://localhost:3000/shifts/WerkerIsPaid/", {
        updateWerkerShiftStatus,
      })
      .then((response) => {
        console.log(response);
        // window.location.href = "/PastJob/" + myPastJob.ShiftId;
      });
  };

  const PastJobButton: React.FC = () => {
    return (
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={handlePaid}
              color="warning"
              fill="solid"
              expand="block"
            >
              Mark Paid
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              // onClick={handleComplaint}
              color="medium"
              fill="solid"
              expand="block"
            >
              Complain
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </React.Fragment>
    );
  };

  // Conditionally render action butons
  ///////////////////////////////////////
  // const JobSummaryActions: React.FC = () => {
  //   if (shiftDetails.ShiftStatus == "Open") {
  //     return <AvailableJobButton />;
  //   }
  //   if (shiftDetails.ShiftStatus == "Scheduled") {
  //     return <ScheduledJobButton />;
  //   }
  //   return <PastJobButton />;
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

              {/* <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link> */}
        <br></br>
        <IonItem>
          <IonAvatar className="avtr" slot="start">
            <img src={"../assets/profilePic.png"} />
          </IonAvatar>
          <IonLabel>
            <h2>Scheduler's Name</h2>
          </IonLabel>
        </IonItem>
        <br></br>
        <IonGrid>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Date:</IonCol>
            <IonDatetime
              displayFormat="DD-MMM-YY"
              value={shiftDetails.DateDay}
            ></IonDatetime>
            <IonCol size="1"></IonCol>{" "}
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Start Time:</IonCol>
            <IonDatetime
              displayFormat="HH:mm"
              value={shiftDetails.StartDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Finish Time:</IonCol>
            <IonDatetime
              displayFormat="HH:mm"
              value={shiftDetails.FinishDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Pay:</IonCol>
            <h1>{shiftDetails.Pay}</h1>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
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
            <IonCol></IonCol>
            <IonCol size="11">
              <IonButton color="warning" fill="solid" expand="block">
                Action Button
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="11">
              <IonButton color="medium" fill="solid" expand="block">
                Other Action Button
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          {/* <JobSummaryActions/> */}

          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Notes:</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol size="10">{shiftDetails.ShiftNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ShiftDetails;
