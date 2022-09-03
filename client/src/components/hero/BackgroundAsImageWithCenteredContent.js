import React from "react";
import { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Navbar from "./Navbar";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { Subheading as SubheadingBase } from "components/misc/Headings.js";

const Container = styled.div`
  ${tw`relative -m-8 bg-center bg-cover py-2 -mt-16`}
  background-image: url("https://user-images.githubusercontent.com/83131033/155858036-2411c176-6357-46c8-87e8-9d283f150ae0.png");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;
const Subheading = tw(
  SubheadingBase
)`text-center text-gray-100 px-8 py-3 mt-5 text-lg`;


export default (props) => {
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <Navbar />
      </HeroContainer>
    </Container>
  );
};
