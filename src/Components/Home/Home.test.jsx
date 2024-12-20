/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

global.fetch = vi.fn();

const mocks = vi.hoisted(() => {
  const navigateMock = vi.fn();

  return {
    navigateMock, // returned here so we can test it
    useNavigate: () => navigateMock, // a function for the component
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const mod = await importOriginal();

  const useOutletContext = () => ({
    displayName: "Tester",
    setDisplayName: () => {},
  });

  return {
    ...mod,
    useNavigate: mocks.useNavigate,
    useOutletContext,
  };
});

describe("Home Component", () => {
  it("renders with no blogs", async () => {
    const json = () => {
      return Promise.resolve({ posts: [] });
    };

    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = render(<Home />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1
          class="_heading_4b4bfe"
        >
          Hello 
          Tester
          , welcome to my blog!
        </h1>
        <p
          class="_paragraph_4b4bfe"
        >
          Hello, my name is T0nci, and I am a dedicated full-stack web developer with a passion for continuous learning and growth within the ever-evolving tech industry. Through my work, I strive to provide valuable insights and share effective strategies that can help aspiring developers enhance their skills. My goal with this blog is to equip you with the knowledge, tools, and exclusive techniques that will guide you toward mastering the art of web development. Whether you're just starting your journey or looking to refine your expertise, you will find a new piece of knowledge or a useful tip with every step you take here.
        </p>
        <p
          class="_empty_4b4bfe"
        >
          No blogs published yet.
        </p>
      </div>
    `);
  });

  it("renders with blogs", async () => {
    const json = () => {
      return Promise.resolve({
        posts: [
          {
            id: 1,
            title: "Test",
            content: "Testing",
            date_published: new Date("2000-01-01"),
          },
        ],
      });
    };

    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = render(<Home />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1
          class="_heading_4b4bfe"
        >
          Hello 
          Tester
          , welcome to my blog!
        </h1>
        <p
          class="_paragraph_4b4bfe"
        >
          Hello, my name is T0nci, and I am a dedicated full-stack web developer with a passion for continuous learning and growth within the ever-evolving tech industry. Through my work, I strive to provide valuable insights and share effective strategies that can help aspiring developers enhance their skills. My goal with this blog is to equip you with the knowledge, tools, and exclusive techniques that will guide you toward mastering the art of web development. Whether you're just starting your journey or looking to refine your expertise, you will find a new piece of knowledge or a useful tip with every step you take here.
        </p>
        <ul
          class="_cards_4b4bfe"
        >
          <li>
            <button
              class="_card_4b4bfe"
            >
              <p
                class="_title_4b4bfe"
              >
                Test
              </p>
              <p
                class="_content_4b4bfe"
              >
                Testing
              </p>
              <p
                class="_date_4b4bfe"
              >
                01:00 01.01.2000
              </p>
            </button>
          </li>
        </ul>
      </div>
    `);
  });

  it("renders with error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Test error"));

    let container = null;
    await act(() => {
      const { container: temp } = render(<Home />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1
          class="_heading_4b4bfe"
        >
          Hello 
          Tester
          , welcome to my blog!
        </h1>
        <p
          class="_paragraph_4b4bfe"
        >
          Hello, my name is T0nci, and I am a dedicated full-stack web developer with a passion for continuous learning and growth within the ever-evolving tech industry. Through my work, I strive to provide valuable insights and share effective strategies that can help aspiring developers enhance their skills. My goal with this blog is to equip you with the knowledge, tools, and exclusive techniques that will guide you toward mastering the art of web development. Whether you're just starting your journey or looking to refine your expertise, you will find a new piece of knowledge or a useful tip with every step you take here.
        </p>
        <p
          class="_error_4b4bfe"
        >
          Error loading posts
        </p>
      </div>
    `);
  });

  it("redirects to a post when the post is clicked", async () => {
    const user = userEvent.setup();
    const json = () => {
      return Promise.resolve({
        posts: [
          {
            id: 1,
            title: "Test 1",
            content: "Testing 1",
            date_published: new Date("2000-01-10"),
          },
          {
            id: 2,
            title: "Test 2",
            content: "Testing 2",
            date_published: new Date("2000-01-10"),
          },
        ],
      });
    };

    global.fetch.mockResolvedValueOnce({ json });

    await act(() => render(<Home />));

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);
    expect(mocks.navigateMock).toHaveBeenCalledWith("/posts/1");

    await user.click(buttons[1]);
    expect(mocks.navigateMock).toHaveBeenCalledWith("/posts/2");
  });
});
