export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  filters?: FilterOption[];
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value?: any;
  type: 'checkbox' | 'select' | 'range';
  options?: { label: string; value: any }[];
}

export interface GridLayoutProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: number;
  responsive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface AnimationConfig {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  duration?: number;
  delay?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

export interface AccessibilityProps {
  ariaLabel?: string;
  ariaDescription?: string;
  role?: string;
  tabIndex?: number;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
}