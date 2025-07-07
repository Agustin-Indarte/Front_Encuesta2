import React, { useState } from 'react';
import AdminHeader from '../../components/AdminHome/AdminHeader/AdminHeader';
import SurveyTable from '../../components/AdminHome/SurveyTable/SurveyTable';
import CategoryModal from '../../components/AdminHome/CategoryModal/CategoryModal';
import SurveyModal from '../../components/AdminHome/SurveyModal/SurveyModal';
import DeleteConfirm from '../../components/AdminHome/DeleteConfirm/DeleteConfirm';
import styles from './Admin_Home.module.css';

// Datos iniciales
const initialSurveys = [
  { id: 1, fecha: '19/06/2025', categoria: 'Deportes', nombre: 'Mundial de Clubes' },
  { id: 2, fecha: '23/06/2025', categoria: 'Tecnología', nombre: 'Uso de inteligencia artificial' },
  { id: 3, fecha: '20/06/2025', categoria: 'Salud', nombre: 'Hábitos alimenticios' },
  { id: 4, fecha: '30/06/2025', categoria: 'Cultura', nombre: 'Preferencias musicales' },
  { id: 5, fecha: '01/07/2025', categoria: 'Politica', nombre: 'Opinión sobre elecciones 2025' },
  { id: 6, fecha: '07/07/2025', categoria: 'Educacion', nombre: 'Satisfacción de estudiantes' },
];

const initialCategories = [
  { id: 1, fecha: '19/06/2025', nombre: 'Deportes' },
  { id: 2, fecha: '07/07/2025', nombre: 'Salud' },
  { id: 3, fecha: '21/06/2025', nombre: 'Educación' },
  { id: 4, fecha: '23/06/2025', nombre: 'Tecnología' },
  { id: 5, fecha: '01/07/2025', nombre: 'Politica' },
  { id: 6, fecha: '30/06/2025', nombre: 'Cultura' },
];


function Admin_Home() {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [categories, setCategories] = useState(initialCategories);
  const [filter, setFilter] = useState('');
  const [sortedSurveys, setSortedSurveys] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDel, setShowDel] = useState(false);
  const [delMessage, setDelMessage] = useState('');

  // 🔎 Buscar
  const baseData = sortedSurveys || surveys;
  const filtered = baseData.filter(s =>
    s.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    s.categoria.toLowerCase().includes(filter.toLowerCase())
  );

  // ➕ Crear encuesta
  const handleNewSurvey = () => {
    setSelectedSurvey(null);
    setShowSurvey(true);
  };

  // ✏️ Editar encuesta
  const handleSelectSurvey = (s) => {
    setSelectedSurvey(s);
    setShowSurvey(true);
  };

  // 🗑️ Eliminar encuesta
  const handleDeleteClick = (s) => {
    setDelMessage(`¿Eliminar encuesta "${s.nombre}"?`);
    setSelectedSurvey(s);
    setShowDel(true);
  };

  // 🔠 Ordenar A-Z
  const handleSortAZ = () => {
    const sorted = [...surveys].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setSortedSurveys(sorted);
  };

  // 🕒 Ordenar por fecha
  const handleSortByDate = () => {
    const sorted = [...surveys].sort((a, b) => {
      const [d1, m1, y1] = a.fecha.split('/').map(Number);
      const [d2, m2, y2] = b.fecha.split('/').map(Number);
      const dateA = new Date(y1, m1 - 1, d1);
      const dateB = new Date(y2, m2 - 1, d2);
      return dateB - dateA;
    });
    setSortedSurveys(sorted);
  };

  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <h1 className={styles.title}>MIS ENCUESTAS</h1>
        <AdminHeader
          onSearch={setFilter}
          onNewSurvey={handleNewSurvey}
          onOpenCategory={() => setShowCat(true)}
          onSortAZ={handleSortAZ}
          onSortByDate={handleSortByDate}
        />
      </header>

      <SurveyTable
        data={filtered}
        onSelect={handleSelectSurvey}
        onDelete={handleDeleteClick}
      />

      <CategoryModal
        show={showCat}
        onHide={() => setShowCat(false)}
        categories={categories}
        onSave={name =>
          setCategories([
            ...categories,
            { id: Date.now(), fecha: new Date().toLocaleDateString('es-AR'), nombre: name }
          ])
        }
        onDelete={c => setCategories(categories.filter(x => x.id !== c.id))}
      />

      <SurveyModal
        show={showSurvey}
        onHide={() => setShowSurvey(false)}
        survey={selectedSurvey}
        categories={categories}
        onSave={s => {
          if (s.id) {
            setSurveys(surveys.map(x => x.id === s.id ? s : x));
          } else {
            setSurveys([
              ...surveys,
              { ...s, id: Date.now(), fecha: new Date().toLocaleDateString('es-AR') }
            ]);
          }
          setSortedSurveys(null); // resetear ordenamiento al guardar
        }}
      />

      <DeleteConfirm
        show={showDel}
        onHide={() => setShowDel(false)}
        message={delMessage}
        onConfirm={() => {
          setSurveys(surveys.filter(x => x.id !== selectedSurvey.id));
          setSortedSurveys(null); // resetear ordenamiento al eliminar
        }}
      />
    </div>
  );
}

export default Admin_Home;


