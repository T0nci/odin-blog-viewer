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
});
