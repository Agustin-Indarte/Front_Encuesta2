import React, { useState, useEffect } from 'react';
import { AdminHeader, SurveyTable, CategoryModal,  Navbar, AdmFooter,DeleteConfirm } from '../../components';
import styles from './Admin_Home.module.css';
import {useCategories} from '../../context/EncuestasContext'



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

const loadSurveys = () => {
  try {
    const saved = localStorage.getItem('encuestas');
    let arr = saved ? JSON.parse(saved) : [];
    // Si alguna encuesta tiene categoria como objeto, conviértelo a string
    arr = arr.map(e => ({
      ...e,
      categoria: typeof e.categoria === 'object' && e.categoria !== null
        ? e.categoria.nombre
        : e.categoria
    }));
    // Opcional: guarda la corrección en localStorage
    localStorage.setItem('encuestas', JSON.stringify(arr));
    return arr;
  } catch (error) {
    console.error('Error loading surveys:', error);
    return [];
  }
};


function Admin_Home() {
  const { categories, setCategories } = useCategories();
 const [surveys, setSurveys] = useState(loadSurveys());
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortedSurveys, setSortedSurveys] = useState(null);
  const [showCat, setShowCat] = useState(false);

  // ESTADOS PARA EL MODAL DE ELIMINAR ENCUESTA
  const [showDel, setShowDel] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [delMessage, setDelMessage] = useState('');

   useEffect(() => {
    setSurveys(loadSurveys());
  }, []);

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
  };

  // FUNCIÓN PARA ELIMINAR ENCUESTA
  const deleteSurvey = () => {
    if (!selectedSurvey) return;
    const updated = surveys.filter(s => s !== selectedSurvey);
    setSurveys(updated);
    localStorage.setItem('encuestas', JSON.stringify(updated));
    setShowDel(false);
    setSelectedSurvey(null);
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

        {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
        <DeleteConfirm
          show={showDel}
          onHide={() => setShowDel(false)}
          onConfirm={deleteSurvey}
          message={delMessage}
        />
      </div>
    </>
  );
}

export default Admin_Home;
