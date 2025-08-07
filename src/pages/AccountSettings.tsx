import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Brain, User, Lock, Trash2 } from "lucide-react";
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
    email: user?.email || ""
  });

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // TODO: Update profiles table once database is set up
      console.log("Profile update - will be implemented after database setup", {
        firstName: profile.firstName,
        lastName: profile.lastName
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
              <form onSubmit={handleUpdateProfile} className="space-y-4">
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