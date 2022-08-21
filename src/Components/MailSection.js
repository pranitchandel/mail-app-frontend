import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { UserContext } from "./UserPage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading";
import axios from "axios";
import MailPage from "./MailPage";

export const MessageContext = createContext();

const MailSection = ({ mailCategory, refresh, setCurrentUser }) => {
  const navigate = useNavigate();
  const rootUrl = "http://localhost:5000";
  const [mailResponseArray, setMailResponseArray] = useState([]);
  const [currentMailSection, setCurrentMailSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentMail, setCurrentMail] = useState({});
  const {
    userName,
    email,
    inboxList,
    markedRead,
    sentList,
    starredList,
    draftList,
  } = useContext(UserContext).user;

  const params = useParams();
  const mailArray = useCallback(async () => {
    setLoading(true);
    let response = {};
    let category = [];
    if (mailCategory === "inbox") {
      category = inboxList;
    }
    if (mailCategory === "sent") {
      category = sentList;
    }
    if (mailCategory === "draft") {
      category = draftList;
    }
    if (category !== undefined && category.length > 0) {
      response = await Promise.all(
        category.map(async (mail) => {
          const res = await axios.get(`${rootUrl}/api/messages/${mail}`);
          const fromRes = await axios.get(
            `${rootUrl}/api/users/userId/${res.data.fromUserId}`
          );
          const toRes = await axios.get(
            `${rootUrl}/api/users/userId/${res.data.toUserId}`
          );
          const updatedRes = {
            fromName: fromRes.data.userName,
            message: res.data.message,
            title: res.data.title,
            timeStamp: res.data.timeStamp,
            inboxStarred: res.data.inboxStarred,
            sentStarred: res.data.sendStarred,
            messageId: res.data._id,
            toName: toRes.data.userName,
            toEmail: toRes.data.email,
            fromEmail: fromRes.data.email,
          };
          return updatedRes;
        })
      );
    }
    setMailResponseArray(response);
    setLoading(false);
    return response;
  }, [mailCategory, inboxList, draftList, sentList]);

  const mailSection = (
    <>
      <strong className="mailCategory">{mailCategory} </strong>
      <table className="mailSectionContainer">
        <tbody>
          {!loading && mailResponseArray.length > 0 ? (
            mailResponseArray.map((mail, key) => (
              <tr key={key} onClick={() => handleMailClick(mail)}>
                <td className="mail star">
                  {(mailCategory === "inbox" && mail.inboxStarred) ||
                  (mailCategory === "sent" && mail.sentStarred) ? (
                    <StarIcon />
                  ) : (
                    <StarBorderIcon />
                  )}
                </td>
                <td className="mail sender">{mail.fromName}</td>
                <td className="mail body">
                  {mail.title}-{mail.message}
                </td>
                <td className="mail time">
                  {new Date(mail.timeStamp).toLocaleString()}
                </td>
              </tr>
            ))
          ) : loading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : (
            "empty"
          )}
        </tbody>
      </table>
    </>
  );
  useEffect(() => {
    mailArray();
  }, [mailArray, inboxList, draftList, sentList, refresh]);

  const handleMailClick = (mail) => {
    console.log(mail);
    console.log(params);
    setCurrentMailSection(true);
    setCurrentMail(mail);
    navigate(`/user/${params.id}/mail/${mail.messageId}`);
  };
  return (
    <div className="mailContainer">
      <MessageContext.Provider value={currentMail}>
        {!currentMailSection ? mailSection : <MailPage />}
      </MessageContext.Provider>
    </div>
  );
};

export default MailSection;
