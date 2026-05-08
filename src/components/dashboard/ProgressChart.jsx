import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../GlassCard';

const data = [
  { week: 'W1', xp: 120 },
  { week: 'W2', xp: 280 },
  { week: 'W3', xp: 450 },
  { week: 'W4', xp: 580 },
  { week: 'W5', xp: 750 },
  { week: 'W6', xp: 920 },
  { week: 'W7', xp: 1240 },
];

export default function ProgressChart() {
  return (
    <GlassCard glow hover={false}>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">XP Growth</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="hsl(var(--primary))"
              fill="url(#xpGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}