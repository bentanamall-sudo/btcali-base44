import { themes } from '@/lib/useTheme';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300',
            theme === t.id
              ? 'ring-2 ring-primary scale-110 glow-primary'
              : 'glass opacity-60 hover:opacity-100'
          )}
          title={t.name}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}