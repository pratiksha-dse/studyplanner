import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import AddSessions from "components/features/AddSessions.js";
import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const {
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext);

  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          
          <div id="addsessions">
            <AddSessions />
          </div>
         
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    console.log(isAdmin);
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
