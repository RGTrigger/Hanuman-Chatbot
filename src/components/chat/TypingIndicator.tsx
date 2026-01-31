export function TypingIndicator() {
  return (
    <div className="flex justify-start message-appear">
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-hanuman-saffron typing-dot" />
          <div className="w-2 h-2 rounded-full bg-hanuman-gold typing-dot" />
          <div className="w-2 h-2 rounded-full bg-hanuman-vermillion typing-dot" />
        </div>
      </div>
    </div>
  );
}
