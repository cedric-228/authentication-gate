import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIAssistant, useAISuggestions, useGenerateSuggestions, useAcceptSuggestion, useRejectSuggestion } from "@/hooks/useAI";
import { useToast } from "@/hooks/use-toast";
import { Bot, Sparkles, Clock, MapPin, DollarSign, Users, Check, X, Loader2, Brain, Zap } from "lucide-react";

const AIAssistantPage = () => {
  const { toast } = useToast();
  
  const { data: assistant, isLoading: assistantLoading } = useAIAssistant();
  const { data: suggestions, isLoading: suggestionsLoading } = useAISuggestions();
  const generateMutation = useGenerateSuggestions();
  const acceptMutation = useAcceptSuggestion();
  const rejectMutation = useRejectSuggestion();

  const handleGenerateSuggestions = async () => {
    try {
      await generateMutation.mutateAsync(3);
      toast({
        title: "Suggestions générées !",
        description: "L'IA a créé de nouvelles suggestions personnalisées pour vous.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer des suggestions. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleAcceptSuggestion = async (suggestionId: number) => {
    try {
      const result = await acceptMutation.mutateAsync(suggestionId);
      toast({
        title: "Mission créée !",
        description: "La suggestion a été convertie en mission active.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accepter la suggestion. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleRejectSuggestion = async (suggestionId: number) => {
    try {
      await rejectMutation.mutateAsync(suggestionId);
      toast({
        title: "Suggestion rejetée",
        description: "La suggestion a été supprimée de votre liste.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter la suggestion. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (assistantLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement de l'assistant IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">{assistant?.avatar}</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {assistant?.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {assistant?.description}
          </p>
        </div>

        {/* Capabilities */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-8 mb-8 border">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6" />
            Mes capacités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assistant?.capabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <Zap className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12">
          <Button 
            onClick={handleGenerateSuggestions}
            disabled={generateMutation.isPending}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5" />
                Générer des suggestions personnalisées
              </>
            )}
          </Button>
        </div>

        {/* Suggestions */}
        <div className="space-y-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Mes suggestions pour vous
          </h2>
          
          {suggestionsLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Chargement des suggestions...</p>
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suggestions
                .filter(s => s.status === 'suggested')
                .map((suggestion) => (
                  <Card key={suggestion.id} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-3">{suggestion.title}</CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={suggestion.is_paid ? "default" : "secondary"}>
                              {suggestion.is_paid ? "Rémunéré" : "Bénévole"}
                            </Badge>
                            <Badge variant="outline">{suggestion.category}</Badge>
                            <Badge variant="outline" className="capitalize">
                              {suggestion.difficulty_level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {suggestion.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {suggestion.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {suggestion.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {suggestion.amount || 'Non spécifié'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {suggestion.skills.length} compétences
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Compétences requises :</p>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                          disabled={acceptMutation.isPending}
                          className="flex-1"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accepter
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                          disabled={rejectMutation.isPending}
                          className="flex-1"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Rejeter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bot className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
              <h3 className="font-heading text-2xl font-semibold mb-4">Aucune suggestion disponible</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Cliquez sur "Générer des suggestions" pour que l'IA crée des projets personnalisés adaptés à votre profil et vos compétences.
              </p>
              <Button 
                onClick={handleGenerateSuggestions}
                disabled={generateMutation.isPending}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Générer mes premières suggestions
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;

