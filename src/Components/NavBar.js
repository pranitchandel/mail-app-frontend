import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import OutboxIcon from "@mui/icons-material/Outbox";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import ComposeMail from "./ComposeMail";

const NavBar = () => {
  const navigate = useNavigate();
  const [showCompose, setShowCompose] = useState(false);
  const { id: userId, section } = useParams();
  const { accountList, token } = useSelector((state) => state.login);

  const [user, setUser] = useState({});

  const tempMemo = useMemo(() => {
    return accountList.filter((acc) => acc._id === userId)[0];
  }, [accountList]);

  useEffect(() => {
    setUser(tempMemo);
  }, [accountList]);

  const handleMailCategory = (category) => {
    navigate(`/user/${userId}/${category}`);
  };

  return (
    <div className="navContainer">
      <button
        className="composeButton"
        onClick={() => {
          setShowCompose((prev) => !prev);
        }}
      >
        <EditIcon />
        <span>Compose</span>
      </button>
      {userId !== "" && accountList.length > 0 && (
        <nav>
          <ul>
            <li
              onClick={() => handleMailCategory("inbox")}
              className={section == "inbox" ? "activeSection" : "inactive"}
            >
              <InboxIcon />
              <span className="sectionHeading">Inbox</span>
              <span>{user?.inboxList ? user.inboxList.length : "0"}</span>
            </li>
            <li
              onClick={() => handleMailCategory("sent")}
              className={section == "sent" ? "activeSection" : "inactive"}
            >
              <OutboxIcon />
              <span className="sectionHeading">Sent</span>
              <span>{user?.sentList ? user.sentList.length : "0"}</span>
            </li>
            <li
              onClick={() => handleMailCategory("draft")}
              className={section == "draft" ? "activeSection" : "inactive"}
            >
              <DraftsIcon />
              <span className="sectionHeading">Draft</span>
              <span>{user?.draftList ? user.draftList.length : "0"}</span>
            </li>
          </ul>
        </nav>
      )}

      {showCompose && <ComposeMail setShowCompose={setShowCompose} />}
    </div>
  );
};

export default NavBar;
