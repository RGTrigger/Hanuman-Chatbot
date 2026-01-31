import { useEffect } from 'react';
import { useHanumanChat } from '@/hooks/useHanumanChat';
import { ChatHeader } from './ChatHeader';
import { ModeSelector } from './ModeSelector';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function HanumanChatbot() {
  const {
    messages,
    isLoading,
    mode,
    setMode,
    sendMessage,
    clearChat,
    stopGeneration,
  } = useHanumanChat();

  // Handle suggestion clicks
  useEffect(() => {
    const handleSuggestion = (e: CustomEvent<string>) => {
      sendMessage(e.detail);
    };

    window.addEventListener('suggestion-click', handleSuggestion as EventListener);
    return () => {
      window.removeEventListener('suggestion-click', handleSuggestion as EventListener);
    };
  }, [sendMessage]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Decorative background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyNiAxMEwzNSAxMEwyOCAyMEwzMiAzMEwyMCAyNUw4IDMwTDEyIDIwTDUgMTBMMTQgMTBaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L3N2Zz4=')] bg-repeat" />
      
      <ChatHeader onClear={clearChat} hasMessages={messages.length > 0} />
      
      <div className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto">
          <ModeSelector mode={mode} onModeChange={setMode} />
        </div>
      </div>
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
        
        <div className="p-4 border-t border-border bg-gradient-to-t from-card to-transparent">
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            onStop={stopGeneration}
          />
          <p className="text-center text-xs text-muted-foreground mt-2">
            🙏 Jai Shree Ram • Powered by Divine Wisdom
          </p>
        </div>
      </main>
    </div>
  );
}
