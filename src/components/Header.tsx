import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Lecture Assistant
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/auth")}
            className="text-sm font-medium"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/auth")}
            className="text-sm font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;