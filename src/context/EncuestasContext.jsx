import { createContext, useState, useContext } from 'react';

export const EncuestasContext = createContext();

export function EncuestasProvider({ children }) {  // Cambiado de CategoryProvider a EncuestasProvider
  const [categories, setCategories] = useState([]);
  // Aquí puedes añadir más estados que necesites para las encuestas
  const [encuestas, setEncuestas] = useState([]);
  const [currentEncuesta, setCurrentEncuesta] = useState(null);
  
  return (
    <EncuestasContext.Provider 
      value={{ 
        categories, 
        setCategories,
        encuestas,
        setEncuestas,
        currentEncuesta,
        setCurrentEncuesta
        // Agrega aquí cualquier otro valor que necesites
      }}
    >
      {children}
    </EncuestasContext.Provider>
  );
}

// Este hook puede mantenerse igual
export function useCategories() {
  return useContext(EncuestasContext);
}

// Puedes añadir también un hook más general
export function useEncuestas() {
  return useContext(EncuestasContext);
}