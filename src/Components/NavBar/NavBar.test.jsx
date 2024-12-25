/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import NavBar from "./NavBar";

global.localStorage = {
  getItem: vi.fn(),
  removeItem: vi.fn(),
};

const Placeholder = () => {};
const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <NavBar />,
        children: [
          { path: "/login", element: <Placeholder /> },
          { path: "/register", element: <Placeholder /> },
        ],
      },
    ],
    { initialEntries: ["/"], initialIndex: 0 },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("NavBar Component", () => {
  it("renders without display name", () => {
    global.localStorage.getItem.mockImplementationOnce(() => null);

    const { container } = setupRouter();

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_main-container_7ceb2b"
        >
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
                  data-discover="true"
                  href="/"
                >
                  webdev.blog
                </a>
              </li>
              <li>
                <a
                  class="_nav-link_7ceb2b"
                  data-discover="true"
                  href="/login"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  class="_nav-link_7ceb2b"
                  data-discover="true"
                  href="/register"
                >
                  Register
                </a>
              </li>
            </ul>
          </nav>
          <main
            class="_main_7ceb2b"
          >
            <div
              class="container"
            />
          </main>
          <footer
            class="_main-footer_7ceb2b"
          >
            <div
              class="_footer_7ceb2b container"
            >
              <a
                class="_github_7ceb2b"
                href="https://github.com/T0nci"
              >
                <img
                  alt="Github Logo"
                  class="_icon_7ceb2b"
                  src="data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%23fff'/%3e%3c/svg%3e"
                />
                T0nci
              </a>
            </div>
          </footer>
        </div>
      </div>
    `);
  });

  it("renders without display name", () => {
    global.localStorage.getItem.mockImplementationOnce(() => "some value");

    const { container } = setupRouter();

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_main-container_7ceb2b"
        >
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
                  data-discover="true"
                  href="/"
                >
                  webdev.blog
                </a>
              </li>
              <li>
                <button
                  class="_logout_7ceb2b"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <main
            class="_main_7ceb2b"
          >
            <div
              class="container"
            />
          </main>
          <footer
            class="_main-footer_7ceb2b"
          >
            <div
              class="_footer_7ceb2b container"
            >
              <a
                class="_github_7ceb2b"
                href="https://github.com/T0nci"
              >
                <img
                  alt="Github Logo"
                  class="_icon_7ceb2b"
                  src="data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%23fff'/%3e%3c/svg%3e"
                />
                T0nci
              </a>
            </div>
          </footer>
        </div>
      </div>
    `);
  });

  it("redirects when any link is clicked", async () => {
    global.localStorage.getItem.mockImplementationOnce(() => null);

    const { router } = setupRouter();

    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: "Login" }));
    expect(router.state.location.pathname).toBe("/login");

    await user.click(screen.getByRole("link", { name: "Register" }));
    expect(router.state.location.pathname).toBe("/register");

    await user.click(screen.getByRole("link", { name: "webdev.blog" }));
    expect(router.state.location.pathname).toBe("/");
  });

  it("logs the user out when logout is clicked", async () => {
    global.localStorage.getItem.mockImplementationOnce(() => "some value");

    setupRouter();
    const user = userEvent.setup();

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    await user.click(logoutButton);

    expect(logoutButton).not.toBeInTheDocument();
    expect(global.localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(global.localStorage.removeItem).toHaveBeenCalledWith("displayName");
  });
});
