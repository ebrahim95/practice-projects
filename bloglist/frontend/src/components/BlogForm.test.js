/* eslint-disable testing-library/no-node-access */
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("ensure that the right details are returned when a new blog created ", async () => {
  const user = userEvent.setup();
  const handleForm = jest.fn();

  const { container } = render(<BlogForm handleForm={handleForm} />);
  await user.type(container.querySelector(".title"), "lalalala");
  await user.type(container.querySelector(".author"), "guess who");
  await user.type(container.querySelector(".url"), "nonexistent.com");

  const button = screen.getByText("Submit Blog");
  await user.click(button);

  expect(handleForm.mock.calls).toHaveLength(1);

  expect(handleForm.mock.calls[0][0].title).toBe("lalalala");
  expect(handleForm.mock.calls[0][0].author).toBe("guess who");
  expect(handleForm.mock.calls[0][0].url).toBe("nonexistent.com");
});
