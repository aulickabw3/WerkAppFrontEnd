import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
  IonLabel,
  IonRouterLink,
  IonList,
  IonItem,
  IonSpinner,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonIcon,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCheckbox,
  IonTabBar,
  IonTabButton,
  IonAvatar,
} from "@ionic/react";
import {
  person,
  arrowBackCircle,
  people,
  ellipsisHorizontal,
  pencilSharp,
} from "ionicons/icons";
import axios from "axios";
import {
  Link,
  matchPath,
  match,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import "./AssociateProfile.css";
import GetUser from "../components/GetUser";

// const checkboxList = [{ val: "Scheduler", isChecked: true }];

interface AssociateProfileProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AssociateProfile: React.FC<AssociateProfileProps> = ({ match }) => {
  console.log(match.params.id);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Get Self Data
  interface SelfData {
    UserId: number;
  }

  const [Self, setSelf] = React.useState<SelfData>({
    UserId: 0,
  });

  // Get selected user data
  interface ProfileData {
    UserId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    IsScheduler: boolean;
    IsDeleted: boolean;
    Company: string;
    Occupation: string;
    ProfilePicURL: string;
  }

  const [ListProfile, setListProfile] = React.useState<ProfileData>({
    UserId: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    IsScheduler: false,
    IsDeleted: false,
    Company: "",
    Occupation: "",
    ProfilePicURL: "",
  });

  const fetchProfile = () => {
    return axios
      .get("http://localhost:3000/user/AssociateProfile/" + match.params.id, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  // Request Status of Selected Associate
  interface AssociationData {
    RequestStatus: string;
  }

  const [association, setAssociation] = React.useState<AssociationData>({
    RequestStatus: "",
  });

  // association.RequestStatus = "something we can see";

  const associationRequest = (listProfile: ProfileData, self: SelfData) => {
    console.log(listProfile, self);
    return axios
      .post(
        "http://localhost:3000/businessassociate/AssociateRelationshipStatus",
        {
          withCredentials: true,
          self,
          listProfile,
        }
      )
      .then((response) => {
        return response.data;
      });
  };

  useIonViewDidEnter(() => {
    fetchProfile().then((profileData) => {
      GetUser().then((selfProfileData) => {
        setSelf(selfProfileData.personDataFound);
        associationRequest(
          profileData.user,
          selfProfileData.personDataFound
        ).then((requestStatusData) => {
          setAssociation(requestStatusData.associationStatus);
        });
      });
      setListProfile(profileData.user);
    });
    setIsLoading(false);
  }, [match, ListProfile, Self, association]);

  // Request Associate component and handler
  const handleAssociateRequest = () => {
    axios
      .post(
        "http://localhost:3000/businessassociate/AssociateProfile/" +
          match.params.id,
        { withCredentials: true, Self, ListProfile }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/AssociateProfile/" + match.params.id;
      });
  };

  const NotMyAssociateProfile: React.FC = () => {
    return (
      <IonRow>
        <IonCol size="6">
          <IonButton
            onClick={handleAssociateRequest}
            color="warning"
            // size="large"
            expand="block"
            fill="solid"
          >
            Add Associate
          </IonButton>
        </IonCol>
        <IonCol size="2">
          {/* <Link to="/EditProfile"> */}
          <IonButton
            color="medium"
            // size="large"
            expand="block"
            fill="solid"
          >
            <IonIcon icon={ellipsisHorizontal} />
          </IonButton>
          {/* </Link> */}
        </IonCol>
      </IonRow>
    );
  };

  // Accept or Decline Request component and handlers
  var requestResponse = {};

  const handleAcceptRequest = () => {
    requestResponse = { RequestStatus: "RequestAccepted" };
    axios
      .put("http://localhost:3000/businessassociate/UpdateRequest", {
        Self,
        ListProfile,
        requestResponse,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/AssociateProfile/" + match.params.id;
      });
  };

  const handleDeclineRequest = () => {
    requestResponse = { RequestStatus: "RequestDeclined" };
    axios
      .put("http://localhost:3000/businessassociate/UpdateRequest", {
        Self,
        ListProfile,
        requestResponse,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/AssociateProfile/" + match.params.id;
      });
  };

  const PendingAssociateProfile: React.FC = () => {
    return (
      <IonRow>
        <IonCol size="5">
          <IonButton
            onClick={handleAcceptRequest}
            color="warning"
            // size="large"
            expand="block"
            fill="solid"
          >
            Accept Request
          </IonButton>
        </IonCol>
        <IonCol size="5">
          {/* <Link to="/EditProfile"> */}
          <IonButton
            onClick={handleDeclineRequest}
            color="danger"
            // size="large"
            expand="block"
            fill="solid"
          >
            Deny Request
          </IonButton>
          {/* </Link> */}
        </IonCol>
      </IonRow>
    );
  };

  // PendingSent cancel request component and handler
  const handleCancelRequest = () => {
    requestResponse = { RequestStatus: "Cancelled" };
    axios
      .put("http://localhost:3000/businessassociate/UpdateRequest", {
        Self,
        ListProfile,
        requestResponse,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/AssociateProfile/" + match.params.id;
      });
  };

  const PendingSentAssociateProfile: React.FC = () => {
    return (
      <IonRow>
        <IonCol size="5">
          <IonButton
            onClick={handleCancelRequest}
            color="danger"
            // size="large"
            expand="block"
            fill="solid"
          >
            Cancel Request
          </IonButton>
        </IonCol>
        <IonCol size="2">
          {/* <Link to="/EditProfile"> */}
          <IonButton
            color="medium"
            // size="large"
            expand="block"
            fill="solid"
          >
            <IonIcon icon={ellipsisHorizontal} />
          </IonButton>
          {/* </Link> */}
        </IonCol>
      </IonRow>
    );
  };

  // My Associate component and handler
  const handleFireAssociate = () => {
    requestResponse = { RequestStatus: "Fired" };
    axios
      .put("http://localhost:3000/businessassociate/UpdateRequest", {
        Self,
        ListProfile,
        requestResponse,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/AssociateProfile/" + match.params.id;
      });
  };

  const MyAssociateProfile: React.FC = () => {
    return (
      <IonRow>
        <IonCol size="10">
          <IonButton
            onClick={handleFireAssociate}
            color="warning"
            expand="block"
            fill="solid"
          >
            Associate
          </IonButton>
        </IonCol>
        
      </IonRow>
    );
  };

  const BackButton: React.FC = () => {
    return <p>"/Associates"</p>;
  };

  // Render Conditional Associate Profile Action Button
  const AssociateProfileActions: React.FC = () => {
    console.log(association.RequestStatus);
    if (association.RequestStatus == "RequestAccepted") {
      return <MyAssociateProfile />;
    }
    if (association.RequestStatus == "RequestReceived") {
      return <PendingAssociateProfile />;
    }
    if (association.RequestStatus == "RequestSent") {
      return <PendingSentAssociateProfile />;
    }
    return <NotMyAssociateProfile />;
  };

  // const MyLoadingScreen: React.FC = () => {
  //   return (
  //     <IonPage>
  //       <IonGrid>
  //         <IonRow>
  //           <IonCol>
  //             <IonContent>

  //               <IonSpinner />

  //             </IonContent>
  //           </IonCol>
  //         </IonRow>
  //       </IonGrid>
  //     </IonPage>
  //   )
  // };

  // const RenderPage: React.FC = () => {
  //   if (isLoading == true) {
  //     return <MyLoadingScreen />;
  //   }
  //   return <MyPage />;
  // };

  // const MyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="warning">
            <IonTitle className="title2" size="large">
              Profile
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <br></br>
        </IonGrid>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonAvatar className="avatarino">
                <img src={ListProfile.ProfilePicURL}></img>
              </IonAvatar>
            </IonCol>
            <IonCol className="title2"></IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol size="">
              <h1>
                {ListProfile.FirstName} {ListProfile.LastName}
              </h1>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol size="11">
              <p>
                {ListProfile.Occupation} @ {ListProfile.Company}
              </p>
              <p>{ListProfile.Email}</p>
            </IonCol>
          </IonRow>
          <br></br>

          <AssociateProfileActions />

          <br></br>
          <IonRow className="profileGrid">
            <IonCol>
              This is a temporary bio! Just a quick few sentence or about who I
              am or whatever. I am a robot and I used to be a clown.
            </IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            {/* <IonCol>
                <IonLabel>Scheduler: </IonLabel>
                <IonCheckbox
                  className="listCol1"
                  // checked={checked}
                  // onIonChange={(e) => setChecked(e.detail.checked)}
                />
              </IonCol> */}
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

//   return (
//     <RenderPage/>
//   );
// };

export default AssociateProfile;
