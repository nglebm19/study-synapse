import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, User, Lock, Trash2, Upload, Key } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AccountSettings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    avatarUrl: ""
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      // TODO: Fetch from profiles table once database is set up
      // For now, use mock data or default values
      console.log("Profile fetch - will be implemented after database setup");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // TODO: Update profiles table and upload avatar once database is set up
      console.log("Profile update - will be implemented after database setup", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatarFile: avatarFile?.name
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      try {
        await signOut();
        toast({
          title: "Account Deletion",
          description: "Please contact support to complete account deletion"
        });
        navigate("/");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initiate account deletion",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Synapse
            </h1>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your personal information and account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {profile.firstName?.charAt(0) || profile.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors">
                        <Upload className="h-4 w-4" />
                        <span>Upload Avatar</span>
                      </div>
                    </Label>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF (max 5MB)
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password & Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Feature Coming Soon",
                  description: "Password change functionality will be available in the next update"
                });
              }}>
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* HuggingFace Token Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                HuggingFace Integration
              </CardTitle>
              <CardDescription>
                Add your HuggingFace token to enable AI model features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "HuggingFace Token",
                    description: "Please add your HuggingFace token in the form below"
                  });
                }}
              >
                Configure HuggingFace Token
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Your token will be securely stored and only used for AI model requests
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;