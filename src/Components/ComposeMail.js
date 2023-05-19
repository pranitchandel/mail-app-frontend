import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAccountList } from "../redux/actions/loginActionData";
import { request } from "../services/request";
import { updateActiveUserList } from "./Utils/Utils";

const ComposeMail = ({ setShowCompose, showCompose }) => {
  const { id: userId, section } = useParams();
  const { accountList, token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    toUserId: null,
    email: "",
    title: "",
    message: "",
  });

  const [err, setErr] = useState("");
  const handleChange = (e) => {
    if (err !== "") {
      setErr("");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.email === "") {
      setErr("Please specify recipient");
      return;
    }

    let tempForm = {};
    const userToken = await token.find((tk) => {
      return tk.userId === userId;
    });

    request({
      url: `/api/users/email/${formData.email}`,
      method: "GET",
      token: userToken.token,
    })
      .then((res) => {
        tempForm = { ...formData, toUserId: res.data._id };
        request({
          url: `/api/messages/addMessage`,
          method: "POST",
          token: userToken.token,
          data: {
            message: tempForm.message,
            title: tempForm.title,
            toUserId: tempForm.toUserId,
          },
        })
          .then((res) => {
            setShowCompose((prev) => !prev);
            updateActiveUserList(token).then((decodedResult) => {
              dispatch(setAccountList(decodedResult));
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => setErr(err.response?.data?.msg));
  };

  const handleCompose = () => {
    setShowCompose((prev) => !prev);
  };

  return (
    <div className="composeDiv">
      <div className="composeTopBar">
        New Message{" "}
        <button className="closeBtn" onClick={handleCompose}>
          <CloseIcon />
        </button>
      </div>
      <div className="composeInputs">
        <input
          type="email"
          name="email"
          placeholder="To"
          onChange={handleChange}
        />
        {err && <p className="composeError">{err}</p>}
      </div>
      <div className="composeInputs">
        <input type="email" placeholder="Cc / Bcc" onChange={handleChange} />
      </div>
      <div className="composeInputs">
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
          rows="70"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} className="sendButton">
        Send
      </button>
    </div>
  );
};

export default ComposeMail;
