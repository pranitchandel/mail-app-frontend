import MailSection from "./MailSection";
import { createContext } from "react";

export const UserContext = createContext();

const UserPage = () => {
  return (
    <div className="mainSection">
      <MailSection />
    </div>
  );
};

export default UserPage;
