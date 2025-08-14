import React, { useState, useEffect } from 'react';
import {
  AdminHeader,
  SurveyTable,
  CategoryModal,
  Navbar,
  AdmFooter,
  DeleteConfirm
} from '../../components';
import { getCategories, crearCategoria, eliminarCategoria,obtenerEncuestas, eliminarEncuesta, actualizarEncuesta } from '../../api';
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
    const fetchSurveys = async () => {
      try {
        const data = await obtenerEncuestas();
        setSurveys(data);

        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setSurveys([]);
      }
    };
    fetchSurveys();
  }, []);

  const addCategory = async (name) => {
    if (!name.trim()) return;
    try {
      await crearCategoria({ name: name.trim() });
      const updated = await getCategories();
      setCategories(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategoryHandler = async (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return;
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
    const matchesSearch = !filter || (s.nombre || s.name || '').toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = !categoryFilter || (s.categoria || s.category || '').toLowerCase() === categoryFilter?.toLowerCase();
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


  

  const handleSelectSurvey = (s) => {
    setSelectedSurvey(s);
  };

  // FUNCIÓN PARA ELIMINAR ENCUESTA
  const deleteSurvey = async () => {
    if (!selectedSurvey) return;
    try {
      await eliminarEncuesta(selectedSurvey._id || selectedSurvey.id);
      setSurveys(prev => prev.filter(s => (s._id || s.id) !== (selectedSurvey._id || selectedSurvey.id)));
    } catch (e) {
      alert('Error al eliminar la encuesta');
    }
    setShowDel(false);
    setSelectedSurvey(null);
  };

  const handleDeleteClick = (s) => {
    setDelMessage(`¿Eliminar encuesta "${s.nombre}"?`);
    setSelectedSurvey(s);
    setShowDel(true);
  };

  const handleToggleState = async (survey, newActive) => {
    const id = survey._id || survey.id;
    const nuevoEstado = newActive ? 'activa' : 'inactiva';
    // Optimista: actualizar UI
    setSurveys(prev => prev.map(s => ( (s._id || s.id) === id ? { ...s, estado: nuevoEstado, state: nuevoEstado } : s )));
    try {
      await actualizarEncuesta(id, { ...survey, estado: nuevoEstado, state: nuevoEstado });
    } catch (err) {
      // Revertir si falla
      setSurveys(prev => prev.map(s => ( (s._id || s.id) === id ? { ...s, estado: survey.estado, state: survey.state } : s )));
      alert('Error al actualizar estado');
    }
  };

  return (
    <>
      <Navbar />
      <div className="Container-Page">
        <AdminHeader onOpenCategory={() => setShowCat(true)} />

        <SurveyTable
          data={filtered}
          onSelect={handleSelectSurvey}
          onDelete={handleDeleteClick}
          onToggleState={handleToggleState}
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



