import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { Tag } from '../Tag'

describe('Tag', () => {
  const defaultProps = {
    text: 'Medical',
  }

  describe('Rendering', () => {
    it('should render the tag text', () => {
      render(<Tag {...defaultProps} />)

      const tagText = screen.getByText('Medical')
      expect(tagText).toBeTruthy()
    })

    it('should render with custom text', () => {
      render(<Tag {...defaultProps} text="Emergency" />)

      const tagText = screen.getByText('Emergency')
      expect(tagText).toBeTruthy()
    })
  })

  describe('Default styling', () => {
    it('should apply default background colour when none provided', () => {
      render(<Tag {...defaultProps} />)

      const container = screen.getByTestId('tag-container')

      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#E8F5E9' })])
      )
    })

    it('should apply default text colour when none provided', () => {
      render(<Tag {...defaultProps} />)

      const tagText = screen.getByText('Medical')

      expect(tagText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ color: '#2E7D32' })])
      )
    })
  })

  describe('Custom styling', () => {
    it('should apply custom background colour', () => {
      render(<Tag {...defaultProps} backgroundColor="#FF5722" />)

      const container = screen.getByTestId('tag-container')

      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#FF5722' })])
      )
    })

    it('should apply custom text colour', () => {
      render(<Tag {...defaultProps} textColor="#FFFFFF" />)

      const tagText = screen.getByText('Medical')

      expect(tagText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ color: '#FFFFFF' })])
      )
    })

    it('should apply custom container style', () => {
      render(<Tag {...defaultProps} style={{ marginTop: 10 }} />)

      const container = screen.getByTestId('tag-container')

      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ marginTop: 10 })])
      )
    })

    it('should apply custom text style', () => {
      render(<Tag {...defaultProps} textStyle={{ fontSize: 16 }} />)

      const tagText = screen.getByText('Medical')

      expect(tagText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ fontSize: 16 })])
      )
    })
  })

  describe('Selected state', () => {
    it('should not apply selected styles when selected is false', () => {
      render(<Tag {...defaultProps} selected={false} />)

      const container = screen.getByTestId('tag-container')

      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#E8F5E9' })])
      )
    })

    it('should apply selected background colour when selected is true', () => {
      render(<Tag {...defaultProps} selected={true} />)

      const container = screen.getByTestId('tag-container')

      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#2E7D32' })])
      )
    })

    it('should apply selected text colour when selected is true', () => {
      render(<Tag {...defaultProps} selected={true} />)

      const tagText = screen.getByText('Medical')

      expect(tagText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ color: '#FFF' })])
      )
    })
  })
})
