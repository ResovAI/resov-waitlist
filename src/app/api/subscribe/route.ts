import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/resend';

const schema = z.object({
  email: z.string().email(),
  role: z.enum(['donor', 'applicant']),
});

function getAudienceId(role: 'donor' | 'applicant'): string {
  if (role === 'donor') return process.env.RESEND_DONOR_AUDIENCE_ID ?? '';
  return process.env.RESEND_APPLICANT_AUDIENCE_ID ?? '';
}

function getFromEmail(): string {
  return process.env.FROM_EMAIL ?? 'no-reply@resov.com';
}

function confirmationEmailHtml(role: 'donor' | 'applicant'): string {
  const roleMessage =
    role === 'donor'
      ? "We'll notify donors first when we launch."
      : 'Start finding funding the day we go live.';
  const roleLabel = role === 'donor' ? 'Donor' : 'Applicant';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body{font-family:sans-serif;background:#F9FAFB;margin:0;padding:0}
    .wrap{max-width:480px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden}
    .hd{background:#0A0E17;padding:32px;text-align:center}
    .hd span{color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.04em}
    .bd{padding:40px 32px;text-align:center}
    .ttl{font-size:24px;font-weight:700;color:#0A0E17;margin:0 0 12px}
    .msg{font-size:16px;color:#6B7280;line-height:1.6;margin:0 0 24px}
    .badge{display:inline-block;background:#FEF2F2;color:#FE3324;font-size:13px;font-weight:600;padding:6px 16px;border-radius:999px}
    .ft{padding:24px 32px;text-align:center;border-top:1px solid #E5E7EB}
    .ft p{font-size:13px;color:#9CA3AF;margin:0}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hd"><span>Resov</span></div>
    <div class="bd">
      <p class="ttl">You're in!</p>
      <p class="msg">${roleMessage}</p>
      <span class="badge">${roleLabel} Waitlist</span>
    </div>
    <div class="ft">
      <p>© ${new Date().getFullYear()} Resov · Built by CSG Development</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const { email, role } = result.data;
  const audienceId = getAudienceId(role);

  const { error: contactError } = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  });

  if (contactError) {
    if (contactError.name === 'validation_error') {
      return NextResponse.json({ message: "You're already on the list!" });
    }
    console.error('Resend contacts error:', contactError);
    return NextResponse.json(
      { message: 'Something went wrong, please try again' },
      { status: 500 }
    );
  }

  const { error: emailError } = await resend.emails.send({
    from: `Resov <${getFromEmail()}>`,
    to: email,
    subject: "You're on the Resov waitlist!",
    html: confirmationEmailHtml(role),
  });

  if (emailError) {
    console.error('Resend email error:', emailError);
  }

  return NextResponse.json({ message: 'Success' });
}
