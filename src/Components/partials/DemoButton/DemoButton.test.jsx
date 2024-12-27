/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoButton from "./DemoButton";

global.fetch = vi.fn();
const navigate = vi.fn();
const setDisplayName = vi.fn();

describe("DemoButton Component", () => {
  it("renders", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(
        <DemoButton
          navigate={() => {}}
          setErrors={() => {}}
          setDisplayName={() => {}}
        />,
      );
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button>
          Try Demo Account
        </button>
      </div>
    `);
  });

  it("logs the user in", async () => {
    const setItem = vi.fn();
    global.localStorage = { setItem };
    const json = vi.fn().mockResolvedValueOnce({
      token: "some token value",
      displayName: "Tester",
    });
    global.fetch.mockResolvedValueOnce({ json });

    act(() =>
      render(
        <DemoButton
          navigate={navigate}
          setErrors={() => {}}
          setDisplayName={setDisplayName}
        />,
      ),
    );
    const user = userEvent.setup();

    await act(async () => await user.click(screen.getByRole("button")));

    expect(navigate).toHaveBeenCalledWith("/");
    expect(setDisplayName).toHaveBeenCalledWith("Tester");
    expect(setItem).toHaveBeenCalledWith("token", "some token value");
    expect(setItem).toHaveBeenCalledWith("displayName", "Tester");
  });
});
