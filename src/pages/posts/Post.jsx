import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/Avatar";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [error, setError] = useState(null);

  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post(`/likes/`, { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to like post. Please try again.");
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to unlike post. Please try again.");
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="mb-3">
          <Link
            to={`/profiles/${profile_id}`}
            className="d-flex align-items-center"
          >
            <Avatar src={profile_image} height={55} />
            <span className="ms-2">{owner}</span>
          </Link>
          <div className="ms-auto d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && " ..."}
          </div>
        </Stack>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img alt={title} src={image} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content?.trim() && <Card.Text>{content}</Card.Text>}
        {error && <div className="text-danger mt-2">{error}</div>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <button
              className={`btn p-0 border-0 bg-transparent ${styles.Heart}`}
              aria-label="Unlike post"
              onClick={handleUnlike}
            >
              <i className="fas fa-heart" />
            </button>
          ) : currentUser ? (
            <button
              className={`btn p-0 border-0 bg-transparent ${styles.HeartOutline}`}
              aria-label="Like post"
              onClick={handleLike}
            >
              <i className="far fa-heart" />
            </button>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
