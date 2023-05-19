import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading";
import { useSelector } from "react-redux";
import { request } from "../services/request";

const MailSection = () => {
  const navigate = useNavigate();
  const { accountList, token } = useSelector((state) => state.login);
  const { id: userId, section } = useParams();
  const [mailResponseArray, setMailResponseArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  const params = useParams();
  const mailArray = useCallback(async () => {
    setLoading(true);
    let response = {};
    let category = [];

    if (section === "inbox") {
      category = user.inboxList;
    }
    if (section === "sent") {
      category = user.sentList;
    }
    if (section === "draft") {
      category = user.draftList;
    }

    if (category !== undefined && category.length > 0) {
      response = await Promise.all(
        category.map(async (mail) => {
          const userToken = token.find((tk) => tk.userId === userId);
          const res = await request({
            url: `/api/messages/${mail}`,
            token: userToken.token,
          });
          const fromRes = await request({
            url: `/api/users/userId/${res.data.fromUserId}`,
            token: userToken.token,
          });
          const toRes = await request({
            url: `/api/users/userId/${res.data.toUserId}`,
            token: userToken.token,
          });

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
  }, [user, section, accountList]);

  const mailItem = ({ mail }) => {
    return (
      <tr
      // onClick={() => handleMailClick(mail)}
      >
        <td
          className="mail star"
          // onClick={(e) => handleStarred(e, mail)}
        >
          {(section === "inbox" && mail.inboxStarred) ||
          (section === "sent" && mail.sentStarred) ? (
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
    );
  };

  const MemoizedMailItem = memo(mailItem);

  const handleStarred = (e, mail) => {
    e.stopPropagation();
    if (user.starred.includes(mail.messageId)) {
    }
  };

  const mailSection = (
    <>
      {mailResponseArray.length > 0 ? (
        <table className="mailSectionContainer">
          <tbody>
            {mailResponseArray.map((mail, key) => (
              <MemoizedMailItem mail={mail} key={key} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="emptyMessages">No messages</div>
      )}
    </>
  );

  useEffect(() => {
    if (token.length === 0) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const currentUser = accountList.filter((acc) => acc._id === userId)[0];
    setUser(currentUser);
    mailArray();
  }, [user, accountList, section]);

  const handleMailClick = (mail) => {
    navigate(`/user/${params.id}/mail/${mail.messageId}`);
  };
  return (
    <div className="mailContainer">{loading ? <Loading /> : mailSection}</div>
  );
};

export default MailSection;
