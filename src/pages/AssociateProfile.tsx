import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
  IonLabel,
  IonRouterLink,
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
  IonImg,
  IonCheckbox,
} from "@ionic/react";
import { person, arrowBackCircle, people } from "ionicons/icons";
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

  React.useEffect(() => {
    fetchProfile().then((data) => setListProfile(data.user));
  }, []);
  console.log(ListProfile);

  // Get Self Data
  interface SelfData {
    UserId: number;
  }

  const [Self, setSelf] = React.useState<SelfData>({
    UserId: 0,
  });

  React.useEffect(() => {
    GetUser().then((data) => setSelf(data.personDataFound));
  }, []);
  console.log(Self);

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
      });
  };

  const NotMyAssociateProfile: React.FC = () => {
    return (
      <IonRow className="listCol1">
        <IonCol className="listJobs">
          <Link to="/Associates">
            <IonButton
              onClick={handleAssociateRequest}
              href="/MyJobs"
              color="warning"
              size="large"
              expand="block"
              fill="solid"
            >
              Add Associate
            </IonButton>
            <br></br>
          </Link>
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
      });
  };

  const PendingAssociateProfile: React.FC = () => {
    return (
      <IonRow className="listCol1">
        <IonCol className="listJobs">
          <Link to="/Associates">
            <IonButton
              onClick={handleAcceptRequest}
              href="/MyJobs"
              color="success"
              size="large"
              expand="block"
              fill="solid"
            >
              Accept Request
            </IonButton>
            <br></br>
          </Link>
        </IonCol>
        <IonCol className="listJobs">
          <Link to="/Associates">
            <IonButton
              onClick={handleDeclineRequest}
              href="/MyJobs"
              color="danger"
              size="large"
              expand="block"
              fill="solid"
            >
              Deny Request
            </IonButton>
            <br></br>
          </Link>
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
      });
  };

  const PendingSentAssociateProfile: React.FC = () => {
    return (
      <IonRow className="listCol1">
        <IonCol className="listJobs">
          <Link to="/Associates">
            <IonButton
              onClick={handleCancelRequest}
              href="/MyJobs"
              color="danger"
              size="large"
              expand="block"
              fill="solid"
            >
              Cancel Request
            </IonButton>
            <br></br>
          </Link>
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
      });
  };

  const MyAssociateProfile: React.FC = () => {
    return (
      <IonRow className="listCol1">
        <IonCol className="listJobs">
          <Link to="/Associates">
            <IonButton
              onClick={handleFireAssociate}
              href="/MyJobs"
              color="danger"
              size="large"
              expand="block"
              fill="solid"
            >
              Fire Associate
            </IonButton>
            <br></br>
          </Link>
        </IonCol>
      </IonRow>
    );
  };

  // Request Status of Selected Associate
  interface AssociationData {
    RequestStatus: string;
  }

  const [association, setAssociation] = React.useState<AssociationData>({
    RequestStatus: "",
  });

  const associateRequest = () => {
    return axios
      .post(
        "http://localhost:3000/businessassociate/AssociateRelationshipStatus",
        {
          withCredentials: true,
          Self,
          ListProfile,
        }
      )
      .then((response) => {
        return response.data;
      });
  };

  React.useEffect(() => {
    associateRequest().then((data) => setAssociation(data.associationStatus));
  }, [Self, ListProfile]);

  console.log( association);

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


  // Page
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
          <IonRow>
            <IonCol>
              <Link to="/Search">
                <IonIcon size="large" icon={arrowBackCircle} />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="profileGrid">
            <IonCol>
              <IonImg src={ListProfile.ProfilePicURL}></IonImg>
            </IonCol>
            <IonCol className="title2">
              <h1>{ListProfile.FirstName}</h1>
              <h1>{ListProfile.LastName}</h1>
            </IonCol>
          </IonRow>
          <br></br>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Company/Agency:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Company}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Occupation:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Occupation}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="profileGrid">
            <IonCol>
              <h3>Email:</h3>
            </IonCol>
            <IonCol className="listCol1">
              <h3>{ListProfile.Email}</h3>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Scheduler: </IonLabel>
              <IonCheckbox
                className="listCol1"
                // checked={checked}
                // onIonChange={(e) => setChecked(e.detail.checked)}
              />
            </IonCol>
          </IonRow>
          <br></br>
          <br></br>
          <AssociateProfileActions />
          <br></br>
          <IonRow className="profileGrid">
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default AssociateProfile;
