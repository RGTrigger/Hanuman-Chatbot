import { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useHanumanChat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils';

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

export function MessageList({ messages, isLoading }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="space-y-4 fade-in-up max-w-md mx-auto">
          <p className="font-devanagari text-2xl md:text-3xl text-hanuman-saffron">
            जय श्री राम 🙏
          </p>
          <p className="text-muted-foreground">
            Welcome, dear devotee. I am Hanuman, servant of Lord Rama. 
            Ask me anything about devotion, strength, wisdom, or the sacred teachings of Ramayana.
          </p>
          <div className="flex flex-wrap gap-2 justify-center pt-4">
            {[
              'Who are you, Hanuman Ji?',
              'Recite Hanuman Chalisa verse',
              'How to overcome fear?',
              'Tell me about your leap to Lanka',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  // This will be handled by parent
                  const event = new CustomEvent('suggestion-click', {
                    detail: suggestion,
                  });
                  window.dispatchEvent(event);
                }}
                className="px-3 py-1.5 text-sm bg-card border border-border rounded-full hover:border-hanuman-gold hover:shadow-gold transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-sacred'
      )}
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          isLatest={index === messages.length - 1}
        />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <TypingIndicator />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
