import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileText, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

interface ResultsDisplayProps {
  isLoading: boolean;
  loadingStep?: string;
  results?: {
    summary: string;
    transcript: string;
  };
  error?: string;
}

const ResultsDisplay = ({ isLoading, loadingStep, results, error }: ResultsDisplayProps) => {
  // Initial state - don't show anything
  if (!isLoading && !results && !error) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-scale"></div>
            <Loader2 className="h-16 w-16 text-white animate-spin relative z-10" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Processing Your Video</h3>
          <p className="text-lg text-white/80 mb-8 max-w-md">
            {loadingStep || "Analyzing video content with AI..."}
          </p>
          
          {/* Enhanced Loading Steps */}
          <div className="w-full max-w-lg space-y-4">
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400 text-green-400 mr-4 font-semibold text-sm">
                ✓
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-white">Downloading Audio</div>
                <div className="text-sm text-white/60">Converting video to audio stream</div>
              </div>
            </div>
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 text-blue-400 mr-4 font-semibold text-sm">
                2
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-white">Generating Transcript</div>
                <div className="text-sm text-white/60">Processing with Whisper AI</div>
              </div>
              <Loader2 className="h-4 w-4 text-blue-400 animate-spin ml-4" />
            </div>
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/30 text-white/60 mr-4 font-semibold text-sm">
                3
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-white/60">Creating Summary</div>
                <div className="text-sm text-white/40">Analyzing with language model</div>
              </div>
              <div className="w-4 h-4 ml-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="backdrop-blur-xl bg-white/10 border border-red-400/30 shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-red-500/20 p-6 mb-4">
            <AlertCircle className="h-12 w-12 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-red-400">Processing Failed</h3>
          <p className="text-white/80 max-w-md">
            {error || "Sorry, we couldn't process this video. Please check the URL and try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Success state with results
  if (results) {
    return (
      <div className="w-full space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3 text-green-400 bg-green-500/20 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
          <CheckCircle className="h-6 w-6" />
          <span className="font-semibold text-lg">Processing completed successfully!</span>
        </div>

        {/* Desktop: Two-column layout for large screens */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Summary Section */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl text-white">
                <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-2">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                AI Summary
              </CardTitle>
              <CardDescription className="text-base text-white/70">
                Key points and insights extracted from the lecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-base max-w-none">
                <div className="whitespace-pre-wrap text-white leading-relaxed text-base">
                  {results.summary}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcript Section */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl text-white">
                <div className="rounded-lg bg-white/20 p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Full Transcript
              </CardTitle>
              <CardDescription className="text-base text-white/70">
                Complete transcription of the video content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-base max-w-none">
                <div className="whitespace-pre-wrap text-white leading-relaxed text-base max-h-96 overflow-y-auto">
                  {results.transcript}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultsDisplay;