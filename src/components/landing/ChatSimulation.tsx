import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  delay: number;
}

const MESSAGES: Message[] = [
  { 
    id: 1, 
    text: "Olá! Quero agendar um corte para amanhã.", 
    isBot: false, 
    delay: 500 
  },
  { 
    id: 2, 
    text: "Oi! 👋 Tenho horários livres às 10:00, 14:30 e 18:00. Qual prefere?", 
    isBot: true, 
    delay: 2500 
  },
  { 
    id: 3, 
    text: "Pode ser às 18:00!", 
    isBot: false, 
    delay: 4500 
  },
  { 
    id: 4, 
    text: "Agendado! ✅ Te vejo amanhã às 18:00. Enviarei um lembrete antes.", 
    isBot: true, 
    delay: 6000 
  },
];

export function ChatSimulation() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    const runAnimation = () => {
      setVisibleMessages([]);
      setIsTyping(false);
      
      let currentTime = 0;

      MESSAGES.forEach((msg) => {
        // Show typing indicator before bot messages
        if (msg.isBot) {
            const typingStart = currentTime + (msg.delay - 1000); // Start typing 1s before msg
            if (typingStart > currentTime) {
                timeouts.push(setTimeout(() => setIsTyping(true), typingStart));
            }
        }

        currentTime = msg.delay;
        
        timeouts.push(setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg.id]);
        }, currentTime));
      });

      // Restart loop
      timeouts.push(setTimeout(runAnimation, currentTime + 5000));
    };

    runAnimation();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col justify-end h-full w-full max-w-md mx-auto p-4 space-y-4">
      {MESSAGES.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            "max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm transition-all duration-500 ease-out transform",
            visibleMessages.includes(msg.id)
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 hidden", // hidden helps layout initially
            msg.isBot
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 self-start rounded-tl-none border border-zinc-200 dark:border-zinc-700"
              : "bg-emerald-600 dark:bg-emerald-500 text-white self-end rounded-tr-none shadow-md shadow-emerald-500/20"
          )}
          style={{
             // Ensure layout takes space only when visible to simulate real chat flow
             display: visibleMessages.includes(msg.id) ? 'block' : 'none'
          }}
        >
          {msg.text}
        </div>
      ))}
      
      {/* Typing Indicator */}
      <div className={cn(
        "self-start bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 transition-opacity duration-300",
        isTyping ? "opacity-100" : "opacity-0 hidden"
      )}>
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
