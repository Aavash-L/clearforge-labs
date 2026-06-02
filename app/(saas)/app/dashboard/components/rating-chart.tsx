'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface Props {
  data: { date: string; avg: number }[]
}

export default function RatingChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="h-48 flex items-center justify-center text-sm text-gray-400">
        No rating data yet. Send your first review requests to see trends.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          tickFormatter={v => v.slice(5)}
        />
        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
        <Tooltip
          formatter={(v) => [`${v} ★`, 'Avg rating']}
          labelFormatter={l => `Date: ${l}`}
        />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
