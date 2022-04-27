import React, { useEffect, useState } from "react";
import {
  Link,
  match,
  RouteComponentProps,
  matchPath,
  useRouteMatch,
} from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
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
  IonDatetime,
  useIonViewDidEnter,
  IonTabBar,
  IonList,
  IonAvatar,
} from "@ionic/react";
import { person, arrowBackCircle } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import GetUser from "../components/GetUser";
import axios from "axios";

interface SchedPastJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SchedPastJob: React.FC<SchedPastJobProps> = ({ match }) => {
  interface ProfileData {
    UserId: number;
  }

  const [profile, setProfile] = useState<ProfileData>({
    UserId: 0,
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, []);

  interface MyJobData {
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

  const [myJob, setMyJob] = useState<MyJobData>({
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

  const fetchSchedPastJob = () => {
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
    fetchSchedPastJob().then((data) => {
      setMyJob(data.WerkShift);
      setWerkers(data.Werkers);
    });
  }, [profile]);

  const handlePaid = () => {
    const JobPaid = {
      UserId: profile.UserId,
    };

    axios
      .put("http://localhost:3000/shifts/Paid/" + myJob.ShiftId, { JobPaid })
      .then((response) => {
        console.log(response);
      });
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
          <IonRow className="">
            <IonRow>
              <IonCol>
                <Link to="/SchedPastJobs">
                  <IonIcon size="large" icon={arrowBackCircle} />
                </Link>
              </IonCol>
              <IonCol className="somethingHoribleHasHappened" size="6">
                <h3>{/*{PastShifts.unpaidShifts} Still Unpaid!! */}</h3>
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
                  {myJob.ShiftIdentifier}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Date:</h1>
                  </IonLabel>
                  <IonDatetime
                    displayFormat="DD-MMM-YY"
                    value={myJob.DateDay}
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
                    value={myJob.StartDateTime}
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
                    value={myJob.FinishDateTime}
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
                  {myJob.Company}
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Location:</h1>
                  </IonLabel>
                  {myJob.Location}
                </IonItem>
              </IonCol>
            </IonRow>
            <br></br>
            <IonRow className="jobGrid">
              <IonCol size="5">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Pay: </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="1">
                <h1>$</h1>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <h1 className="money">{myJob.Pay}</h1>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="jobGrid">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Notes:</h1>
                  </IonLabel>
                  {myJob.ShiftNotes}
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>

        <IonGrid>
          <IonRow className="jobGrid">
            <IonCol size="">
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Werkers:</h1>
                </IonLabel>

                <IonList>
                  {werkers.map((werker) => (
                    <IonItem
                      href={`/AssociateProfile/${werker.UserId}`}
                      key={werker.UserId}
                    >
                      <IonAvatar className="avatario" slot="start">
                        <img src={"../assets/profilePic.png"} />
                      </IonAvatar>
                      <IonLabel className="labelo">
                        <h1>
                          {werker.FirstName} {werker.LastName}
                        </h1>
                        {/* <p>{werker.WerkersCompany}</p> */}
                      </IonLabel>
                      <br></br>
                    </IonItem>
                  ))}
                </IonList>
                
              </IonItem>
            </IonCol>
            <IonCol className="somethingHoribleHasHappened" size="7">
              <h3>{/*{PastShifts.unpaidShifts} Still Unpaid!! */}</h3>
            </IonCol>
          </IonRow>
        </IonGrid>
        
      </IonContent>
      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handlePaid}
                color="danger"
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
    </IonPage>
  );
};

export default SchedPastJob;
