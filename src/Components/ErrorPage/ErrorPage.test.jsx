import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./ErrorPage";

const mocks = vi.hoisted(() => {
  const link = vi.fn();

  return {
    link,
  };
});

vi.mock(import("react-router"), async (importOriginal) => {
  const mod = await importOriginal();

  // eslint-disable-next-line react/prop-types
  const Link = ({ children, to, ...rest }) => {
    return (
      <a
        onClick={(e) => {
          e.preventDefault();
          mocks.link(to);
        }}
        href={to}
        {...rest}
      >
        {children}
      </a>
    );
  };

  const useRouteError = vi.fn();
  useRouteError.mockImplementationOnce(() => new Error());
  useRouteError.mockImplementationOnce(() => new Error());
  useRouteError.mockImplementationOnce(() => ({
    status: 404,
    statusText: "Not Found",
  }));
  useRouteError.mockImplementationOnce(() => ({
    error: new Error("Test error 1"),
  }));
  useRouteError.mockImplementationOnce(() => new Error("Test error 2"));

  return {
    ...mod,
    Link,
    useRouteError,
  };
});

describe("ErrorPage Component", () => {
  it("renders", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<ErrorPage />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_parent_804c82"
        >
          <p
            class="_error_804c82"
          >
            Error
          </p>
          <a
            class="_link_804c82"
            href="/"
          >
            Go back to the homepage
          </a>
        </div>
      </div>
    `);
  });

  it("redirects to homepage with link", async () => {
    const user = userEvent.setup();
    act(() => render(<ErrorPage />));

    await user.click(
      screen.getByRole("link", { name: "Go back to the homepage" }),
    );

    expect(mocks.link).toHaveBeenCalledWith("/");
  });

  it("shows error with status", () => {
    act(() => render(<ErrorPage />));

    const error = screen.getByRole("paragraph");

    expect(error.textContent).toBe("404: Not Found");
  });

  it("shows error with error object", () => {
    act(() => render(<ErrorPage />));

    const error = screen.getByRole("paragraph");

    expect(error.textContent).toBe("Error: Test error 1");
  });

  it("shows error", () => {
    act(() => render(<ErrorPage />));

    const error = screen.getByRole("paragraph");

    expect(error.textContent).toBe("Error: Test error 2");
  });
});
