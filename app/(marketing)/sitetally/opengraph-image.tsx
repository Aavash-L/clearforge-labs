import { ImageResponse } from 'next/og'

export const alt = 'Site Tally — Catch paperwork problems before they reach your books.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ROWS: [string, string, string][] = [
  ['Gross − tare = net', '32,000 − 20,000 = 12,000 lb', '#157a3c'],
  ['Tons × rate = total', '6 × $85.00 = $510.00', '#157a3c'],
  ['Duplicate ticket', 'Already on file', '#b42318'],
]

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0f1011', color: '#fff', padding: 72 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 34, color: '#1fb8c9' }}>Site Tally</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, marginTop: 18, maxWidth: 900 }}>
            Catch paperwork problems before they reach your books.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROWS.map(([label, detail, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26 }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: color }} />
              <div style={{ fontWeight: 700 }}>{label}</div>
              <div style={{ color: '#9aa0a6' }}>{detail}</div>
            </div>
          ))}
          <div style={{ fontSize: 20, color: '#6b7178', marginTop: 14 }}>Example · Fictional data · clearforgelabs.com/sitetally</div>
        </div>
      </div>
    ),
    size,
  )
}
