import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
//5.1
test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'zhangwenbo',
    url: 'www.example.com',
    likes: 2
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library zhangwenbo')
  expect(element).toBeDefined()

})


test('clicking the button calls event handler once', async () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    author: 'zhangwenbo',
    url: 'www.example.com',
    likes: 2
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})