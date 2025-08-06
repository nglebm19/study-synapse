import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-2">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Lecture Assistant
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/auth")}
            className="text-sm font-medium hover:bg-accent transition-colors"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/auth")}
            className="text-sm font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;