import React, { Suspense } from "react";
import { ProfileCardPlaceholder, Spinner } from "./ui";
import { takeLongTimeApi } from "../utils/services";

const Profile = React.lazy( () => import ("./Profile") )


export default function Home(props) {
  const [isLoadingComplelte, setIsLoadingComplete] = React.useState(false);
  React.useEffect(() => {
     takeLongTimeApi()
     .then(()=> {
       setIsLoadingComplete(true);
     });
  });
  return (
    <>
    <h1>home</h1>;
      <div className="container-fluid row">
        {
          !isLoadingComplelte ?
          <div>
            <Spinner/>
          </div> :
          <div className="ProfileCard">
            <Suspense fallback={<ProfileCardPlaceholder/>}>
              <Profile/>         
            </Suspense>
          </div>
        }
      </div>
    </>
  )
}
