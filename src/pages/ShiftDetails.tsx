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
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handleWerk}
                color="danger"
                size="large"
                fill="solid"
              >
                Werk
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
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
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={handleWerked}
                color="success"
                size="large"
                fill="solid"
              >
                Werked
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={handleCancel}
                color="danger"
                size="large"
                fill="solid"
              >
                Cancel
              </IonButton>
            </IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
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
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handlePaid}
                color="success"
                size="large"
                fill="solid"
                href="/SchedulerView"
              >
                Mark Paid
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
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
        <IonGrid>
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/Main">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
            </IonRow>
          </IonRow>
          <form>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Job ID/#:</h1>
                  </IonLabel>
                  {shiftDetails.ShiftIdentifier}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={shiftDetails.DateDay}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Start:</h1>
                  </IonLabel>
                  <IonDatetime
                    // hourValues={12}
                    // hour-cycle="h12"
                    displayFormat="HH:mm"
                    value={shiftDetails.StartDateTime}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>End:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="HH:mm"
                    value={shiftDetails.FinishDateTime}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Company:</h1>
                  </IonLabel>
                  {shiftDetails.Company}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  {shiftDetails.Location}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="1">
                <h1>$</h1>
              </IonCol>
              <IonCol size="5">
                <IonItem>
                  <h1 className="money">{shiftDetails.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  {shiftDetails.ShiftNotes}
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>

      {/* <JobSummaryActions /> */}

    </IonPage>
  );
};

export default ShiftDetails;
