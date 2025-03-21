import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../context/CurrentUserContext";

function PostsPage({ message, filter = "" }) {
  // Ensure `next` is initialised
  const [posts, setPosts] = useState({ results: [], next: null }); 
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const searchQuery = query ? `search=${query}` : "";
        const { data } = await axiosReq.get(`/posts/?${filter}${searchQuery}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setHasLoaded(false);
    // No delay if query is empty
    const timer = setTimeout(fetchPosts, query ? 1000 : 0); 
    return () => clearTimeout(timer);
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div className="d-lg-none">
          <PopularProfiles mobile />
        </div>

        <div className={styles.SearchContainer}>
          <i className={`fas fa-search ${styles.SearchIcon}`} aria-hidden="true"></i>
          <Form
            className={styles.SearchBar}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Search posts"
          >
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search posts"
            />
          </Form>
        </div>

        {hasLoaded ? (
          posts.results.length > 0 ? (
            <InfiniteScroll
              dataLength={posts.results.length}
              next={() => fetchMoreData(posts, setPosts)}
              hasMore={!!posts.next}
              loader={<Asset spinner />}
            >
              {posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message || "No posts found."} />
            </Container>
          )
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
