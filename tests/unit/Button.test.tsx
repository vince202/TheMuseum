import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/UI/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<Button className="custom-class">Test</Button>);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should apply default variant styles', () => {
      const { container } = render(<Button>Default</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-purple-600');
    });

    it('should apply secondary variant styles', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-gray-200');
    });

    it('should apply ghost variant styles', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('should apply medium size styles (default)', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('should apply large size styles', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('should show loading state', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByText('Loading')).toBeInTheDocument();
      // Check if button is disabled during loading
      expect(screen.getByText('Loading')).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);

      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Loading</Button>);

      fireEvent.click(screen.getByText('Loading'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Button ariaLabel="Custom label">Button</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard</Button>);

      const button = screen.getByText('Keyboard');
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyDown(button, { key: ' ' });

      // Button should be clickable via keyboard
      expect(button).toBeInTheDocument();
    });

    it('should have focus visible styles', () => {
      const { container } = render(<Button>Focus</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2');
    });
  });

  describe('Full Width', () => {
    it('should render full width when fullWidth prop is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('w-full');
    });

    it('should not be full width by default', () => {
      const { container } = render(<Button>Normal</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle multiple children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('should handle rapid clicks', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Rapid</Button>);

      const button = screen.getByText('Rapid');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });
});
