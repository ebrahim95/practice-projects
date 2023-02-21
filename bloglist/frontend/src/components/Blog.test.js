import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    author: "Ebrahim",
    title: "Test Blog",
    url: "google.com",
    likes: "43",
    id: "1234567",
    user: {
      id: "765431",
      username: "ebrahim95",
    },
  };

  const user = {
    token: "324j214329102f12j3f1",
    username: "ebrahim95",
    name: "ebrahim",
  };

  test("make sure if Blog only displays title and author by default", () => {
    const { container } = render(<Blog blog={blog} user={user} />);
    const element = container.querySelector(".defaultDetails");
    expect(element).toBeDefined();
  });

  test("the button displays the url and likes", async () => {
    const user = userEvent.setup();
    const { container } = render(<Blog blog={blog} user={user} />);
    const button = screen.getByText("View");
    await user.click(button);

    const element = container.querySelector("#viewDetails");
    expect(element).toBeDefined();
  });

  test("make sure that the like button event handler is called twice", async () => {
    const handleLikes = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Blog blog={blog} user={user} handleLikes={handleLikes} />
    );
    const button = screen.getByText("View");

    await user.click(button);
    const likeButton = container.querySelector(".handleLikes");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleLikes.mock.calls).toHaveLength(2);
  });
});
