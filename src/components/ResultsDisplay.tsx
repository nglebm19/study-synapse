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
  // Initial state - show placeholder
  if (!isLoading && !results && !error) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-0 shadow-lg bg-gradient-to-br from-card to-accent/5 animate-fade-in-up">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-gradient-to-br from-accent to-accent/50 p-8 mb-6 shadow-lg">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Process</h3>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Enter a YouTube video URL and select an AI model above to generate an intelligent summary and full transcript
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Powered by advanced AI models</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-gradient-to-br from-card to-accent/5">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-scale"></div>
            <Loader2 className="h-16 w-16 text-primary animate-spin relative z-10" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-foreground">Processing Your Video</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            {loadingStep || "Analyzing video content with AI..."}
          </p>
          <div className="w-full max-w-lg space-y-4">
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-4 font-semibold text-sm">
                1
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-foreground">Extracting Audio</div>
                <div className="text-sm text-muted-foreground">Converting video to audio stream</div>
              </div>
              <CheckCircle className="h-5 w-5 text-primary ml-4" />
            </div>
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground mr-4 font-semibold text-sm">
                2
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-muted-foreground">Generating Transcript</div>
                <div className="text-sm text-muted-foreground">Processing with Whisper AI</div>
              </div>
              <div className="w-5 h-5 ml-4" />
            </div>
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground mr-4 font-semibold text-sm">
                3
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-muted-foreground">Creating Summary</div>
                <div className="text-sm text-muted-foreground">Analyzing with language model</div>
              </div>
              <div className="w-5 h-5 ml-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-destructive/20">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-destructive/10 p-6 mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-destructive">Processing Failed</h3>
          <p className="text-muted-foreground max-w-md">
            {error || "Sorry, we couldn't process this video. Please check the URL and try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Success state with results
  if (results) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3 text-primary bg-gradient-to-r from-accent to-accent/50 p-4 rounded-lg border border-primary/10">
          <CheckCircle className="h-6 w-6" />
          <span className="font-semibold text-lg">Processing completed successfully!</span>
        </div>

        {/* Desktop: Two-column layout for large screens */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Summary Section */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-2">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                AI Summary
              </CardTitle>
              <CardDescription className="text-base">
                Key points and insights extracted from the lecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-base max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-base">
                  {results.summary}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcript Section */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-lg bg-gradient-to-br from-accent-foreground to-accent-foreground/80 p-2">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                Full Transcript
              </CardTitle>
              <CardDescription className="text-base">
                Complete transcription of the video content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-base max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-base max-h-96 overflow-y-auto">
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