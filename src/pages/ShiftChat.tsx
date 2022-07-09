import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
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
  IonItem,
  useIonViewDidEnter,
  IonDatetime,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonList,
  IonItemDivider,
} from "@ionic/react";
import {
  documentTextOutline,
  chatboxOutline,
  paperPlaneOutline,
} from "ionicons/icons";
import "./AvailableJob.css";
import axios from "axios";
import GetUser from "../components/GetUser";

interface ShiftChatProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ShiftChat: React.FC<ShiftChatProps> = ({ match }) => {
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
    ShiftStatus: any;
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
    ShiftStatus: "",
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

  interface ChatData {
    IsRead: boolean;
    MessageAuthor: string;
    MessageBox: string;
    ShiftShiftId: number;
    UserActionTakenId: number;
    UserActionTakenUserId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
  }

  const [getShiftMessages, setGetShiftMessages] = useState<ChatData[]>([
    {
      IsRead: false,
      MessageAuthor: "",
      MessageBox: "",
      ShiftShiftId: 0,
      UserActionTakenId: 0,
      UserActionTakenUserId: 0,
      createdAt: "",
      id: 0,
      updatedAt: "",
    },
  ]);

  const fetchShiftMessages = () => {
    return axios
      .get(
        "http://localhost:3000/message/GetShiftMessages/" + match.params.id,
        {
          withCredentials: true,
        }
      )
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
    fetchShiftMessages().then((data) => setGetShiftMessages(data.shiftMessages));
  }, []);

  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchShiftMessages().then((data) =>
        setGetShiftMessages(data.shiftMessages)
      );
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    GetUser().then((data) => setProfile(data.personDataFound));
  }, [shiftDetails]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [getShiftMessages]);

  /////////////////////////
  //post a message
  const [sendMessage, setSendMessage] = useState<string>("");

  const postMessage = () => {
    const newNotificationRecord = {
      UserUserId_actor: profile.UserId,
      UserMessage: sendMessage,
      ShiftId: shiftDetails.ShiftId,
      SchedUserId: shiftDetails.UserUserId,
    };
    return axios
      .post("http://localhost:3000/message/PostShiftMessage", {
        newNotificationRecord,
        withCredentials: true,
      })
      .then(() => {
        setSendMessage("");
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle className="title2">Chat</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSegment
                  value="/ShiftChat"
                  onIonChange={(e: any) => {
                    window.location.href = "/ShiftDetails/" + match.params.id;
                  }}
                >
                  <IonSegmentButton value="/ShiftDetails">
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel>
                      <h2>Details</h2>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="/ShiftChat">
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
      </IonHeader>
      <IonContent>
       

        <IonRow>
          <IonCol className="searchBar">
            <IonList className="searchBar">
              {getShiftMessages.map((getShiftMessage) => (
                <IonItem key={getShiftMessage.id}>
                  <IonAvatar className="avatario" slot="start">
                    <img src={"../assets/profilePic.png"} />
                  </IonAvatar>
                  {/* <IonDatetime
                    slot="end"
                    displayFormat="THH:mm"
                    value={getShiftMessage.createdAt}
                  ></IonDatetime> */}
                  <IonLabel className="ion-text-wrap">
                    <p>{getShiftMessage.MessageAuthor}</p>
                    {getShiftMessage.MessageBox}
                  </IonLabel>
                  <br></br>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
        <div ref={bottomRef} />
      </IonContent>
      <IonItemDivider>Send Message</IonItemDivider>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              value={sendMessage}
              placeholder="Send Message..."
              onIonChange={(e) => setSendMessage(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol size="2">
          <IonButton type="submit" onClick={postMessage} fill="clear">
            <IonIcon size="large" icon={paperPlaneOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

export default ShiftChat;
