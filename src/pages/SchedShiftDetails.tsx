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

  console.log(match.params.id);

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
    
    const EditThing = schedJob.ShiftId;

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
              Cancel Job
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              href={`/EditShift/${match.params.id}`}
              color="medium"
              fill="solid"
              expand="block"
            >
              Edit Job
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
              Cancel Job
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              href={`/EditShift/${schedJob.ShiftId.toString}`}
              color="medium"
              fill="solid"
              expand="block"
            >
              Edit Job
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
              Mark Closed
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol size="11">
            <IonButton
              href={`/EditShift/${schedJob.ShiftId.toString}`}
              color="medium"
              fill="solid"
              expand="block"
            >
              Edit Job
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

        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonSegment
                  value="/SchedShiftDetails/"
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

        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/SchedulerView">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
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
              displayFormat="h:mm A"
              value={schedJob.StartDateTime}
            ></IonDatetime>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol>Finish Time:</IonCol>
            <IonDatetime
              displayFormat="h:mm A"
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
            <IonCol size="2"></IonCol>
            <IonCol size="9">{schedJob.ShiftNotes}</IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <br></br>
        </IonGrid>
      </IonContent>
      <br></br>

      <JobSummaryActions />
    </IonPage>
  );
};

export default SchedShiftDetails;
