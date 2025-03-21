import React from "react";
import styles from "../styles/Avatar.module.css";

export const Avatar = ({ src, height = 45, text }) => {
  const defaultAvatar = "/path/to/default-avatar.png";
  return (
    <div className={styles.AvatarWrapper}>
      <img
        className={styles.Avatar}
        src={src || defaultAvatar}
        alt="avatar"
        height={height}
        width={height}
        onError={(e) => (
          e.target.src = defaultAvatar)}
      />
      {text && <span className={styles.AvatarText}>{text}</span>}
    </div>
  );
};
