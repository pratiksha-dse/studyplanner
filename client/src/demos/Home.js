import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import bg from "../images/bg.png";
const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {

  const unauthenticatedLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#login" />
          <div id="about">
            <MainFeature1
              subheading={<Subheading>About</Subheading>}
              heading="Study Planner Inc."
              buttonRounded={false}
              imageSrc={bg}
            />
          </div>
          {/* <div id="login">
          <LoginSignup />
        </div> */}
          <div id="letstalk">
            <LetUsTalk />
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };

  const page = () => {
    return unauthenticatedLP();
  };
  return <>{page()}</>;
};
