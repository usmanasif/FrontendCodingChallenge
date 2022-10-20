import {
  render, screen, waitFor, act,
} from '@testing-library/react'

import App from '../../App'
import { TestApp } from '../../utils/test'

describe('App Component', () => {
  beforeEach(() => render(<App />, { wrapper: TestApp }))

  it('should render correctly', () => {
    expect.assertions(1)
    expect(screen).toMatchSnapshot()
  })
})