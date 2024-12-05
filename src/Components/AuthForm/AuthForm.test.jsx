/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";

// must be mocked before tests
global.fetch = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    setState: vi.fn(),
    to: vi.fn(),
    navigate: vi.fn(),
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const mod = await importOriginal;

  const useOutletContext = vi.fn();
  useOutletContext.mockImplementation(() => ({
    setDisplayName: mocks.setState,
  }));

  // eslint-disable-next-line react/prop-types
  const Link = ({ children, to, ...props }) => {
    return (
      <a
        onClick={(e) => {
          e.preventDefault();
          mocks.to(to);
        }}
        href={to}
        {...props}
      >
        {children}
      </a>
    );
  };

  const useNavigate = () => mocks.navigate;

  return {
    ...mod,
    useOutletContext,
    Link,
    useNavigate,
  };
});

describe("AuthForm Component", () => {
  it("renders as login", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<AuthForm path="login" />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <form
          class="_form_93d937"
        >
          <h1
            class="_heading_93d937"
          >
            Login
          </h1>
          <div>
            <label
              class="_label_93d937"
              for="username"
            >
              Username:
            </label>
            <input
              autocomplete="off"
              class="_input_93d937"
              id="username"
              name="username"
              required=""
              type="text"
              value=""
            />
          </div>
          <div>
            <label
              class="_label_93d937"
              for="password"
            >
              Password:
            </label>
            <input
              class="_input_93d937"
              data-testid="password"
              id="password"
              name="password"
              required=""
              type="password"
              value=""
            />
          </div>
          <div>
            <button
              class="_submit_93d937"
              type="submit"
            >
              Submit
            </button>
          </div>
          <p
            class="_info_93d937"
          >
            Don't have an account? 
            <a
              href="/register"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    `);
  });

  it("renders as register", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<AuthForm path="register" />);
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <form
          class="_form_93d937"
        >
          <h1
            class="_heading_93d937"
          >
            Register
          </h1>
          <div>
            <label
              class="_label_93d937"
              for="username"
            >
              Username:
            </label>
            <input
              autocomplete="off"
              class="_input_93d937"
              id="username"
              name="username"
              required=""
              type="text"
              value=""
            />
          </div>
          <div>
            <label
              class="_label_93d937"
              for="password"
            >
              Password:
            </label>
            <input
              class="_input_93d937"
              data-testid="password"
              id="password"
              name="password"
              required=""
              type="password"
              value=""
            />
          </div>
          <div>
            <label
              class="_label_93d937"
              for="confirm"
            >
              Confirm password:
            </label>
            <input
              class="_input_93d937"
              data-testid="confirm"
              id="confirm"
              name="confirm"
              required=""
              type="password"
              value=""
            />
          </div>
          <div>
            <label
              class="_label_93d937"
              for="displayName"
            >
              Display name:
            </label>
            <input
              autocomplete="off"
              class="_input_93d937"
              id="displayName"
              name="displayName"
              required=""
              type="text"
              value=""
            />
          </div>
          <div>
            <button
              class="_submit_93d937"
              type="submit"
            >
              Submit
            </button>
          </div>
          <p
            class="_info_93d937"
          >
            Already have an account? 
            <a
              href="/login"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    `);
  });

  it("has responsive inputs", async () => {
    const user = userEvent.setup();

    act(() => render(<AuthForm path="register" />));

    const usernameInput = screen.getByRole("textbox", { name: "Username:" });
    const passwordInput = screen.getByTestId("password");
    const confirmInput = screen.getByTestId("confirm");
    const displayNameInput = screen.getByRole("textbox", {
      name: "Display name:",
    });

    await user.type(usernameInput, "name");
    await user.type(passwordInput, "pass");
    await user.type(confirmInput, "confirm");
    await user.type(displayNameInput, "display");

    expect(usernameInput.value).toBe("name");
    expect(passwordInput.value).toBe("pass");
    expect(confirmInput.value).toBe("confirm");
    expect(displayNameInput.value).toBe("display");
  });

  it("sends a login request", async () => {
    const json = () => {
      return Promise.resolve({ token: "blah", displayName: "what" });
    };
    global.fetch.mockResolvedValueOnce({ json });
    const user = userEvent.setup();

    act(() => render(<AuthForm path="login" />));

    const usernameInput = screen.getByRole("textbox", { name: "Username:" });
    const passwordInput = screen.getByTestId("password");

    await user.type(usernameInput, "name");
    await user.type(passwordInput, "pass");
    await user.click(screen.getByRole("button"));

    expect(mocks.setState).toHaveBeenCalledWith("what");
    expect(mocks.navigate).toHaveBeenCalledWith("/");
  });

  it("sends a register request", async () => {
    const json = () => {
      return Promise.resolve({ displayName: "success" });
    };
    global.fetch.mockResolvedValueOnce({ json });
    const user = userEvent.setup();

    act(() => render(<AuthForm path="register" />));

    const usernameInput = screen.getByRole("textbox", { name: "Username:" });
    const passwordInput = screen.getByTestId("password");
    const confirmInput = screen.getByTestId("confirm");
    const displayNameInput = screen.getByRole("textbox", {
      name: "Display name:",
    });

    await user.type(usernameInput, "name");
    await user.type(passwordInput, "pass");
    await user.type(confirmInput, "confirm");
    await user.type(displayNameInput, "display");
    await user.click(screen.getByRole("button"));

    expect(mocks.navigate).toHaveBeenCalledWith("/login");
  });

  it("shows errors from a request", async () => {
    const json = () => {
      return Promise.resolve({
        errors: [{ msg: "Password must contain at least 1 number." }],
      });
    };
    global.fetch.mockResolvedValueOnce({ json });
    const user = userEvent.setup();

    act(() => render(<AuthForm path="login" />));

    const usernameInput = screen.getByRole("textbox", { name: "Username:" });
    const passwordInput = screen.getByTestId("password");

    await user.type(usernameInput, "name");
    await user.type(passwordInput, "pass");
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByRole("listitem").textContent).toBe(
      "Password must contain at least 1 number.",
    );
  });

  it("redirects to the other page", async () => {
    const user = userEvent.setup();

    act(() => render(<AuthForm path="login" />));
    await user.click(screen.getByRole("link", { name: "Register" }));
    expect(mocks.to).toHaveBeenCalledWith("/register");
    cleanup();

    act(() => render(<AuthForm path="register" />));
    await user.click(screen.getByRole("link", { name: "Login" }));
    expect(mocks.to).toHaveBeenCalledWith("/login");
  });
});
