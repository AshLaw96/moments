import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import { Avatar } from "./Avatar";
import axios from "axios";
import { useClickOutsideToggle } from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      removeTokenTimestamp();
      setCurrentUser(null);
    } catch (err) {
      // console.error("Logout failed:", err);
    }
  };
  const addPostIcon = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.NavLinkActive : styles.NavLink
        }
        to="/posts/create"
      >
        <i className="far fa-plus-square"></i>Add post
      </NavLink>
    </>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.NavLinkActive : styles.NavLink
        }
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.NavLinkActive : styles.NavLink
        }
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.NavLinkActive : styles.NavLink
        }
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.NavLinkActive : styles.NavLink
        }
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.NavLinkActive : styles.NavLink
              }
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
