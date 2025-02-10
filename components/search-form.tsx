"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }>;
  citations: Array<string>;
}

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();

      console.debug("This is respnse in component", data);
      setResult(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter keyword or question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg placeholder:text-lg"
          />
          <Button type="submit" disabled={loading}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {result && (
        <Card className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            {result?.citations?.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-2">Citations</h3>
                <ol className="list-decimal pl-5">
                  {result.citations.map((citation, index) => (
                    <li key={index}>
                      <a
                        href={citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {citation}
                      </a>
                    </li>
                  ))}
                </ol>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  Show answer
                </Button>
                {showAnswer && (
                  <p className="whitespace-pre-wrap">
                    {result?.choices?.map((choice) => (
                      <span key={choice.index}>{choice.message.content}</span>
                    ))}
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
