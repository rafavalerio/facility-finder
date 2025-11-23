import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const defaultProps = {
    placeholder: 'Search',
    value: '',
    onChangeText: mockOnChangeText,
  };

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  describe('Clear button visibility', () => {
    it('should not show the clear button when value is empty', () => {
      render(<Input {...defaultProps} value="" />);
      
      const clearButton = screen.queryByTestId('close-circle');
      expect(clearButton).toBeNull();
    });

    it('should show the clear button when value is not empty', () => {
      render(<Input {...defaultProps} value="test query" />);
      
      const clearButton = screen.queryByTestId('close-circle');
      expect(clearButton).toBeTruthy();
    });

    it('should hide the clear button when value changes from non-empty to empty', () => {
      const { rerender } = render(<Input {...defaultProps} value="test" />);
      
      // Clear button should be visible
      let clearButton = screen.queryByTestId('close-circle');
      expect(clearButton).toBeTruthy();
      
      // Update value to empty
      rerender(<Input {...defaultProps} value="" />);
      
      // Clear button should no longer be visible
      clearButton = screen.queryByTestId('close-circle');
      expect(clearButton).toBeNull();
    });
  });

  describe('Text input functionality', () => {
    it('should render with the correct placeholder', () => {
      render(<Input {...defaultProps} placeholder="Search facilities" />);
      
      const input = screen.getByPlaceholderText('Search facilities');
      expect(input).toBeTruthy();
    });

    it('should display the provided value', () => {
      render(<Input {...defaultProps} value="medical centre" />);
      
      const input = screen.getByDisplayValue('medical centre');
      expect(input).toBeTruthy();
    });

    it('should call onChangeText when text is entered', () => {
      render(<Input {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Search');
      fireEvent.changeText(input, 'new text');
      
      expect(mockOnChangeText).toHaveBeenCalledWith('new text');
      expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    });
  });

  describe('Clear button functionality', () => {
    it('should call onChangeText with empty string when clear button is pressed', () => {
      render(<Input {...defaultProps} value="test query" />);
      
      const clearButton = screen.getByTestId('close-circle');
      fireEvent.press(clearButton);
      
      expect(mockOnChangeText).toHaveBeenCalledWith('');
      expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    });
  });
});

