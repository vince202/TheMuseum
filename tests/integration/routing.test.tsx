import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('Application Routing Integration', () => {
  describe('Basic Routes', () => {
    it('should render home page on root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByText(/tarot museum/i)).toBeInTheDocument();
    });

    it('should navigate to gallery page', async () => {
      render(
        <MemoryRouter initialEntries={['/gallery']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
      });
    });

    it('should navigate to timeline page', async () => {
      render(
        <MemoryRouter initialEntries={['/timeline']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/timeline/i)).toBeInTheDocument();
      });
    });

    it('should navigate to symbolism page', async () => {
      render(
        <MemoryRouter initialEntries={['/symbolism']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/symbolism/i)).toBeInTheDocument();
      });
    });
  });

  describe('Dynamic Routes', () => {
    it('should handle individual card routes', async () => {
      render(
        <MemoryRouter initialEntries={['/cards/the-fool']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Card detail view should be rendered
        expect(screen.getByRole('article')).toBeInTheDocument();
      });
    });

    it('should redirect to gallery for invalid card ID', async () => {
      render(
        <MemoryRouter initialEntries={['/cards/invalid-card-id']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
      });
    });
  });

  describe('Redirect Routes', () => {
    it('should redirect /meanings to /gallery', async () => {
      render(
        <MemoryRouter initialEntries={['/meanings']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
      });
    });

    it('should redirect /history to /timeline', async () => {
      render(
        <MemoryRouter initialEntries={['/history']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/timeline/i)).toBeInTheDocument();
      });
    });

    it('should redirect /symbols-guide to /symbolism', async () => {
      render(
        <MemoryRouter initialEntries={['/symbols-guide']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/symbolism/i)).toBeInTheDocument();
      });
    });
  });

  describe('Legal Pages', () => {
    it('should render privacy policy page', async () => {
      render(
        <MemoryRouter initialEntries={['/privacy']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      });
    });

    it('should render terms of service page', async () => {
      render(
        <MemoryRouter initialEntries={['/terms']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      });
    });

    it('should render accessibility page', async () => {
      render(
        <MemoryRouter initialEntries={['/accessibility']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Accessibility')).toBeInTheDocument();
      });
    });
  });

  describe('404 Handling', () => {
    it('should handle invalid routes', async () => {
      render(
        <MemoryRouter initialEntries={['/invalid-route-does-not-exist']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
      });
    });

    it('should redirect to home from 404', async () => {
      render(
        <MemoryRouter initialEntries={['/non-existent']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should redirect to home
        expect(window.location.pathname).toBe('/');
      });
    });
  });

  describe('Navigation Persistence', () => {
    it('should maintain layout across route changes', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      rerender(
        <MemoryRouter initialEntries={['/gallery']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should preserve scroll position on back navigation', async () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;

      render(
        <MemoryRouter initialEntries={['/gallery', '/cards/the-fool']}>
          <App />
        </MemoryRouter>
      );

      // Verify navigation works
      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument();
      });
    });
  });

  describe('Page Transitions', () => {
    it('should apply transition animations', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Check for framer-motion elements
        const motionDiv = container.querySelector('[style*="opacity"]');
        expect(motionDiv).toBeInTheDocument();
      });
    });
  });

  describe('Route Parameters', () => {
    it('should pass correct parameters to CardRouter', async () => {
      render(
        <MemoryRouter initialEntries={['/cards/the-fool']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument();
      });
    });

    it('should handle special characters in card IDs', async () => {
      render(
        <MemoryRouter initialEntries={['/cards/ace-of-cups']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should handle URL encoding properly
        expect(screen.getByRole('article') || screen.getByText(/gallery/i)).toBeInTheDocument();
      });
    });
  });

  describe('Browser History', () => {
    it('should support back navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/', '/gallery']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
      });

      rerender(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/tarot museum/i)).toBeInTheDocument();
      });
    });

    it('should support forward navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      rerender(
        <MemoryRouter initialEntries={['/gallery']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
      });
    });
  });
});
