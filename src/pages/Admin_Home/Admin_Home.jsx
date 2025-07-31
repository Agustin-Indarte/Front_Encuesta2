import React, { useState, useEffect } from 'react';
import { AdminHeader, SurveyTable, CategoryModal,  Navbar, AdmFooter } from '../../components';
import styles from './Admin_Home.module.css';
import {useCategories} from '../../context/EncuestasContext'

const initialSurveys = [
  { id: 1, fecha: '19/06/2025', categoria: 'Deportes', nombre: 'Mundial de Clubes' },
  { id: 2, fecha: '23/06/2025', categoria: 'Tecnología', nombre: 'Uso de inteligencia artificial' },
  { id: 3, fecha: '20/06/2025', categoria: 'Salud', nombre: 'Hábitos alimenticios' },
  { id: 4, fecha: '30/06/2025', categoria: 'Cultura', nombre: 'Preferencias musicales' },
  { id: 5, fecha: '01/07/2025', categoria: 'Política', nombre: 'Opinión sobre elecciones 2025' },
  { id: 6, fecha: '07/07/2025', categoria: 'Educacion', nombre: 'Satisfacción de estudiantes' },
  { id: 7, fecha: '10/07/2025', categoria: 'Economía', nombre: 'Inflación en América Latina' },
  { id: 8, fecha: '15/07/2025', categoria: 'Ciencia', nombre: 'Exploración espacial 2025' },
  { id: 9, fecha: '18/07/2025', categoria: 'Medio Ambiente', nombre: 'Cambio climático y ciudades' },
  { id: 10, fecha: '22/07/2025', categoria: 'Entretenimiento', nombre: 'Estrenos de streaming' },
  { id: 11, fecha: '25/07/2025', categoria: 'Negocios', nombre: 'Tendencias de emprendimiento' },
  { id: 12, fecha: '28/07/2025', categoria: 'Salud', nombre: 'Avances en medicina genética' },
  { id: 13, fecha: '02/08/2025', categoria: 'Tecnología', nombre: 'Realidad virtual en educación' },
  { id: 14, fecha: '05/08/2025', categoria: 'Deportes', nombre: 'Juegos Olímpicos Paris 2025' },
  { id: 15, fecha: '09/08/2025', categoria: 'Cultura', nombre: 'Festivales internacionales' }
]

// Función para cargar categorías desde localStorage
const loadCategories = () => {
  try {
    const saved = localStorage.getItem('surveyCategories');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
};


function Admin_Home() {
  const { categories, setCategories } = useCategories();
  const [surveys, setSurveys] = useState(initialSurveys);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortedSurveys, setSortedSurveys] = useState(null);
  const [showCat, setShowCat] = useState(false);

  // Cargar categorías al iniciar
  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  // Guardar categorías cuando cambian
  useEffect(() => {
    localStorage.setItem('surveyCategories', JSON.stringify(categories));
  }, [categories]);

  // Manejo de categorías
  const addCategory = (name) => {
    if (!name.trim()) return;
    
    const newCategory = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-AR'),
      nombre: name.trim()
    };
    
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.nombre}"?`)) return;
    
    // 1. Eliminar la categoría
    setCategories(prev => prev.filter(c => c.id !== category.id));
    
    // 2. Actualizar encuestas que usaban esta categoría
    setSurveys(prev => prev.map(s => 
      s.categoria === category.nombre ? { ...s, categoria: 'General' } : s
    ));
  };

  const normalize = (str) =>
    str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  const filtered = (sortedSurveys || surveys).filter(s => {
    const matchesSearch = !filter || normalize(s.nombre).includes(normalize(filter));
    const matchesCategory = !categoryFilter || normalize(s.categoria) === normalize(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleSortAZ = () => {
    const sorted = [...surveys].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setSortedSurveys(sorted);
    setFilter('');
    setCategoryFilter(null);
  };

  const handleSortByDate = () => {
    const sorted = [...surveys].sort((a, b) => {
      const [d1, m1, y1] = a.fecha.split('/').map(Number);
      const [d2, m2, y2] = b.fecha.split('/').map(Number);
      return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
    });
    setSortedSurveys(sorted);
    setFilter('');
    setCategoryFilter(null);
  };

  const handleCategorySelect = (name) => {
    setCategoryFilter(name);
    setFilter('');
    setSortedSurveys(null);
  };

  const handleSelectSurvey = (s) => {
    setSelectedSurvey(s);
    setShowSurvey(true);
  };

  const handleDeleteClick = (s) => {
    setDelMessage(`¿Eliminar encuesta "${s.nombre}"?`);
    setSelectedSurvey(s);
    setShowDel(true);
  };

  
  return (
    <>
      <Navbar />
      <div className="Container-Page">
        <AdminHeader
          onOpenCategory={() => setShowCat(true)}
        />

        <SurveyTable
          data={filtered}
          onSelect={handleSelectSurvey}
          onDelete={handleDeleteClick}
        />

        <AdmFooter
          onSearch={setFilter}
          onSortAZ={handleSortAZ}
          onSortByDate={handleSortByDate}
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />

         <CategoryModal
          show={showCat}
          onHide={() => setShowCat(false)}
          categories={categories}
          onSave={addCategory}
          onDelete={deleteCategory}
        />

        {/* Resto de tus modales... */}
      </div>
    </>
  );
}

export default Admin_Home;
