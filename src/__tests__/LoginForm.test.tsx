import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginForm from '../app/ui/LoginForm';

describe('LoginForm', () => {
  it('renders a heading', () => {
    render(<LoginForm />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it('email input is required and of type email', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput.type).toBe('email');
  });

  it('password input is required and of type password', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput.type).toBe('password');
  });
  it('has a sign up link that redirects to the register page', () => {
    render(<LoginForm />);
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toHaveAttribute('href', '/register');
  });
});
