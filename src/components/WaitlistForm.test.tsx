import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WaitlistForm } from './WaitlistForm';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('WaitlistForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email input and both role pill buttons with applicant selected by default', () => {
    render(<WaitlistForm />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button', { type: 'button' });
    expect(buttons[0]).toHaveTextContent('an Applicant');
    expect(buttons[1]).toHaveTextContent('a Donor');
    expect(buttons[0]).toHaveClass('bg-dark');
    expect(buttons[1]).not.toHaveClass('bg-dark');
  });

  it('switches selected role when the other pill is clicked', async () => {
    render(<WaitlistForm />);
    const buttons = screen.getAllByRole('button', { type: 'button' });
    const donorBtn = buttons[1];
    await userEvent.click(donorBtn);
    expect(donorBtn).toHaveClass('bg-dark');
    expect(buttons[0]).not.toHaveClass('bg-dark');
  });

  it('shows applicant-specific success message after successful submission as applicant', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'ap@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/You.?re on the list!/)).toBeInTheDocument();
      expect(screen.getByText('Start finding funding the day we go live.')).toBeInTheDocument();
    });
  });

  it('shows donor-specific success message after successful submission as donor', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    render(<WaitlistForm />);
    const buttons = screen.getAllByRole('button', { type: 'button' });
    await userEvent.click(buttons[1]); // Click donor button
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'donor@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/You.?re on the list!/)).toBeInTheDocument();
      expect(screen.getByText(/We.?ll notify donors first when we launch/)).toBeInTheDocument();
    });
  });

  it('shows success state for duplicate signup (already on list)', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "You're already on the list!" }),
    });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'dup@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/You.?re on the list!/)).toBeInTheDocument();
    });
  });

  it('shows error message when API returns non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Something went wrong, please try again' }),
    });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong, please try again')).toBeInTheDocument();
    });
  });

  it('shows error message when fetch throws (network error)', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong, please try again')).toBeInTheDocument();
    });
  });

  it('disables submit button and shows "Joining..." while request is in flight', async () => {
    let resolveRequest!: (value: unknown) => void;
    mockFetch.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      })
    );

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    expect(screen.getByRole('button', { name: /Joining\.\.\./i })).toBeDisabled();

    resolveRequest({ ok: true, json: async () => ({ message: 'Success' }) });
    await waitFor(() => {
      expect(screen.getByText(/You.?re on the list!/)).toBeInTheDocument();
    });
  });

  it('clears error message on resubmit after a previous failure', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Something went wrong, please try again' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong, please try again')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Join the Waitlist/i }));

    await waitFor(() => {
      expect(screen.queryByText('Something went wrong, please try again')).not.toBeInTheDocument();
      expect(screen.getByText(/You.?re on the list!/)).toBeInTheDocument();
    });
  });
});
