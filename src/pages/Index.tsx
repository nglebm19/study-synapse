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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Synapse
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transform YouTube lectures into intelligent summaries using advanced AI models. 
            Extract key insights, generate transcripts, and make learning more efficient.
          </p>
        </div>

        {/* Tool Interface */}
        <ToolInterface onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Results Display */}
        <ResultsDisplay 
          isLoading={isLoading}
          loadingStep={loadingStep}
          results={results}
          error={error}
        />
      </main>
    </div>
  );
};

export default Index;
