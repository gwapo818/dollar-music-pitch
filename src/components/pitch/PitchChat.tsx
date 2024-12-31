import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { polishPitch } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";

type PitchChatProps = {
  currentPitch: string;
  onUpdatePitch: (newPitch: string) => void;
};

const PitchChat = ({ currentPitch, onUpdatePitch }: PitchChatProps) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      const prompt = `Based on this pitch: "${currentPitch}", and considering this feedback: "${message}", generate an improved version of the pitch that incorporates the feedback while maintaining the key information.`;
      const enhancedPitch = await polishPitch(prompt, true);
      onUpdatePitch(enhancedPitch);
      setMessage("");
      toast({
        title: "Pitch Updated",
        description: "Your pitch has been updated based on your feedback.",
      });
    } catch (error: any) {
      console.error('Error processing feedback:', error);
      toast({
        title: "Error",
        description: "Failed to process your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6 space-y-2">
      <p className="text-sm text-white/70">
        Suggest changes or ask for improvements to your pitch
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your suggestions here..."
          className="flex-1 bg-[#1A1F2C] border-[#9b87f5]/20 text-white placeholder:text-white/50"
          disabled={isProcessing}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isProcessing}
          className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default PitchChat;