import React from "react";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
}

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
