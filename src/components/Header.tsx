import React from "react";

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
