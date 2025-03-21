import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import { Avatar } from "../../components/Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";
import { axiosReq } from "../../api/axiosDefaults";

export const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/comments/${id}/`);
      setPost &&
        setPost((prevPost) => ({
          results: [
            {
              ...prevPost.results[0],
              comments_count: prevPost.results[0].comments_count - 1,
            },
          ],
        }));
      setComments &&
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
    } catch (err) {
      console.log("Error deleting comment:", err);
    }
  };

  return (
    <React.Fragment>
      <hr />
      <Row className="align-items-center">
        <Col xs="auto">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} alt={`${owner}'s profile picture`} />
          </Link>
        </Col>
        <Col>
          <div className="d-flex flex-column">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{new Date(updated_at).toLocaleDateString()}</span>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
        </Col>
        {is_owner && !showEditForm && (
          <Col xs="auto">
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};
