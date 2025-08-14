import React, { useState, useEffect } from 'react';
import {
  AdminHeader,
  SurveyTable,
  CategoryModal,
  Navbar,
  AdmFooter,
  DeleteConfirm
} from '../../components';
import { getCategories, crearCategoria, eliminarCategoria } from '../../api';
import styles from './Admin_Home.module.css';

function Admin_Home() {
  const [categories, setCategories] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortedSurveys, setSortedSurveys] = useState(null);
  const [showCat, setShowCat] = useState(false);

  const [showDel, setShowDel] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [delMessage, setDelMessage] = useState('');

  // Cargar categorías y encuestas del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, survs] = await Promise.all([getCategories(), getSurveys()]);
        setCategories(cats);
        setSurveys(survs);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, []);

  const addCategory = async (name) => {
    if (!name.trim()) return;
    try {
      await crearCategoria({ nombre: name.trim() });
      const updated = await getCategories();
      setCategories(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategoryHandler = async (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.nombre}"?`)) return;
    try {
      await eliminarCategoria(category._id);
      const updated = await getCategories();
      setCategories(updated);
      setSurveys(prev => prev.map(s =>
        s.categoria === category.nombre ? { ...s, categoria: 'General' } : s
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const normalize = (str) =>
    str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  const filtered = (sortedSurveys || surveys).filter(s => {
    const matchesSearch = !filter || normalize(s.nombre).includes(normalize(filter));
    const matchesCategory = !categoryFilter || normalize(s.categoria) === normalize(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleSortAZ = () => {
    setSortedSurveys([...surveys].sort((a, b) => a.nombre.localeCompare(b.nombre)));
    setFilter('');
    setCategoryFilter(null);
  };

  const handleSortByDate = () => {
    setSortedSurveys([...surveys].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    setFilter('');
    setCategoryFilter(null);
  };

  const deleteSurvey = async () => {
    if (!selectedSurvey) return;
    try {
      await eliminarSurvey(selectedSurvey._id);
      const updated = await getSurveys();
      setSurveys(updated);
      setShowDel(false);
      setSelectedSurvey(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="Container-Page">
        <AdminHeader onOpenCategory={() => setShowCat(true)} />

        <SurveyTable
          data={filtered}
          onSelect={setSelectedSurvey}
          onDelete={(s) => {
            setDelMessage(`¿Eliminar encuesta "${s.nombre}"?`);
            setSelectedSurvey(s);
            setShowDel(true);
          }}
        />

        <AdmFooter
          onSearch={setFilter}
          onSortAZ={handleSortAZ}
          onSortByDate={handleSortByDate}
          categories={categories}
          onCategorySelect={(name) => {
            setCategoryFilter(name);
            setFilter('');
            setSortedSurveys(null);
          }}
        />

        <CategoryModal
          show={showCat}
          onHide={() => setShowCat(false)}
          categories={categories}
          onSave={addCategory}
          onDelete={deleteCategoryHandler}
        />

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



