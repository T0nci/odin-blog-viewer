import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter, Link } from "react-router";
import ErrorPage from "./ErrorPage";

const MockNavBar = () => {
  return <Link to="/404">404</Link>;
};
const UncaughtError = () => {
  throw new Error("test error");
};
const setupRouter = (path) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <MockNavBar />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/error",
        element: <UncaughtError />,
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: [path],
      initialIndex: 0,
    },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("ErrorPage Component", () => {
  it("renders with React Router error", async () => {
    const { container } = setupRouter("/");

    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: "404" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_parent_804c82"
        >
          <p
            class="_error_804c82"
          >
            404: Not Found
          </p>
          <a
            class="_link_804c82"
            data-discover="true"
            href="/"
          >
            Go back to the homepage
          </a>
        </div>
      </div>
    `);
  });

  it("renders with error in component", () => {
    const { container } = setupRouter("/error");

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_parent_804c82"
        >
          <p
            class="_error_804c82"
          >
            Error: test error
          </p>
          <a
            class="_link_804c82"
            data-discover="true"
            href="/"
          >
            Go back to the homepage
          </a>
        </div>
      </div>
    `);
  });

  it("has a link that redirects to home", async () => {
    const { container, router } = setupRouter("/error");

    const user = userEvent.setup();
    await user.click(
      screen.getByRole("link", { name: "Go back to the homepage" }),
    );

    expect(router.state.location.pathname).toBe("/");
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          data-discover="true"
          href="/404"
        >
          404
        </a>
      </div>
    `);
  });
});
