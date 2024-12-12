/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

global.fetch = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    useOutletContext: vi.fn(),
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const mod = await importOriginal();

  const useParams = () => ({ postId: 1 });

  // so it can be specialized for each test
  const useOutletContext = mocks.useOutletContext;

  return {
    ...mod,
    useParams,
    useOutletContext,
  };
});

describe("Blog Component", () => {
  it("renders without token", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        // first is for post
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        // second is for comments
        comments: [],
      });
    global.fetch.mockResolvedValue({ json });
    // it's called multiple times per test so I need to specialize it for each
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: null,
      setDisplayName: () => {},
    }));

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <p
          class="_info_8b7481"
        >
          You need to be logged in to leave a comment!
        </p>
        <p
          class="_no-comment_8b7481"
        >
          Be the first one to leave a comment!
        </p>
      </div>
    `);
  });

  it("renders with token", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: "test",
      setDisplayName: () => {},
    }));

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <ul
          class="_errors_8b7481"
        />
        <form
          class="_commentForm_8b7481"
        >
          <textarea
            class="_commentField_8b7481"
            maxlength="230"
            minlength="1"
            name="comment"
            required=""
          />
          <button
            class="_submit_8b7481"
            type="submit"
          >
            Comment
          </button>
        </form>
        <p
          class="_no-comment_8b7481"
        >
          Be the first one to leave a comment!
        </p>
      </div>
    `);
  });

  it("renders without comments", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: null,
      setDisplayName: () => {},
    }));

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <p
          class="_info_8b7481"
        >
          You need to be logged in to leave a comment!
        </p>
        <p
          class="_no-comment_8b7481"
        >
          Be the first one to leave a comment!
        </p>
      </div>
    `);
  });

  it("renders with comments", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [
          {
            id: 1,
            content: "test comment",
            displayName: "Odin",
            date: "2000-01-01",
          },
        ],
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: null,
      setDisplayName: () => {},
    }));

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <p
          class="_info_8b7481"
        >
          You need to be logged in to leave a comment!
        </p>
        <ul
          class="_comments_8b7481"
        >
          <li
            class="_comment_8b7481"
          >
            <p>
              Odin
            </p>
            <p>
              at 
              01:00 01.01.2000
            </p>
            <p>
              test comment
            </p>
          </li>
        </ul>
      </div>
    `);
  });

  it("renders with comments", async () => {
    global.fetch.mockRejectedValueOnce(new Error("test"));
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: null,
      setDisplayName: () => {},
    }));

    let container = null;
    // Don't know why this test has a warning
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_error-info_8b7481"
        >
          Error loading post
        </p>
      </div>
    `);
  });

  it("sends a comment", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      })
      // for creating a comment
      .mockResolvedValueOnce({
        comment: {
          id: 1,
          content: "Test comment",
          displayName: "Odin",
          date: "2000-01-01",
        },
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: "user",
      setDisplayName: () => {},
    }));

    const user = await userEvent.setup();

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    await user.type(screen.getByRole("textbox"), "Test comment");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <ul
          class="_errors_8b7481"
        />
        <form
          class="_commentForm_8b7481"
        >
          <textarea
            class="_commentField_8b7481"
            maxlength="230"
            minlength="1"
            name="comment"
            required=""
          />
          <button
            class="_submit_8b7481"
            type="submit"
          >
            Comment
          </button>
        </form>
        <ul
          class="_comments_8b7481"
        >
          <li
            class="_comment_8b7481"
          >
            <p>
              Odin
            </p>
            <p>
              at 
              01:00 01.01.2000
            </p>
            <p>
              Test comment
            </p>
          </li>
        </ul>
      </div>
    `);
  });

  it("clears displayName when token is invalid", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      })
      // for creating a comment
      .mockResolvedValueOnce({
        error: "401",
      });
    global.fetch.mockResolvedValue({ json });
    const setDisplayName = vi.fn();
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: "user",
      setDisplayName,
    }));

    const user = await userEvent.setup();

    await act(() => render(<Blog />));

    await user.type(screen.getByRole("textbox"), "Test comment");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(setDisplayName).toHaveBeenCalledWith(null);
  });

  it("sends error when post is not found", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      })
      // for creating a comment
      .mockResolvedValueOnce({
        error: "404",
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: "user",
      setDisplayName: () => {},
    }));

    const user = await userEvent.setup();

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    await user.type(screen.getByRole("textbox"), "Test comment");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <ul
          class="_errors_8b7481"
        >
          <li
            class="_error_8b7481"
          >
            Post Not Found.
          </li>
        </ul>
        <form
          class="_commentForm_8b7481"
        >
          <textarea
            class="_commentField_8b7481"
            maxlength="230"
            minlength="1"
            name="comment"
            required=""
          >
            Test comment
          </textarea>
          <button
            class="_submit_8b7481"
            type="submit"
          >
            Comment
          </button>
        </form>
        <p
          class="_no-comment_8b7481"
        >
          Be the first one to leave a comment!
        </p>
      </div>
    `);
  });

  it("sends errors for form", async () => {
    const json = vi
      .fn()
      .mockResolvedValueOnce({
        post: {
          title: "test title",
          content: "test content",
          date_published: "2000-01-01",
        },
      })
      .mockResolvedValueOnce({
        comments: [],
      })
      // for creating a comment
      .mockResolvedValueOnce({
        errors: [
          {
            msg: "Comment must be between 1 and 230 characters!",
          },
        ],
      });
    global.fetch.mockResolvedValue({ json });
    mocks.useOutletContext.mockImplementation(() => ({
      displayName: "user",
      setDisplayName: () => {},
    }));

    const user = await userEvent.setup();

    let container = null;
    await act(() => {
      const { container: temp } = render(<Blog />);
      container = temp;
    });

    await user.type(
      screen.getByRole("textbox"),
      "230 characters - way over the limit",
    );
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_title_8b7481"
        >
          test title
        </p>
        <p
          class="_published_8b7481"
        >
          Published: 
          01:00 01.01.2000
        </p>
        <p
          class="_content_8b7481"
        >
          test content
        </p>
        <ul
          class="_errors_8b7481"
        >
          <li
            class="_error_8b7481"
          >
            Comment must be between 1 and 230 characters!
          </li>
        </ul>
        <form
          class="_commentForm_8b7481"
        >
          <textarea
            class="_commentField_8b7481"
            maxlength="230"
            minlength="1"
            name="comment"
            required=""
          >
            230 characters - way over the limit
          </textarea>
          <button
            class="_submit_8b7481"
            type="submit"
          >
            Comment
          </button>
        </form>
        <p
          class="_no-comment_8b7481"
        >
          Be the first one to leave a comment!
        </p>
      </div>
    `);
  });
});
