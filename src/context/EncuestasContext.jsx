import { createContext, useState, useContext,useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const EncuestasContext = createContext();

export function EncuestasProvider({ children }) { 
  
  // Cargar categorías desde localStorage al iniciar
  const loadCategories = () => {
    try {
      const saved = localStorage.getItem('surveyCategories');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      toast.error(`Error cargando categorías locales: ${error?.message || ''}`);
      return [];
    }
  };

  const [categories, setCategories] = useState(loadCategories());
  const [encuestas, setEncuestas] = useState([]);
  const [currentEncuesta, setCurrentEncuesta] = useState(null);

   // incronizar cambios en categories con localStorage
  useEffect(() => {
    localStorage.setItem('surveyCategories', JSON.stringify(categories));
  }, [categories]);
  
  return (
    <EncuestasContext.Provider 
      value={{ 
        categories, 
        setCategories,
        encuestas,
        setEncuestas,
        currentEncuesta,
        setCurrentEncuesta

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