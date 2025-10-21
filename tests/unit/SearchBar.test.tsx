import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/UI/SearchBar';

describe('SearchBar Component', () => {
  const defaultProps = {
    query: '',
    onQueryChange: jest.fn(),
    placeholder: 'Search the tarot museum...',
  };

  const mockFilters = [
    {
      id: 'suit',
      label: 'Suit',
      type: 'checkbox' as const,
      options: [
        { label: 'Major Arcana', value: 'major' },
        { label: 'Cups', value: 'cups' },
        { label: 'Wands', value: 'wands' },
      ],
    },
    {
      id: 'period',
      label: 'Period',
      type: 'select' as const,
      options: [
        { label: 'Ancient', value: 'ancient' },
        { label: 'Medieval', value: 'medieval' },
        { label: 'Modern', value: 'modern' },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Search Input', () => {
    it('should render search input with placeholder', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByPlaceholderText('Search the tarot museum...')).toBeInTheDocument();
    });

    it('should display current query value', () => {
      render(<SearchBar {...defaultProps} query="fool" />);
      const input = screen.getByPlaceholderText('Search the tarot museum...') as HTMLInputElement;
      expect(input.value).toBe('fool');
    });

    it('should call onQueryChange when typing', () => {
      const onQueryChange = jest.fn();
      render(<SearchBar {...defaultProps} onQueryChange={onQueryChange} />);

      const input = screen.getByPlaceholderText('Search the tarot museum...');
      fireEvent.change(input, { target: { value: 'magician' } });

      expect(onQueryChange).toHaveBeenCalledWith('magician');
    });

    it('should have search icon', () => {
      const { container } = render(<SearchBar {...defaultProps} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Filter Toggle', () => {
    it('should show filter button when filters are provided', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);
      expect(screen.getByLabelText('Toggle filters')).toBeInTheDocument();
    });

    it('should not show filter button when no filters provided', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.queryByLabelText('Toggle filters')).not.toBeInTheDocument();
    });

    it('should toggle filter panel on button click', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);

      const filterButton = screen.getByLabelText('Toggle filters');

      // Initially, filters should be hidden
      expect(screen.queryByText('Filters')).not.toBeVisible();

      // Click to show filters
      fireEvent.click(filterButton);
      expect(screen.getByText('Filters')).toBeVisible();

      // Click to hide filters
      fireEvent.click(filterButton);
    });
  });

  describe('Filter Types', () => {
    it('should render checkbox filters', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      expect(screen.getByText('Major Arcana')).toBeInTheDocument();
      expect(screen.getByText('Cups')).toBeInTheDocument();
      expect(screen.getByText('Wands')).toBeInTheDocument();
    });

    it('should render select filters', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should handle checkbox filter changes', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const checkbox = screen.getByLabelText('Major Arcana') as HTMLInputElement;
      fireEvent.click(checkbox);

      expect(onFiltersChange).toHaveBeenCalledWith({
        suit: ['major'],
      });
    });

    it('should handle select filter changes', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'medieval' } });

      expect(onFiltersChange).toHaveBeenCalledWith({
        period: 'medieval',
      });
    });
  });

  describe('Active Filters', () => {
    it('should display filter count badge', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const checkbox = screen.getByLabelText('Major Arcana');
      fireEvent.click(checkbox);

      const badge = screen.getByText('1');
      expect(badge).toBeInTheDocument();
    });

    it('should show active filter tags', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const checkbox = screen.getByLabelText('Major Arcana');
      fireEvent.click(checkbox);

      expect(screen.getByText(/Suit: major/)).toBeInTheDocument();
    });

    it('should allow removing individual filters', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const checkbox = screen.getByLabelText('Major Arcana');
      fireEvent.click(checkbox);

      const removeButton = screen.getByLabelText('Remove Suit filter');
      fireEvent.click(removeButton);

      expect(onFiltersChange).toHaveBeenLastCalledWith({});
    });

    it('should clear all filters', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const checkbox = screen.getByLabelText('Major Arcana');
      fireEvent.click(checkbox);

      const clearAllButton = screen.getByText('Clear all');
      fireEvent.click(clearAllButton);

      expect(onFiltersChange).toHaveBeenLastCalledWith({});
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByLabelText('Search tarot cards')).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);

      const input = screen.getByLabelText('Search tarot cards');
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should have accessible filter button', () => {
      render(<SearchBar {...defaultProps} filters={mockFilters} />);
      const filterButton = screen.getByLabelText('Toggle filters');
      expect(filterButton).toHaveAttribute('aria-label');
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <SearchBar {...defaultProps} className="custom-search" />
      );
      expect(container.firstChild).toHaveClass('custom-search');
    });

    it('should have responsive grid for filters', () => {
      const { container } = render(<SearchBar {...defaultProps} filters={mockFilters} />);

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty query', () => {
      render(<SearchBar {...defaultProps} query="" />);
      const input = screen.getByPlaceholderText('Search the tarot museum...') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle rapid typing', () => {
      const onQueryChange = jest.fn();
      render(<SearchBar {...defaultProps} onQueryChange={onQueryChange} />);

      const input = screen.getByLabelText('Search tarot cards');

      'test query'.split('').forEach(char => {
        fireEvent.change(input, { target: { value: char } });
      });

      expect(onQueryChange).toHaveBeenCalled();
    });

    it('should handle multiple filter selections', () => {
      const onFiltersChange = jest.fn();
      render(
        <SearchBar
          {...defaultProps}
          filters={mockFilters}
          onFiltersChange={onFiltersChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Toggle filters'));

      fireEvent.click(screen.getByLabelText('Major Arcana'));
      fireEvent.click(screen.getByLabelText('Cups'));
      fireEvent.click(screen.getByLabelText('Wands'));

      expect(onFiltersChange).toHaveBeenLastCalledWith({
        suit: ['major', 'cups', 'wands'],
      });
    });
  });
});
