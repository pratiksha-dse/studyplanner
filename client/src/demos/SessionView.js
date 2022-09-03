import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import SessionService from "../Services/SessionService";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import SessionDedicated from "components/features/SessionDedicated";

// const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext);
  const sessionID = props.location.search.slice(1);
  const [session, setSession] = useState(null);
  useEffect(() => {
    SessionService.getSessionByID(sessionID).then((data) => {
      setSession(data.session);
      console.log(session);
    });
  }, []);

  // console.log(props.location.search.slice(1));
  // console.log(session);
  const studentLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
        
          <div id="sessiondedicated">
            <SessionDedicated session={session} />
          </div>
        
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && !isAdmin) return studentLP();
  };
  return <>{page()}</>;
};
