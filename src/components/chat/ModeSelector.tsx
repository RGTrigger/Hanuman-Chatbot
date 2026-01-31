import { ChatMode } from '@/hooks/useHanumanChat';
import { cn } from '@/lib/utils';
import { Heart, Zap, BookOpen } from 'lucide-react';

type ModeSelectorProps = {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
};

const modes = [
  {
    id: 'bhakti' as const,
    label: 'भक्ति',
    sublabel: 'Devotion',
    icon: Heart,
    description: 'Spiritual guidance & mantras',
  },
  {
    id: 'strength' as const,
    label: 'शक्ति',
    sublabel: 'Strength',
    icon: Zap,
    description: 'Courage & overcoming obstacles',
  },
  {
    id: 'wisdom' as const,
    label: 'ज्ञान',
    sublabel: 'Wisdom',
    icon: BookOpen,
    description: 'Philosophy & life lessons',
  },
];

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;

        return (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={cn(
              'group relative flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300',
              'border-2',
              isActive
                ? 'bg-gradient-to-r from-hanuman-saffron to-hanuman-vermillion text-primary-foreground border-transparent shadow-sacred'
                : 'bg-card border-border hover:border-hanuman-gold hover:shadow-gold text-foreground'
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4 transition-transform group-hover:scale-110',
                isActive ? 'text-primary-foreground' : 'text-hanuman-saffron'
              )}
            />
            <span className="font-devanagari text-sm">{m.label}</span>
            <span className="text-xs opacity-80">({m.sublabel})</span>
          </button>
        );
      })}
    </div>
  );
}
