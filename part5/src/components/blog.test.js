import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

const user = {
  username: 'jviitamo',
  name: 'Juhana Viitamo',
  id: 'randomid'
}

const blog = {
  user: user,
  likes: 2,
  author: 'Teija Viitamo',
  title: 'shufflemix',
  url: 'shuffle.fi'
}

describe('<Blog />', () => {
  
  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )

    const hidden = component.container.querySelector('.inner')
    expect(hidden).toHaveStyle('display: none')
    expect(component.container).toHaveTextContent(
      'Teija Viitamo',
      'shufflemix'
    )
  })

  test('shows url and likes when pressed', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const hidden = component.container.querySelector('.inner')
    expect(hidden).not.toHaveStyle('display: none')
  })

  test('like pressed twice event handler called twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})