import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Blog.module.css";
import { formatDate } from "../../utils";

const Blog = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    value: "",
    pending: false,
    errors: [],
  });

  const { postId } = useParams();
  const { displayName, setDisplayName } = useOutletContext();

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      try {
        const postResponse = await fetch(
          import.meta.env.VITE_API_URL + `/posts/${postId}`,
        );
        const commentResponse = await fetch(
          import.meta.env.VITE_API_URL + `/posts/${postId}/comments`,
        );

        const postJson = await postResponse.json();
        const commentsJson = await commentResponse.json();

        if (!isActive) return;

        setPost({
          ...postJson.post,
          comments: commentsJson.comments
            .map((comment) => ({
              ...comment,
              date: new Date(comment.date),
            }))
            .sort((a, b) => b.date - a.date),
        });
      } catch (error) {
        console.error(error);
        setPost(error);
      }
    };
    fetchData();

    return () => {
      isActive = false;
    };
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComment({ ...comment, pending: true });

    try {
      const fetched = await fetch(
        import.meta.env.VITE_API_URL + `/posts/${postId}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ comment: comment.value }),
          method: "POST",
        },
      );

      const response = await fetched.json();

      if (response.error === "401") {
        localStorage.clear("token");
        localStorage.clear("displayName");
        setDisplayName(null);
      } else if (response.error)
        setComment((prevComment) => ({
          ...prevComment,
          errors: [{ msg: "Post Not Found." }],
        }));
      else if (response.errors)
        setComment((prevComment) => ({
          ...prevComment,
          errors: response.errors,
        }));
      else if (response.comment) {
        response.comment.date = new Date(response.comment.date);
        setPost({ ...post, comments: [response.comment, ...post.comments] });
        setComment((prevComment) => ({
          ...prevComment,
          value: "",
          errors: [],
        }));
      } else
        setComment((prevComment) => ({
          ...prevComment,
          errors: [{ msg: "Unknown error." }],
        }));

      setComment((prevComment) => ({ ...prevComment, pending: false }));
    } catch (error) {
      setComment((prevComment) => ({
        ...prevComment,
        pending: false,
        errors: [{ msg: `${error}` }],
      }));
    }
  };

  return (
    <>
      {post === null ? (
        <>
          <div className="loading">
            <div className="box">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            Loading post
          </div>
        </>
      ) : post instanceof Error ? (
        <p className={styles["error-info"]}>Error loading post</p>
      ) : (
        <>
          <p className={styles.title}>{post.title}</p>
          <p className={styles.published}>
            Published: {formatDate(new Date(post.date_published))}
          </p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {!displayName ? (
            <p className={styles.info}>
              You need to be logged in to leave a comment!
            </p>
          ) : (
            <>
              <ul className={styles.errors}>
                {comment.errors.map((error) => (
                  <li key={error.msg} className={styles.error}>
                    {error.msg}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit} className={styles.commentForm}>
                <textarea
                  name="comment"
                  required
                  minLength="1"
                  maxLength="230"
                  value={comment.value}
                  onChange={(e) =>
                    setComment({ ...comment, value: e.target.value })
                  }
                  disabled={comment.pending}
                  className={styles.commentField}
                />
                <button
                  type="submit"
                  disabled={comment.pending}
                  className={styles.submit}
                >
                  Comment
                </button>
              </form>
            </>
          )}
          {post.comments.length > 0 ? (
            <ul className={styles.comments}>
              {post.comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <p>
                    {comment.displayName === displayName ? (
                      <span className={styles.me}>{displayName}</span>
                    ) : (
                      <>{comment.displayName}</>
                    )}
                  </p>
                  <p>at {formatDate(comment.date)}</p>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles["no-comment"]}>
              Be the first one to leave a comment!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default Blog;
