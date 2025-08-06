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
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-card to-accent/10 animate-fade-in-up">
      <CardHeader className="text-center pb-8">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
          <div className="rounded-lg bg-gradient-to-br from-red-500 to-red-600 p-2">
            <Youtube className="h-7 w-7 text-white" />
          </div>
          Transform YouTube Lectures into Summaries
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground mt-3 max-w-md mx-auto">
          Enter a YouTube video URL and select an AI model to generate an intelligent summary with full transcript
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 px-8 pb-8">
        <div className="space-y-3">
          <label htmlFor="youtube-url" className="text-sm font-semibold text-foreground">
            YouTube Video URL
          </label>
          <Input
            id="youtube-url"
            type="text"
            placeholder="Paste a YouTube video link here... (e.g., https://youtube.com/watch?v=...)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={`h-12 text-base transition-all duration-200 ${
              videoUrl && !isValidYouTubeUrl(videoUrl) 
                ? "border-destructive focus-visible:ring-destructive" 
                : "focus-visible:ring-primary/50"
            }`}
          />
          {videoUrl && !isValidYouTubeUrl(videoUrl) && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-destructive rounded-full"></span>
              Please enter a valid YouTube URL
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label htmlFor="model-select" className="text-sm font-semibold text-foreground">
            AI Model Selection
          </label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Choose an AI model for processing" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_MODELS.llm.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-base py-3">
                  {model.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Zap className="mr-3 h-6 w-6" />
          {isLoading ? "Generating..." : "Generate Summary"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolInterface;