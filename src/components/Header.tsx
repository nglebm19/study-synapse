import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-white hover:text-white/90 transition-colors duration-200"
            >
              Synapse
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
            <Button 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;