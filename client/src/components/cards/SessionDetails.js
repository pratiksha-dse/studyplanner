import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
// import UserdetailsService from "../../Services/UserdetailsService";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";

import SessionService from "../../Services/SessionService";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as RecIcon } from "feather-icons/dist/icons/film.svg";
import { ReactComponent as SessIcon } from "feather-icons/dist/icons/external-link.svg";
import { AuthContext } from "../../Context/AuthContext";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-2.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-5.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-16`;
const TabContent = tw(
  motion.div
)`grid grid-cols-1 gap-3 lg:grid-cols-2 grid-flow-row mt-6 rounded-b mx-auto sm:max-w-none sm:mx-0 items-center`;
const FormContainer = tw.div`w-full mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// const HeadingWithControl = tw(SectionHeading)`flex flex-col items-center sm:flex-row place-self-center w-full`;
const HeaderContent = tw.div``;
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
// const PrevButton = tw(ControlButton)``;
// const NextButton = tw(ControlButton)``;

// const CardSlider = styled(Slider)`
//   ${tw`mt-16`}
//   .slick-track {
//     ${tw`flex`}
//   }
//   .slick-slide {
//     ${tw`h-auto flex justify-center mb-1`}
//   }
// `;
const Card = tw.div`border border-gray-400 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-2xl focus:outline-none mx-8 my-8 bg-gray-100`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-72 w-72 opacity-15 transform translate-x-2/3 -translate-y-12 text-primary-500`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-72 w-72 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-2xl sm:rounded-tr-2xl`,
]);

const TextInfo = tw.div`py-6 px-10 py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-2xl sm:rounded-bl-2xl py-3 sm:py-6`;

export default (props) => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [query, setQuery] = useState("");
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const {
    isAdmin,
    user,
  } = useContext(AuthContext);

  // const [users, setUserdetails] = useState([]);
  // useEffect(() => {
  //   UserdetailsService.getUserdetails().then((data) => {
  //     setUserdetails(data.users.reverse());
  //     console.log(users);
  //   });
  // }, []);
  const [sessions, setSessions] = useState( []);
  useEffect(() => {
    SessionService.getSessions().then((data) => {
      setSessions(data.sessions.reverse());
      console.log(sessions);
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const searchBar = () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Input
            type="search"
            name="search"
            onChange={onChange}
            value={query}
            placeholder="Search Name"
          />
        </Form>
      </FormContainer>
    );
  };
  return (
    <Container>
      <Content>
        <HeaderContent>
          <Subheading>Study Planner</Subheading>
          <Heading>Sessions</Heading>
        </HeaderContent>
        {searchBar()}
        <TabContent>
          <DecoratorBlob1 />
          <DecoratorBlob2 />
          {sessions.map((session, index) => {
            if (session.title.match(query)) {
              // console.log(isAdmin?("#/admin_session_edit?" + session._id):("#/session?" + session._id));

              return (
                <Card key={index}>
                  <CardImage imageSrc={session.img} />
                  <TextInfo>
                    <TitleReviewContainer>
                      <Title>{session.title}</Title>
                  
                    </TitleReviewContainer>
                    <SecondaryInfoContainer>
                      <IconWithText>
                        <IconContainer>
                          <DateIcon />
                        </IconContainer>
                        <Text>Start Date: {session.startDate}</Text>
                      </IconWithText>
                      <IconWithText>
                        <IconContainer>
                          <TimeIcon />
                        </IconContainer>
                        <Text>Start Time: {session.startTime}</Text>
                      </IconWithText>
                    </SecondaryInfoContainer>
                    <SecondaryInfoContainer>
                      <IconWithText>
                        <IconContainer>
                          <SessIcon />
                        </IconContainer>
                    <Text>Maximum students: {session.maxStudents}</Text>
                      </IconWithText>
                      <IconWithText>
                        <IconContainer>
                          <RecIcon />
                          </IconContainer>
                    <Text>Current Students: {session.currStudents.length}</Text>
                      </IconWithText>
                    </SecondaryInfoContainer>
                    {/* <Description>{session.description}</Description> */}
                    
                  </TextInfo>
                  
                  <a href={isAdmin?("#/admin_session_edit?" + session._id):(session.currStudents.includes(user.email) || (session.currStudents).length==session.maxStudents)
     ?("#/session?" + session._id):("#/enroll_session?"+session._id)}>
                   <PrimaryButton>{isAdmin?"Update Session":(
                    (session.currStudents).length==session.maxStudents?
                    (session.currStudents.includes(user.email)?"Enrolled & Max Limit Exceeded":"Limit Exceeded"):
                    (session.currStudents.includes(user.email)?"Enrolled":"Enroll Now")
                    )}</PrimaryButton>
                  </a> 
                 
                </Card>
              );
            } else {
              return <></>;
            }
          })}
        </TabContent>
      </Content>
    </Container>
  );
};
