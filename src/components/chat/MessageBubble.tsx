import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

type MessageBubbleProps = {
  role: 'user' | 'assistant';
  content: string;
  isLatest?: boolean;
};

export function MessageBubble({ role, content, isLatest }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex w-full message-appear',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-soft',
          isUser
            ? 'bg-gradient-to-br from-primary to-hanuman-maroon text-primary-foreground rounded-br-md'
            : 'bg-card border border-border rounded-bl-md'
        )}
      >
        {isUser ? (
          <p className="text-sm md:text-base leading-relaxed">{content}</p>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-hanuman-vermillion">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="font-devanagari text-hanuman-saffron">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
                ),
              }}
            >
              {content || '...'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
