import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/resend', () => ({
  resend: {
    contacts: {
      create: vi.fn(),
    },
    emails: {
      send: vi.fn(),
    },
  },
}));

import { resend } from '@/lib/resend';
import { POST } from './route';

const mockCreate = resend.contacts.create as ReturnType<typeof vi.fn>;
const mockSend = resend.emails.send as ReturnType<typeof vi.fn>;

function makeRequest(body: unknown): NextRequest {
  return new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_DONOR_AUDIENCE_ID = 'aud_donor_test';
    process.env.RESEND_APPLICANT_AUDIENCE_ID = 'aud_applicant_test';
    process.env.FROM_EMAIL = 'no-reply@resov.com';
    mockCreate.mockResolvedValue({ data: { id: 'c_1' }, error: null });
    mockSend.mockResolvedValue({ data: { id: 'e_1' }, error: null });
  });

  it('adds donor to donor audience and sends confirmation email', async () => {
    const res = await POST(makeRequest({ email: 'donor@example.com', role: 'donor' }));
    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledWith({
      audienceId: 'aud_donor_test',
      email: 'donor@example.com',
      unsubscribed: false,
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'donor@example.com',
        subject: "You're on the Resov waitlist!",
      })
    );
  });

  it('adds applicant to applicant audience', async () => {
    const res = await POST(makeRequest({ email: 'ap@example.com', role: 'applicant' }));
    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ audienceId: 'aud_applicant_test' })
    );
  });

  it('returns 400 for invalid email', async () => {
    const res = await POST(makeRequest({ email: 'not-an-email', role: 'donor' }));
    expect(res.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid role', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com', role: 'admin' }));
    expect(res.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns 200 with already-on-list message for duplicate contact', async () => {
    mockCreate.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'Contact already exists' },
    });
    const res = await POST(makeRequest({ email: 'dup@example.com', role: 'donor' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("You're already on the list!");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('returns 500 when Resend contacts API fails with unexpected error', async () => {
    mockCreate.mockResolvedValue({
      data: null,
      error: { name: 'api_error', message: 'Internal server error' },
    });
    const res = await POST(makeRequest({ email: 'test@example.com', role: 'donor' }));
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });
});
