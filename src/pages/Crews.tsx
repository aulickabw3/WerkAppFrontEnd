import React, { useState } from "react";
import {
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonAvatar,
  IonImg,
  useIonViewDidEnter,
} from "@ionic/react";
import axios from "axios";
import { person, arrowBackCircle, arrowBack, people } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./Associates.css";
import "./Search.css";
import GetUser from "../components/GetUser";

const Crews: React.FC = () => {
  //GET MY PROFILE DATA
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
  }
  const [myProfile, setMyProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
  });

  useIonViewDidEnter(() => {
    GetUser().then((data) => setMyProfile(data.personDataFound));
  }, []);
  console.log(myProfile);

  // Get Array Of All My Associates
  interface AssociatesData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [associatesCrew, setAssociatesCrew] = React.useState<AssociatesData[]>([
    {
      UserId: 0,
      FirstName: "",
      LastName: "",
      Company: "",
      Occupation: "",
      ProfilePicURL: "",
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

  console.log(associatesCrew);
  console.log(typeof associatesCrew);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondwarning">
          <IonTitle className="title2">My Crews</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="secondwarning">
            <IonTitle className="title2" size="large">
              My Crews
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/Main">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <br></br>
        <IonGrid>
          <IonRow className="">
            <IonCol className="title2">
              <IonIcon size="large" icon={people} />
              {/* <br></br>
              <IonLabel>
                <h1>Associates</h1>
              </IonLabel> */}
            </IonCol>
          </IonRow>
          {/* <br></br> */}
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList className="searchBar">
                {associatesCrew.map((val, key) => {
                  console.log(val.ProfilePicURL);
                  return (
                    <Link to={`/AssociateProfile/${val.UserId}`}>
                      <IonItem className="searchBar">
                        <IonCol size="2" className="listCol">
                          <IonAvatar>
                            <img src={val.ProfilePicURL} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="listCol">
                          {val.FirstName} {val.LastName}
                        </IonCol>
                        <IonCol size="2" className="listCol">
                          {val.Company}
                        </IonCol>
                      </IonItem>
                    </Link>
                  );
                })}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Crews;
