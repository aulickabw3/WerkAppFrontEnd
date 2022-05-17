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
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  closeOutline,
  closeCircleOutline,
  closeCircle,
} from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface ShiftDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SchedShiftDetails: React.FC<ShiftDetailsProps> = ({ match }) => {
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
  }
  const [werkers, setWerkers] = useState<SchedWerkersData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
    },
  ]);

  interface OpenShiftData {
    unfilledshifts: number;
  }
  const [openShifts, setOpenShifts] = useState<OpenShiftData>({
    unfilledshifts: 0,
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

  // Button for available job summary
  //////////////////////////////////////////
  const handleSchedCancel = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/shifts/SchedCancel/" + schedJob.ShiftId, {
        werkJob,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/SchedShiftDetails/" + schedJob.ShiftId;
      });
  };

  const SchedAvailableJobButton: React.FC = () => {
    return (
      <React.Fragment>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              onClick={handleSchedCancel}
              color="secondwarning"
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
  const handleCancel = () => {
    const werkJob = {
      UserId: profile.UserId,
    };

    axios
      .put(
        "http://localhost:3000/shifts/SchedulerCancelShift/" + schedJob.ShiftId,
        { werkJob }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/SchedShiftDetails/" + schedJob.ShiftId;
      });
  };

  const ScheduledJobButton: React.FC = () => {
    return (
      <React.Fragment>
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
    const JobPaid = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/shifts/Paid/" + schedJob.ShiftId, { JobPaid })
      .then((response) => {
        console.log(response);
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
              color="secondwarning"
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

  // Conditionally render action butons
  ///////////////////////////////////////
  // const JobSummaryActions: React.FC = () => {
  //   if (shiftDetails.ShiftStatus == "Open") {
  //     return <SchedAvailableJobButton />;
  //   }
  //   if (shiftDetails.ShiftStatus == "Scheduled") {
  //     return <SchedScheduledJobButton />;
  //   }
  //   return <SchedPastJobButton />;
  // };

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
        <Link to="/SchedulerView">
          <IonIcon size="large" icon={arrowBackCircle} />
        </Link>
        <br></br>
        <IonGrid>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Date:</IonCol>
            <IonDatetime
              displayFormat="DD-MMM-YY"
              value={schedJob.DateDay}
            ></IonDatetime>
            <IonCol size="1"></IonCol>{" "}
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Start Time:</IonCol>
            <IonDatetime
              displayFormat="HH:mm"
              value={schedJob.StartDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Finish Time:</IonCol>
            <IonDatetime
              displayFormat="HH:mm"
              value={schedJob.FinishDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Pay:</IonCol>
            <h1>{schedJob.Pay}</h1>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Company:</IonCol>
            {schedJob.Company}
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Location:</IonCol>
            {schedJob.Location}
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Job#:</IonCol>
            {schedJob.ShiftIdentifier}
            <IonCol size="1"></IonCol>
          </IonRow>

          <br></br>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Notes:</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol size="10">{schedJob.ShiftNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
          <IonRow>
            {/* <IonCol size="1"></IonCol> */}
            <IonCol size="4">
              <h2>Werkers:</h2>
            </IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonLabel>Paid</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>Cancel</IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="jobGrid">
            <IonCol size="">
              <IonList>
                {werkers.map((werker) => (
                  <IonItem key={werker.UserId}>
                    <IonAvatar className="avatario" slot="start">
                      <img src={"../assets/profilePic.png"} />
                    </IonAvatar>
                    <IonLabel className="labelo">
                      <h1>
                        {werker.FirstName} {werker.LastName}
                      </h1>
                    </IonLabel>
                    <IonCheckbox className="paidbox"></IonCheckbox>
                    <IonIcon
                      // onClick={CancelThisWerker}
                      className="cancelbox"
                      color="danger"
                      size="large"
                      icon={closeCircleOutline}
                    />
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
            <IonCol className="somethingHoribleHasHappened" size="7">
              {/* <h3 >
                Need {openShifts.unfilledshifts} More!!
              </h3> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <br></br>

      <IonRow>
        <IonCol></IonCol>
        <IonCol size="11">
          <IonButton color="secondwarning" fill="solid" expand="block">
            Action Button
          </IonButton>
        </IonCol>
        <IonCol></IonCol>
      </IonRow>

      {/* <JobSummaryActions/> */}
    </IonPage>
  );
};

export default SchedShiftDetails;
