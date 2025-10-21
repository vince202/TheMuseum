import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from '@/components/UI/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render when isOpen is true', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('should not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('should render without title', () => {
      render(<Modal {...defaultProps} title={undefined} />);
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      const { container } = render(<Modal {...defaultProps} size="sm" />);
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('max-w-md');
    });

    it('should apply medium size styles (default)', () => {
      const { container } = render(<Modal {...defaultProps} size="md" />);
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('max-w-2xl');
    });

    it('should apply large size styles', () => {
      const { container } = render(<Modal {...defaultProps} size="lg" />);
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('max-w-4xl');
    });

    it('should apply extra-large size styles', () => {
      const { container } = render(<Modal {...defaultProps} size="xl" />);
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('max-w-6xl');
    });
  });

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const backdrop = document.querySelector('.bg-black.bg-opacity-50');
      fireEvent.click(backdrop!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Escape key is pressed', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on other key presses', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'A' });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Body Scroll Management', () => {
    it('should prevent body scroll when modal is open', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);

      waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });

    it('should cleanup on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      unmount();

      waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper dialog role', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal attribute', () => {
      render(<Modal {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby when title is present', () => {
      render(<Modal {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('should not have aria-labelledby when title is absent', () => {
      render(<Modal {...defaultProps} title={undefined} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
    });

    it('should have backdrop with aria-hidden', () => {
      const { container } = render(<Modal {...defaultProps} />);
      const backdrop = container.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe('Content Overflow', () => {
    it('should have scrollable content area', () => {
      render(<Modal {...defaultProps} />);
      const contentArea = screen.getByText('Modal Content').parentElement;
      expect(contentArea).toHaveClass('overflow-y-auto');
      expect(contentArea).toHaveClass('max-h-[70vh]');
    });

    it('should render large content without breaking', () => {
      const largeContent = (
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>Line {i}</p>
          ))}
        </div>
      );

      render(
        <Modal {...defaultProps}>
          {largeContent}
        </Modal>
      );

      expect(screen.getByText('Line 0')).toBeInTheDocument();
      expect(screen.getByText('Line 99')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid open/close', async () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      for (let i = 0; i < 5; i++) {
        rerender(<Modal {...defaultProps} isOpen={false} />);
        rerender(<Modal {...defaultProps} isOpen={true} />);
      }

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });
    });

    it('should handle multiple onClose calls', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(3);
    });

    it('should render with custom className', () => {
      const { container } = render(
        <Modal {...defaultProps} className="custom-modal-class" />
      );
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('custom-modal-class');
    });
  });

  describe('Animation', () => {
    it('should have animation classes', () => {
      const { container } = render(<Modal {...defaultProps} />);
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toBeInTheDocument();
    });

    it('should trigger exit animation on close', async () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      rerender(<Modal {...defaultProps} isOpen={false} />);

      await waitFor(() => {
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      });
    });
  });
});
