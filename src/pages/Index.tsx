import { useState } from "react";
import Header from "@/components/Header";
import ToolInterface from "@/components/ToolInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [results, setResults] = useState<{ summary: string; transcript: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (videoUrl: string, selectedModel: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    try {
      // Simulate the multi-step process
      setLoadingStep("Step 1/3: Extracting audio...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLoadingStep("Step 2/3: Generating transcript...");
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setLoadingStep("Step 3/3: Creating summary...");
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful response
      const mockResults = {
        summary: `**Key Concepts from the Lecture:**

• **Machine Learning Fundamentals**: Introduction to supervised and unsupervised learning algorithms
• **Data Preprocessing**: Importance of data cleaning, normalization, and feature selection
• **Model Training**: Overview of training processes, validation techniques, and hyperparameter tuning
• **Performance Evaluation**: Metrics for assessing model accuracy, precision, recall, and F1-score
• **Overfitting and Underfitting**: Understanding bias-variance tradeoff and regularization techniques
• **Real-world Applications**: Case studies in computer vision, natural language processing, and recommendation systems

**Main Takeaways:**
- Start with simple models before moving to complex ones
- Always validate your models on unseen data
- Feature engineering is often more important than algorithm selection
- Consider computational costs and interpretability requirements`,
        
        transcript: `Welcome everyone to today's lecture on Machine Learning Fundamentals. I'm Professor Smith, and today we'll be covering the essential concepts that form the foundation of modern machine learning.

Let's start with the basics. Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.

There are three main types of machine learning: supervised learning, where we train models on labeled data; unsupervised learning, where we find patterns in unlabeled data; and reinforcement learning, where agents learn through interaction with their environment.

Data preprocessing is crucial for successful machine learning projects. This includes cleaning the data, handling missing values, normalizing features, and selecting the most relevant attributes for your problem.

When training models, it's important to split your data into training, validation, and test sets. The training set is used to teach the model, the validation set helps tune hyperparameters, and the test set provides an unbiased evaluation of the final model.

Overfitting occurs when a model learns the training data too well, including noise and irrelevant patterns. This leads to poor performance on new, unseen data. Techniques like regularization, cross-validation, and early stopping can help prevent overfitting.

In conclusion, successful machine learning requires understanding your data, choosing appropriate algorithms, and carefully evaluating model performance. Remember, the goal is to build models that generalize well to new data, not just perform well on training data.

Thank you for your attention. Next week, we'll dive deeper into specific algorithms starting with linear regression.`
      };

      setResults(mockResults);
      toast({
        title: "Success!",
        description: "Video processing completed successfully"
      });
      
    } catch (err) {
      setError("Failed to process video. Please check the URL and try again.");
      toast({
        title: "Processing Failed",
        description: "Something went wrong while processing your video",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      <Header />
      
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Create summaries with{" "}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Synapse
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Transform any YouTube lecture into comprehensive summaries using advanced AI models
          </p>
          
          {/* Centered Tool Interface */}
          <div className="pt-8">
            <ToolInterface onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        </div>

        {/* Results Display - Only show when there's content */}
        {(isLoading || results || error) && (
          <div className="w-full max-w-6xl mx-auto mt-16 px-4">
            <ResultsDisplay 
              isLoading={isLoading}
              loadingStep={loadingStep}
              results={results}
              error={error}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
