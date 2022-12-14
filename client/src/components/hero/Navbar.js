import React, { useContext, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { GoogleLogin } from "react-google-login";

import Header, {
  NavLink,
  NavLinks,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
  PrimaryLink as PrimaryLinkBase,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Navbar = (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState(null);
  const authContext = useContext(AuthContext);
  // console.log("navbar", user);
  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        console.log("logout", data)
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });
  };


  const unauthenticatedNavBar = () => {
    return (
      <>
        <NavLink href="#about">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#letstalk">Contact Us</NavLink>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <NavLink href="#about">Home</NavLink>
        <NavLink href="#sessions">Sessions</NavLink>
        <NavLink href="#letstalk">Contact Us</NavLink>

      </>
    );
  };
  const adminNavBar = () => {
    return (
      <>
        <NavLink href="#about">Home</NavLink>
        <NavLink href="#admin_session">Admin Sessions</NavLink>
      </>
    );
  };

  const navlinks = () => {
    if (!isAuthenticated) return unauthenticatedNavBar();
    else {
      if (isAdmin) return adminNavBar();
      else return authenticatedNavBar();
    }
  };
  const handleFailure1 = (result) => {
    alert("Login failed. Please try again later.");
    console.log(result);
  };
  const handleFailure2 = (result) => {
    alert("Register failed. Please try again later.");
    console.log(result);
  };
  const handleLogin = (result) => {
    AuthService.login({ token: result.tokenId }).then((data) => {
      console.log("login data", data);
      const { isAuthenticated, user, message, isAdmin } = data;
      console.log(user.email)
      AuthService.getUserByemail(user.email).then((data1) => {
        console.log("get user by mail", data1);
        if (data1.user) {
          if (data1.user.email === user.email) {
            if (isAuthenticated) {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              authContext.setIsAdmin(isAdmin);
              console.log("authenticated")
            } else {
              alert(message.msgBody);
              setMessage(message);
            }
          } else {
            alert("Please register before login.")
          }
        }
        else {
          alert("Please register before login.")
        }
      });
    });
  };
  const handleRegister = (result) => {
    AuthService.register({ token: result.tokenId }).then((data) => {
      console.log("register data", data);
      const { isAuthenticated, user, message, isAdmin } = data;
      AuthService.getUserByemail(user.email).then((data1) => {
        if (data1.user) {
          if (!(data1.user.email === user.email) || user.email === "b20165@students.iitmandi.ac.in") {
            if (isAuthenticated) {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              authContext.setIsAdmin(isAdmin);
              alert("User registered successfully")
            } else {
              console.log(message.msgBody)
              setMessage(message);
              console.log(data)
            }
          } else {
            alert("User already registered.")
            console.log("user already registered")
          }
        }else{
          if (isAuthenticated) {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            authContext.setIsAdmin(isAdmin);
            alert("User registered successfully")
          } else {
            console.log(message.msgBody)
            setMessage(message);
            console.log(data)
          }
        }
      });
    });
  };
  const navLinks = [
    <NavLinks key={1}> {navlinks()}</NavLinks>,
    <NavLinks key={2}>
      {/* <SocialLinksContainer> */}
      {/* <SocialLink href="https://facebook.com" target={"_blank"}>
          <FacebookIcon />
        </SocialLink> */}
      {/* <SocialLink href="https://twitter.com" target={"_blank"}>
          <TwitterIcon />
        </SocialLink> */}
      {/* <SocialLink
          href="https://www.youtube.com/channel/UCSmPXl_J3u9AmRUyveXptPw/featured"
          target={"_blank"}
        >
          <YoutubeIcon />
        </SocialLink>
        <SocialLink
          href="https://instagram.com/capibulladvisors?utm_medium=copy_link"
          target={"_blank"}
        >
          <InstagramIcon />
        </SocialLink>
        <SocialLink href="https://discord.gg/F6r2DYd6Z6"  target={"_blank"}> 
          <DiscordIcon />
        </SocialLink>
      </SocialLinksContainer> */}
      {isAuthenticated ? (
        <button>
          <PrimaryLink onClick={onClickLogoutHandler} href="/#">
            Logout
          </PrimaryLink>
        </button>
      ) : (
        <GoogleLogin
          render={(renderProps) => (
            <button>
              <PrimaryLink
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </PrimaryLink>
            </button>

          )}
          clientId="373151948151-5k1he8abmr2a1ok10g07c9phkmjld2jk.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure1}
          cookiePolicy={"single_host_origin"}
        />

      )}
      {isAuthenticated ? (
        null
      ) : (

        <GoogleLogin
          render={(renderProps) => (
            <button>
              <PrimaryLink
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Register
              </PrimaryLink>
            </button>
          )}
          clientId="373151948151-5k1he8abmr2a1ok10g07c9phkmjld2jk.apps.googleusercontent.com"
          buttonText="Register with Google"
          onSuccess={handleRegister}
          onFailure={handleFailure2}
          cookiePolicy={"single_host_origin"}
        />

      )}
    </NavLinks>,
  ];

  return <StyledHeader links={navLinks} />;
};

export default Navbar;
