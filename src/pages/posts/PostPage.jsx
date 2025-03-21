import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Comment } from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  // Ensure `next` is initialised
  const [comments, setComments] = useState({ results: [], next: null }); 
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.error("Error fetching post or comments:", err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div className="d-lg-none">
          <p className="text-center text-muted">Popular profiles for mobile</p>
        </div>

        {post.results.length > 0 ? (
          <Post {...post.results[0]} setPosts={setPost} postPage />
        ) : (
          <Asset spinner />
        )}

        <Container className={appStyles.Content}>
          {currentUser && (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              post={id}
              setPost={setPost}
              setComments={setComments}
              profileImage={profile_image}
            />
          )}

          {comments.results.length > 0 ? (
            <>
              <p>Comments</p>
              <InfiniteScroll
                dataLength={comments.results.length}
                next={() => fetchMoreData(comments, setComments)}
                hasMore={!!comments.next}
                loader={<Asset spinner />}
              >
                {comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <p>{currentUser ? "No comments yet, be the first to comment!" : "No comments... yet"}</p>
          )}
        </Container>
      </Col>

      <Col lg={4} className="d-none d-lg-block p-2">
        <p className="text-center text-muted">Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostPage;
