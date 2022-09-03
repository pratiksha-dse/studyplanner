import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import SessionService from "../Services/SessionService";
import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import SessionDedicated from "components/features/SessionDedicated";
import SessionEnroll from "components/features/SessionEnroll";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
// var ifEnroll=true;
export default (props) => {
  const {
    user,
    isAuthenticated,
  } = useContext(AuthContext);
  const sessionID = props.location.search.slice(1);
  const [session, setSession] = useState(null);
  useEffect(() => {
    SessionService.getSessionByID(sessionID).then((data) => {
      setSession(data.session);
      console.log(session);
      // if((data.session.currStudents).length>=data.session.maxStudents || data.session.currStudents.includes(user.email)){ifEnroll=false;}
      // console.log("if enroll",ifEnroll)
      // console.log(user)
    });
  }, []);
  const studentLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
         
          <div id="sessiondedicated">
            <SessionDedicated session={session} />
          </div>
        
          <div id="enrollsession">
       <SessionEnroll SEID={sessionID} user={user}/>
          </div>
         
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated) return studentLP();
  };
  return <>{page()}</>;
};
