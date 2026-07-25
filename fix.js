const fs = require("fs");

const headerCode = `import React from "react";

export const Header: React.FC = () => {
  return (
    <header style={{ padding: "1rem 2rem", backgroundColor: "#1e293b", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🍳 AI Recipe Finder</h1>
      <nav>
        <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>Powered by TheMealDB</span>
      </nav>
    </header>
  );
};
`;

const recipeCardCode = `import React from "react";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#0f172a" }}>{recipe.strMeal}</h3>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Category: {recipe.strArea || "General"}</p>
      </div>
    </div>
  );
};
`;

const appCode = `import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { RecipeCard } from "./components/RecipeCard";
import { Recipe } from "./types/recipe";
import { searchRecipes, getRandomRecipes } from "./services/recipeService";

export const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDefaultRecipes();
  }, []);

  const loadDefaultRecipes = async () => {
    setLoading(true);
    const data = await getRandomRecipes();
    setRecipes(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    const results = await searchRecipes(searchTerm);
    setRecipes(results);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif" }}>
      <Header />
      <main style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Search recipes like Chicken, Pasta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "1rem" }}
          />
          <button
            type="submit"
            style={{ padding: "0.75rem 1.5rem", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            Search
          </button>
        </form>

        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>Loading recipes...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
            ) : (
              <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#64748b" }}>No recipes found. Try another search!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
`;

fs.writeFileSync("src/components/Header.tsx", headerCode);
fs.writeFileSync("src/components/RecipeCard.tsx", recipeCardCode);
fs.writeFileSync("src/App.tsx", appCode);
console.log("SUCCESS_ALL_FILES_FIXED");

