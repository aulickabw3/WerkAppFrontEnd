import React, { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
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
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  useIonViewDidEnter,
  IonList,
  IonCheckbox,
  IonFooter,
  IonTabs,
  IonTabBar,
} from "@ionic/react";
import axios from "axios";
import "./CreateAccount.css";
import { arrowBackCircle, checkmarkDoneSharp } from "ionicons/icons";
import GetUser from "../components/GetUser";

interface PublishJobProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const PublishJob: React.FC<PublishJobProps> = ({ match }) => {
// Get Self UserId
  interface ProfileData {
    UserId: number;
  }
  const [myProfile, setMyProfile] = React.useState<ProfileData>({
    UserId: 0,
  });
  useIonViewDidEnter(() => {
    GetUser().then((data) => setMyProfile(data.personDataFound));
  }, []);

  // Get Array Of All My Associates
  interface AssociatesData {
    UserId: any;
    FirstName: string;
    LastName: string;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
    isSelected: boolean;
  }
  const [associatesCrew, setAssociatesCrew] = React.useState<AssociatesData[]>([
    {
      UserId: "",
      FirstName: "",
      LastName: "",
      Company: "",
      Occupation: "",
      ProfilePicURL: "",
      isSelected: false,
    },
  ]);

  const fetchAssociates = () => {
    return axios
      .get(
        "http://localhost:3000/businessassociate/ListOfAssociates/" +
          myProfile.UserId,
        {}
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  };

  React.useEffect(() => {
    fetchAssociates().then((data) => setAssociatesCrew(data.listOfAssociates2));
  }, [myProfile]);

  //Set My Crew
  const [crew, setCrew] = useState<Array<number>>([]);

  const handleSubmit = () => {
    const MyCrew = {
      UserId: myProfile.UserId,
      Crew: crew,
      JobJobID: match.params,
    };
    axios
      .post("http://localhost:3000/shifts/PublishJob", { MyCrew })
      .then((data) => {
        console.log(data);
        window.location.href = "/SchedulerView"
    });
  };

  console.log(crew);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">Choose Werkers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              Choose Werkers
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/ScheduleJob">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
          <form>
            <IonGrid>
              <IonList className="searchBar">
                {associatesCrew.map((val, key) => {
                  key = val.UserId;
                  return (
                    <IonItem className="searchBar">
                      <IonCol className="squared" size="1">
                        <IonCheckbox
                          value={val.UserId}
                          onIonChange={(event: any) => {
                            const selectedCrew = parseInt(event.target.value);
                            if (crew.includes(selectedCrew)) {
                              const newIds = crew.filter(
                                (crewId) => crewId !== selectedCrew
                              );
                              setCrew(newIds);
                            } else {
                              const newCrew = [...crew];
                              newCrew.push(selectedCrew);
                              setCrew(newCrew);
                            }
                          }}
                          checked={crew.includes(val.UserId) ? true : false}
                        />
                      </IonCol>
                      <IonCol size="1" className="listCol">
                        <IonAvatar>
                          <img src={val.ProfilePicURL} />
                        </IonAvatar>
                      </IonCol>
                      <IonCol size="3" className="listCol">
                        {val.FirstName} {val.LastName}
                      </IonCol>
                      <IonCol size="4" className="listCol">
                        {val.Company}
                      </IonCol>
                    </IonItem>
                  );
                })}
              </IonList>
            </IonGrid>
          </form>
        </IonGrid>
      </IonContent>

      <IonTabBar className="schedulebutton">
        <IonTabButton>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={handleSubmit}
                color="danger"
                size="large"
                fill="solid"
                href="/SchedulerView"
              >
                Schedule
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PublishJob;

