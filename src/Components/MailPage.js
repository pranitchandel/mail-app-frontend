import { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MailSection";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../services/request";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const MailPage = () => {
  const { id: userId, mailId } = useParams();

  const { token, accountList } = useSelector((state) => state.login);
  const [mailInfo, setMailInfo] = useState({});
  const [loader, setLoader] = useState(false);

  const getMailInfo = async () => {
    setLoader(true);
    const userToken = token.find((tk) => tk.userId === userId);
    const res = await request({
      url: `/api/messages/${mailId}`,
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

    const mailInfo = {
      title: res.data.title,
      fromEmail: fromRes.data.email,
      fromusername: fromRes.data.userName,
      toEmail: toRes.data.email,
      toUsername: toRes.data.userName,
      timeStamp: res.data.timeStamp,
      message: res.data.message,
    };

    setMailInfo(mailInfo);
    setLoader(false);
  };

  useEffect(() => {
    getMailInfo();
  }, []);

  return (
    <div className="mailPageContainer">
      {loader ? (
        <Loading />
      ) : (
        <div className="mailPage">
          <div className="mailTitle">{mailInfo?.title}</div>

          <div className="mailAddress">
            <div className="fromAddress">
              <div className="fromUsername">{mailInfo?.fromusername}</div>
              <div className="fromEmail">&lt;{mailInfo?.fromEmail}&gt;</div>
            </div>
            <div className="mailTimeStamp">
              {new Date(mailInfo?.timeStamp).toLocaleString()}
            </div>
          </div>
          <div>
            <span className="toEmail">
              to &nbsp; &lt;{mailInfo?.toEmail}&gt;
            </span>
          </div>
          <p className="mailMessage">{mailInfo?.message}</p>
        </div>
      )}
    </div>
  );
};

export default MailPage;
