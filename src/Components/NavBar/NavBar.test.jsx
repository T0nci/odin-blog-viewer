import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";

const mocks = vi.hoisted(() => {
  return {
    link: vi.fn(),
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const mod = await importOriginal();

  // eslint-disable-next-line react/prop-types
  const Link = ({ children, to, ...props }) => {
    return (
      <a
        onClick={(e) => {
          e.preventDefault();
          mocks.link(to);
        }}
        href={to}
        {...props}
      >
        {children}
      </a>
    );
  };

  return {
    ...mod,
    Link,
  };
});

vi.mock(import("react"), async (importOriginal) => {
  const mod = await importOriginal();

  const useState = vi.fn();
  useState.mockImplementationOnce(() => [null, () => {}]);
  useState.mockImplementationOnce(() => ["a token string", () => {}]);
  useState.mockImplementationOnce(() => [null, () => {}]);
  useState.mockImplementationOnce(() => ["a token string", () => {}]);

  return {
    ...mod,
    useState,
  };
});

describe("NavBar Component", () => {
  it("renders without token", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<NavBar />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <nav
          class="_navigation_7ceb2b"
        >
          <ul
            class="_nav_7ceb2b container"
          >
            <li
              class="_home_7ceb2b"
            >
              <a
                class="_nav-link_7ceb2b"
                href="/"
              >
                webdev.blog
              </a>
            </li>
            <li>
              <a
                class="_nav-link_7ceb2b"
                href="/login"
              >
                Login
              </a>
            </li>
            <li>
              <a
                class="_nav-link_7ceb2b"
                href="/register"
              >
                Register
              </a>
            </li>
          </ul>
        </nav>
        <main>
          <div
            class="container"
          />
        </main>
      </div>
    `);
  });

  it("renders with token", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<NavBar />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <nav
          class="_navigation_7ceb2b"
        >
          <ul
            class="_nav_7ceb2b container"
          >
            <li
              class="_home_7ceb2b"
            >
              <a
                class="_nav-link_7ceb2b"
                href="/"
              >
                webdev.blog
              </a>
            </li>
            <li>
              <a
                class="_nav-link_7ceb2b"
                href="/logout"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <main>
          <div
            class="container"
          />
        </main>
      </div>
    `);
  });

  it("redirects when any link is clicked", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(screen.getByRole("link", { name: "webdev.blog" }));
    expect(mocks.link).toHaveBeenCalledWith("/");

    await user.click(screen.getByRole("link", { name: "Login" }));
    expect(mocks.link).toHaveBeenCalledWith("/login");

    await user.click(screen.getByRole("link", { name: "Register" }));
    expect(mocks.link).toHaveBeenCalledWith("/register");
  });

  it("redirects when logout link is clicked", async () => {
    const user = userEvent.setup();
    render(<NavBar />);

    await user.click(screen.getByRole("link", { name: "Logout" }));
    expect(mocks.link).toHaveBeenCalledWith("/");
  });
});
