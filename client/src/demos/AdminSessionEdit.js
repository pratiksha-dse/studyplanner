import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import SessionService from "../Services/SessionService";
import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import SessionDedicated from "components/features/SessionDedicated";
import SessionEdit from "components/features/SessionEdit";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const sessionID = props.location.search.slice(1);
  const [session, setSession] = useState(null);
  useEffect(() => {
    SessionService.getSessionByID(props.location.search.slice(1)).then((data) => {
      setSession(data.session);
      console.log(session);
    });
  }, []);

  // console.log(props.location.search.slice(1));
  // console.log(session);
  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          {/* <div id="session">
            <SessionDetails />
          </div> */}
          {/* <div id="addsession">
            <AddSessions />
          </div> */}
          <div id="sessiondedicated">
            <SessionDedicated session={session} />
          </div>
        
          <div id="editsession">
            <SessionEdit sessionOld={session} SEID={sessionID}/>
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
