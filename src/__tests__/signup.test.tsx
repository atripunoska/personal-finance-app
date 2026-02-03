import { render, screen } from '@testing-library/react';

// Mock register action
jest.mock('../lib/actions', () => ({
  register: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock useActionState and useFormStatus
let mockErrorMessage: string | undefined = undefined;
const mockDispatch = jest.fn();

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useActionState: () => [mockErrorMessage, mockDispatch],
  };
});

jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom');
  return {
    ...actual,
    useFormStatus: () => ({ pending: false }),
  };
});

import RegisterPage from '@/app/signup/page';

describe('RegisterPage', () => {
  beforeEach(() => {
    mockErrorMessage = undefined;
  });

  it('renders the Create Account heading', () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole('heading', { name: /create account/i })
    ).toBeInTheDocument();
  });

  it('renders name, email, and password inputs', () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders name input with correct attributes', () => {
    render(<RegisterPage />);
    const name = screen.getByLabelText(/name/i);
    expect(name).toHaveAttribute('type', 'text');
    expect(name).toHaveAttribute('placeholder', 'Your Name');
    expect(name).toBeRequired();
  });

  it('renders email input with correct attributes', () => {
    render(<RegisterPage />);
    const email = screen.getByLabelText(/email/i);
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('placeholder', 'your@email.com');
    expect(email).toBeRequired();
  });

  it('renders password input with correct attributes', () => {
    render(<RegisterPage />);
    const password = screen.getByLabelText(/password/i);
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('minLength', '6');
    expect(password).toBeRequired();
  });

  it('displays password hint text', () => {
    render(<RegisterPage />);
    expect(
      screen.getByText(/must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it('renders the submit button with "Create account" text', () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole('button', { name: /create account/i })
    ).toBeInTheDocument();
  });

  it('renders a link to the login page', () => {
    render(<RegisterPage />);
    const link = screen.getByRole('link', { name: /log in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('does not show an error message by default', () => {
    render(<RegisterPage />);
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/already registered/i)).not.toBeInTheDocument();
  });

  it('displays an error message when present', () => {
    mockErrorMessage = 'Email already registered.';
    render(<RegisterPage />);
    expect(screen.getByText('Email already registered.')).toBeInTheDocument();
  });

  it('submit button is not disabled when not pending', () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole('button', { name: /create account/i })
    ).not.toBeDisabled();
  });

  it('displays "Already have an account?" text', () => {
    render(<RegisterPage />);
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });
});
