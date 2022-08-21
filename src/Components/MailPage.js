import { useContext, useEffect } from "react";
import { MessageContext } from "./MailSection";
import { useNavigate, useParams } from "react-router-dom";

const MailPage = () => {
  const {
    title,
    toName,
    toEmail,
    fromEmail,
    fromName,
    timeStamp,
    sentStarred,
    message,
    inboxStarred,
  } = useContext(MessageContext);
  const navigate = useNavigate();

  return (
    <div className="mailPage">
      <div className="mailAddress">
        <p>
          <span className="mailTitle">{title}</span> <span>{fromEmail}</span>
        </p>
      </div>
      <div>
        to <span>{toEmail}</span>
      </div>
      <div className="mailTimeStamp">
        {new Date(timeStamp).toLocaleString()}
      </div>
      <p className="mailMessage">{message}</p>
    </div>
  );
};

export default MailPage;
