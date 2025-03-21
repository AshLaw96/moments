import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useNavigate } from "react-router-dom";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <button className="btn btn-link p-0 border-0" ref={ref} onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}
  aria-label="More options">
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  </button>
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const DropdownItem = ({ icon, text, onClick, ariaLabel }) => (
  <Dropdown.Item onClick={onClick} aria-label={ariaLabel}>
    <i className={icon} /> {text}
  </Dropdown.Item>
);

export function ProfileEditDropdown({ id }) {
  const navigate = useNavigate();

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <DropdownItem
          icon="fas fa-edit"
          text="edit profile"
          onClick={() => navigate(`/profiles/${id}/edit`)}
          ariaLabel="edit-profile"
        />
        <DropdownItem
          icon="far fa-id-card"
          text="change username"
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          ariaLabel="edit-username"
        />
        <DropdownItem
          icon="fas fa-key"
          text="change password"
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          ariaLabel="edit-password"
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
