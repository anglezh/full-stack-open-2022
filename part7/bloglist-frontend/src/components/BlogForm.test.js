import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("write here title");
  const inputAuthor = screen.getByPlaceholderText("write here author");
  const inputUrl = screen.getByPlaceholderText("write here url");
  const sendButton = screen.getByText("create");

  await userEvent.type(inputTitle, "testing inputTitle");
  await userEvent.type(inputAuthor, "inputAuthor");
  await userEvent.type(inputUrl, "inputUrl");
  await userEvent.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    author: "inputAuthor",
    title: "testing inputTitle",
    url: "inputUrl",
  });
});
