import { useContext, useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate, useParams } from "react-router-dom";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import OutboxIcon from "@mui/icons-material/Outbox";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "./UserPage";
import axios from "axios";
const NavBar = ({ setMailCategory, setRefresh, setCurrentUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    toUserId: null,
    email: "",
    title: "",
    message: "",
  });

  const currentParam = useParams();
  const [err, setErr] = useState("");
  const rootUrl = "https://mail-app-backend.onrender.com";
  const {
    userName,
    email,
    inboxList,
    markedRead,
    sentList,
    starredList,
    draftList,
  } = useContext(UserContext).user;

  useEffect(() => {
    document.getElementById("composeBox").style.display = "none";
  }, []);

  const handleMailCategory = (category) => {
    setMailCategory(category);
  };

  const handleComposeClose = () => {
    document.getElementById("composeBox").style.display = "none";
  };
  const handleCompose = () => {
    document.getElementById("composeBox").style.display = "block";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.email === "") {
      setErr("Please specify recipient");
      return;
    }
    setErr("");

    let tempForm = {};
    axios
      .get(`${rootUrl}/api/users/email/${formData.email}`)
      .then((res) => {
        console.log(formData);
        tempForm = { ...formData, toUserId: res.data._id };
        axios
          .post(`${rootUrl}/api/messages/addMessage`, {
            message: tempForm.message,
            title: tempForm.title,
            toUserId: tempForm.toUserId,
          })
          .then((res) => {
            console.log(currentParam);
            const user = { _id: currentParam.id };
            setCurrentUser(user);
            setRefresh(true);
            navigate(`/user/${currentParam.id}`);
            setMailCategory("sent");
            handleComposeClose();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleRefresh = () => {
    setRefresh((refresh) => ({
      refresh: true,
    }));
  };
  return (
    <div className="navContainer">
      <button className="composeButton" onClick={handleCompose}>
        <EditIcon />
        <span>Compose</span>
      </button>
      <nav>
        <ul>
          <li onClick={() => handleMailCategory("inbox")}>
            <InboxIcon />
            <span>Inbox </span>
            <span>{inboxList ? inboxList.length : "0"}</span>
          </li>
          <li onClick={() => handleMailCategory("sent")}>
            <OutboxIcon />
            <span>Sent </span>
            <span>{sentList ? sentList.length : "0"}</span>
          </li>
          <li onClick={() => handleMailCategory("draft")}>
            <DraftsIcon />
            <span>Draft</span>
            <span> {draftList ? draftList.length : "0"}</span>
          </li>
        </ul>
      </nav>
      <div className="composeDiv" id="composeBox">
        <div className="composeTopBar">
          New Message{" "}
          <button className="closeBtn" onClick={handleComposeClose}>
            <CloseIcon />
          </button>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="To"
            onChange={handleChange}
          />
          <p className="composeError">{err}</p>
        </div>
        <div>
          <input type="email" placeholder="Cc / Bcc" onChange={handleChange} />
        </div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Subject"
            onChange={handleChange}
          />
        </div>
        <div className="message">
          <textarea
            name="message"
            id="message"
            cols="60"
            rows="50"
            onChange={handleChange}
          />
        </div>

        <div className="sendButton">
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
