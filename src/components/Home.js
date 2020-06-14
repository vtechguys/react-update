import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Spinner, Card } from "./ui";
import { takeLongTimeApi } from "../utils/services";
import { UserContext } from "../utils/context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import CameraIcon from "../assets/camera.svg";
import WriteIcon from "../assets/write.svg";
import FileIcon from "../assets/file.svg";
import ApperatureIcon from "../assets/apperature.svg";

const SidebarLeft = React.lazy(() => import("./SidebarLeft"));

export default function Home(props) {
  const { user } = React.useContext(UserContext);
  const [isFeedsLoadingComplete, setIsFeedLoadingComplete] = React.useState(
    false
  );
  React.useEffect(() => {
    takeLongTimeApi().then(() => {
      setIsFeedLoadingComplete(true);
    });
  });
  if (user && user.isAuthenticated) {
    return (
      <div className="container-fluid row justify_sbw">
        <div className="SidebarLeftContainer">
          <Suspense fallback={<Spinner/>}>
            <SidebarLeft />
          </Suspense>
        </div>
        <div className="column FeedsContainer">
          <Card className="container-fluid column justify_center align_center CreatePostFeed ">
            <div className="container-fluid row " id="WriteInputOptions">
              <div
                className="WriteOptions row  align_center pl8"
                id="StartPost"
              >
                <img src={WriteIcon} className="icon " alt="Start a post" />
                <span>Start a post</span>
              </div>
              <div className="WriteOptions  row justify_center align_center">
                <img src={CameraIcon} className="icon" alt="Camera" />
              </div>
              <div className="WriteOptions row justify_center align_center">
                <img src={ApperatureIcon} className="icon" alt="Camera" />
              </div>
              <div className="WriteOptions row justify_center align_center">
                <img src={FileIcon} className="icon" alt="Camera" />
              </div>
            </div>
            <div
              className="container-fluid row align_center p8"
              id="WriteArticle"
            >
              <Link to="/article/write-new" className="font-avg">
                Write New article
              </Link>
            </div>
          </Card>
          <div className="container-fluid divider mt20 mb20" />
          <div className="column ListFeedContainer">
            {!isFeedsLoadingComplete ? <Spinner /> : <p>feed</p>}
          </div>
        </div>
        <div className="SidebarRightContainer"></div>
      </div>
    );
  }
  return <Redirect to="/auth/login" />;
}
