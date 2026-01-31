import { Trash2, RotateCcw } from 'lucide-react';
import hanumanLogo from '@/assets/hanuman-logo.png';

type ChatHeaderProps = {
  onClear: () => void;
  hasMessages: boolean;
};

export function ChatHeader({ onClear, hasMessages }: ChatHeaderProps) {
  return (
    <header className="relative px-4 py-4 border-b border-border bg-gradient-to-b from-card to-background">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-hanuman-gold via-hanuman-saffron to-hanuman-gold" />
      
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={hanumanLogo}
              alt="Hanuman Ji"
              className="w-12 h-12 md:w-14 md:h-14 object-contain float-gentle"
            />
            <div className="absolute inset-0 rounded-full sacred-glow opacity-50" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-gradient-sacred">
              Hanuman Ji
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-devanagari">
              🚩 बजरंगबली • Bajrangbali 🚩
            </p>
          </div>
        </div>

        {hasMessages && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive bg-card border border-border rounded-lg hover:border-destructive/50 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>
    </header>
  );
}
