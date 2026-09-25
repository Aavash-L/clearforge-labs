import { ImageResponse } from 'next/og'

export const alt = 'ClearForge Labs — Software products and custom systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0b0c0e', color: '#fff', padding: 72 }}>
        <div style={{ display: 'flex', fontSize: 22, color: '#a4aab2', letterSpacing: 2, textTransform: 'uppercase' }}>New Jersey · Founder-led</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>ClearForge Labs</div>
          <div style={{ fontSize: 44, marginTop: 24, color: '#c9ced4' }}>Software products. Custom systems.</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 22, color: '#1fb8c9' }}>
          <span>Site Tally</span><span style={{ color: '#6f757d' }}>·</span>
          <span>Custom software</span><span style={{ color: '#6f757d' }}>·</span>
          <span>Automation</span><span style={{ color: '#6f757d' }}>·</span>
          <span>Websites</span>
        </div>
      </div>
    ),
    size,
  )
}
