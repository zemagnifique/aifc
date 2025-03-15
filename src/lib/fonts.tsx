import { useEffect } from "react";

// Helper function to load custom fonts and apply them globally
export const WebfontLoader = () => {
  // Add custom font CSS variables for Tailwind to use
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --font-bebas: 'Bebas Neue', cursive;
        --font-roboto: 'Roboto', sans-serif;
        --font-anton: 'Anton', sans-serif;
      }
      
      .font-bebas {
        font-family: var(--font-bebas);
      }
      
      .font-anton {
        font-family: var(--font-anton);
      }
      
      .font-roboto {
        font-family: var(--font-roboto);
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function to remove the style on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
