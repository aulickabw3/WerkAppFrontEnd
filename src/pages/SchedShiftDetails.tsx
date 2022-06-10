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
              Cancel
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </React.Fragment>
    );
  };


  const SchedScheduledJobButton: React.FC = () => {
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

  const SchedPastJobButton: React.FC = () => {
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

  // Conditionally render action buttons
  ///////////////////////////////////////
  const JobSummaryActions: React.FC = () => {
    if (openShifts.ShiftStatus == "Open") {
      return <SchedAvailableJobButton />;
    }
    if (openShifts.ShiftStatus == "Scheduled") {
      return <SchedScheduledJobButton />;
    }
    return <SchedPastJobButton />;
  };

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
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/SchedulerView">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
            {/* <IonCol>
              <Link to="/EditJob">
                <IonButton fill="outline" color="danger">Edit Job</IonButton>
              </Link>
            </IonCol> */}
          </IonRow>
        </IonGrid>
        {/* <br></br> */}
        <IonGrid>
          
          <br></br>
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

          <IonRow>
            <IonCol size="4">
              <h3>Werkers:</h3>
            </IonCol>
          </IonRow>
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
                    {/* <IonCheckbox className="paidbox"></IonCheckbox> */}
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
          </IonRow>
          <IonRow>
            <IonCol size="3"></IonCol>
            <IonCol size="9">
              <h3>{openShifts.unfilledshifts} More Needed</h3>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          <br></br>
          
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Notes:</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2"></IonCol>
            <IonCol size="9">{schedJob.ShiftNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol size="2"></IonCol>
            <IonCol size="9">{schedJob.WerkerNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow> */}
          <br></br>
        </IonGrid>
      </IonContent>
      <br></br>

      <JobSummaryActions/>
    </IonPage>
  );
};

export default SchedShiftDetails;
