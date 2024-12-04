import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatContent } from "../../utils";
import styles from "./Home.module.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    fetch(import.meta.env.VITE_API_URL + "/posts")
      .then((res) => res.json())
      .then((response) => {
        if (isActive) {
          setPosts(
            response.posts.map((post) => {
              return { ...post, date_published: new Date(post.date_published) };
            }),
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setPosts(err);
      });

    return () => (isActive = false);
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Welcome to my blog!</h1>
      <p className={styles.paragraph}>
        Hello, my name is T0nci, and I am a dedicated full-stack web developer
        with a passion for continuous learning and growth within the
        ever-evolving tech industry. Through my work, I strive to provide
        valuable insights and share effective strategies that can help aspiring
        developers enhance their skills. My goal with this blog is to equip you
        with the knowledge, tools, and exclusive techniques that will guide you
        toward mastering the art of web development. Whether you&apos;re just
        starting your journey or looking to refine your expertise, you will find
        a new piece of knowledge or a useful tip with every step you take here.
      </p>
      {posts instanceof Error ? (
        <p className={styles.error}>Error loading posts</p>
      ) : posts === null ? (
        <div className={styles.loading}>
          <div className={styles.box}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          Loading posts
        </div>
      ) : posts.length > 0 ? (
        <ul className={styles.cards}>
          {posts.map((post) => (
            <li key={post.id}>
              <button
                onClick={() => navigate(`/posts/${post.id}`)}
                className={styles.card}
              >
                <p className={styles.title}>{post.title}</p>
                <p className={styles.content}>{formatContent(post.content)}</p>
                <p className={styles.date}>{formatDate(post.date_published)}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No blogs published yet.</p>
      )}
    </>
  );
};

export default Home;
