import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useSetProfileData } from "../../context/ProfileDataContext";

export const Profile = ({ profile, mobile, imageSize = 55 }) => {
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile ? "flex-column text-center" : "justify-content-between w-100"}`}
    >
      <Link className="align-items-center" to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize} />
      </Link>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      {currentUser && !is_owner && (
        <Button
          className={`${btnStyles.Button} ${following_id ? btnStyles.BlackOutline : btnStyles.Black}`}
          onClick={() => (following_id ? handleUnfollow(profile) : handleFollow(profile))}
        >
          {following_id ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};
