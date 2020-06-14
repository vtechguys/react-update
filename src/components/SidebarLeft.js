import React from "react";
import "./SidebarLeft.css";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";
import { Card, ProfilePic } from "./ui";
function SidebarLeft() {
  const { user } = React.useContext(UserContext);
  return (
    <div className="container-fluid column">
      <Card className="container-fluid p8">
        <div className="container-fluid column align_center">
          <div className="container column">
            <ProfilePic image={user.image} link={"/users/" + user.username} username={user.username}/>
            <div className="container-fluid column m8">
              <div className="container-fluid column BioAndInfo">
                <p className="Welcome font-avg">Welcome! {user.username}</p>
                <p className="Bio font-small">
                  Software Engg. Intern Blusmart
                </p>
              </div>
              <div className="container-fluid row justify_sbw">
                <Link
                  to={"/users/followers?user=" + user.username}
                  className="font-small"
                >
                  Followers {user.followers}
                </Link>
                <Link
                  to={"/users/following?user=" + user.username}
                  className="font-small"
                >
                  Following {user.following}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default SidebarLeft;
