import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { RecipeCard, type Recipe } from "./components/RecipeCard";

export const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  const fetchDefaultRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            {recipes && recipes.length > 0 ? (
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
