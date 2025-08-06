import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Zap } from "lucide-react";

// Static model configuration
const AVAILABLE_MODELS = {
  asr: [
    { id: 'openai/whisper-large-v3', displayName: 'High-Quality Transcription (Whisper Large)' }
  ],
  llm: [
    { id: 'mistralai/Mistral-7B-Instruct-v0.2', displayName: 'Fast & Creative (Mistral 7B)' },
    { id: 'meta-llama/Llama-2-13b-chat-hf', displayName: 'Detailed & Thorough (Llama 13B)' }
  ]
};

interface ToolInterfaceProps {
  onGenerate: (videoUrl: string, selectedModel: string) => void;
  isLoading: boolean;
}

const ToolInterface = ({ onGenerate, isLoading }: ToolInterfaceProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const canGenerate = videoUrl && isValidYouTubeUrl(videoUrl) && selectedModel && !isLoading;

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(videoUrl, selectedModel);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <Input
              id="youtube-url"
              type="text"
              placeholder="Ask Synapse to create a blog about..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={`h-16 text-lg bg-white/5 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/20 transition-all duration-200 ${
                videoUrl && !isValidYouTubeUrl(videoUrl) 
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" 
                  : ""
              }`}
            />
            
            {videoUrl && !isValidYouTubeUrl(videoUrl) && (
              <p className="text-sm text-red-300 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                Please enter a valid YouTube URL
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="h-12 bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Choose AI model" className="text-white/60" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20">
                  {AVAILABLE_MODELS.llm.map((model) => (
                    <SelectItem key={model.id} value={model.id} className="text-base py-3">
                      {model.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="h-12 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Zap className="mr-2 h-5 w-5" />
                {isLoading ? "Processing..." : "Generate"}
              </Button>
            </div>

            <div className="text-center text-white/60 text-sm">
              Paste with <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Cmd+V</kbd> • Submit with <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Enter</kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolInterface;