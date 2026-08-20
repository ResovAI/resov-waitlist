import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Resov: The AI-Powered Application Management Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0E17',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '0 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div
            style={{
              background: '#FE3324',
              color: 'white',
              fontSize: 22,
              fontWeight: 700,
              padding: '8px 20px',
              borderRadius: 8,
              letterSpacing: '-0.04em',
            }}
          >
            Resov
          </div>
          <div
            style={{
              marginLeft: 14,
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 14,
              fontWeight: 500,
              padding: '5px 14px',
              borderRadius: 999,
            }}
          >
            Coming Soon
          </div>
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 900,
          }}
        >
          The AI-Powered Application Management Platform
        </div>

        <div
          style={{
            fontSize: 22,
            color: '#6B7280',
            textAlign: 'center',
            marginTop: 28,
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          Templates, AI vetting, verification, scoring, and ranking for grants, fellowships, and challenges.
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FE3324' }} />
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
            tryresov.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
