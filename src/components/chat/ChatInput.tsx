import { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
};

export function ChatInput({ onSend, isLoading, onStop }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end gap-2 bg-card border-2 border-border rounded-2xl p-2 shadow-soft focus-within:border-hanuman-gold focus-within:shadow-gold transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Hanuman Ji for guidance..."
          disabled={isLoading}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground',
            'focus:outline-none text-sm md:text-base',
            'min-h-[40px] max-h-[120px]'
          )}
        />
        
        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300',
              input.trim()
                ? 'bg-gradient-to-r from-hanuman-saffron to-hanuman-vermillion text-primary-foreground shadow-sacred hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
