import { render, screen } from '@testing-library/react';

// Mock authenticate action - must be before LoginPage import due to hoisting
jest.mock('../lib/actions', () => ({
  authenticate: jest.fn(),
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

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = (props: Record<string, unknown>) => <img {...props} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
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

import LoginPage from '@/app/login/page';

describe('LoginPage', () => {
  beforeEach(() => {
    mockErrorMessage = undefined;
  });

  it('renders the login heading', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders email input with correct type and placeholder', () => {
    render(<LoginPage />);
    const email = screen.getByLabelText(/email/i);
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('placeholder', 'your@email.com');
    expect(email).toBeRequired();
  });

  it('renders password input with correct type', () => {
    render(<LoginPage />);
    const password = screen.getByLabelText(/password/i);
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toBeRequired();
  });

  it('renders the submit button with "Log in" text', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('renders a link to the signup page', () => {
    render(<LoginPage />);
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });

  it('renders the sidebar image', () => {
    render(<LoginPage />);
    const img = screen.getByAltText('Sidebar');
    expect(img).toBeInTheDocument();
  });

  it('does not show an error message by default', () => {
    render(<LoginPage />);
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
  });

  it('displays an error message when present', () => {
    mockErrorMessage = 'Invalid credentials.';
    render(<LoginPage />);
    expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
  });

  it('submit button is not disabled when not pending', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /log in/i })).not.toBeDisabled();
  });
});
