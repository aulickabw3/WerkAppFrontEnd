import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonLabel,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonDatetime,
  IonTextarea,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBackCircle } from "ionicons/icons";
import axios from "axios";
import {
  Link,
  matchPath,
  match,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import "./Profile.css";
import GetUser from "../components/GetUser";

interface EditShiftDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditShift: React.FC<EditShiftDetailsProps> = ({ match }) => {
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

  const [editSchedJob, setEditSchedJob] = useState<SchedJobData>({
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

  const fetchEditSchedJob = () => {
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

  useIonViewDidEnter(() => {
    fetchEditSchedJob().then((data) => {
      setEditSchedJob(data.WerkShift);
      setWerkers(data.Werkers);
      setOpenShifts(data.OpenShifts);
    });
  }, []);

  console.log(editSchedJob);

  const handleSubmit = () => {
    axios
      .put("http://localhost:3000/shifts/EditSchedShift/", {
        withCredentials: true,
        editSchedJob,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Edit Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Edit Job
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <form>
            <IonLabel>
              <h1>Job ID/#:</h1>
            </IonLabel>
            <IonInput
              type="text"
              name="ShiftIdentifier"
              value={editSchedJob.ShiftIdentifier}
              onIonChange={(e: any) =>
                setEditSchedJob({
                  ...editSchedJob,
                  ShiftIdentifier: e.target.value,
                })
              }
            ></IonInput>
            <IonLabel>
              <h1>Date:</h1>
            </IonLabel>
            <IonDatetime
              // displayFormat="DD-MMM-YY"
              value={editSchedJob.DateDay}
              name="DateDay"
              // onIonChange={(e: any) =>
              //   setEditSchedJob({
              //     ...editSchedJob,
              //     DateDay: e.target.value!,
              //   })
              // }
            ></IonDatetime>
            <IonLabel>
              <h1>Start:</h1>
            </IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={editSchedJob.StartDateTime}
              // onIonChange={(e: any) =>
              //   setEditSchedJob({
              //     ...editSchedJob,
              //     StartDateTime: e.target.value,
              //   })
              // }
            ></IonDatetime>
            <IonLabel>
              <h1>End:</h1>
            </IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={editSchedJob.FinishDateTime}
              // onIonChange={(e: any) =>
              //   setEditSchedJob({
              //     ...editSchedJob,
              //     FinishDateTime: e.target.value,
              //   })
              // }
            ></IonDatetime>
            <IonLabel>
              <h1>Company:</h1>
            </IonLabel>
            <IonInput
              value={editSchedJob.Company}
              type="text"
              name="Company"
              onIonChange={(e: any) =>
                setEditSchedJob({
                  ...editSchedJob,
                  Company: e.target.value,
                })
              }
            ></IonInput>
            <IonLabel>
              <h1>Location:</h1>
            </IonLabel>
            <IonInput
              type="text"
              name="Location"
              value={editSchedJob.Location}
              onIonChange={(e: any) =>
                setEditSchedJob({
                  ...editSchedJob,
                  Location: e.target.value,
                })
              }
            ></IonInput>
            <IonLabel>
              <h1>Pay: </h1>
            </IonLabel>
            <IonInput
              type="text"
              name="Pay"
              value={editSchedJob.Pay}
              onIonChange={(e: any) =>
                setEditSchedJob({
                  ...editSchedJob,
                  Pay: e.target.value,
                })
              }
            ></IonInput>
            <IonLabel>
              <h1>Notes:</h1>
            </IonLabel>
            <IonTextarea
              value={editSchedJob.ShiftNotes}
              onIonChange={(e: any) =>
                setEditSchedJob({
                  ...editSchedJob,
                  ShiftNotes: e.target.value,
                })
              }
            ></IonTextarea>
          </form>
        </IonGrid>
      </IonContent>
      <IonButton
        onClick={handleSubmit}
        color="secondwarning"
        size="large"
        fill="solid"
        expand="block"
      >
        Save
      </IonButton>
      <IonButton
        href={`/SchedShiftDetails/${match.params.id}`}
        color="medium"
        size="large"
        fill="solid"
        expand="block"
      >
        Cancel
      </IonButton>
    </IonPage>
  );
};

export default EditShift;
