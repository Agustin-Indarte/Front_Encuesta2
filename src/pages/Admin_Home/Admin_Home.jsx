import React, { useState } from 'react';
import { AdminHeader, SurveyModal, SurveyTable, CategoryModal, DeleteConfirm, Navbar, AdmFooter } from '../../components';
import styles from './Admin_Home.module.css';

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

const initialCategories = [
  { id: 1, fecha: '19/06/2025', nombre: 'Deportes' },
  { id: 2, fecha: '07/07/2025', nombre: 'Salud' },
  { id: 3, fecha: '21/06/2025', nombre: 'Educación' },
  { id: 4, fecha: '23/06/2025', nombre: 'Tecnología' },
  { id: 5, fecha: '01/07/2025', nombre: 'Política' },
  { id: 6, fecha: '30/06/2025', nombre: 'Cultura' },
];

function Admin_Home() {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [categories, setCategories] = useState(initialCategories);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortedSurveys, setSortedSurveys] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDel, setShowDel] = useState(false);
  const [delMessage, setDelMessage] = useState('');

  const normalize = (str) =>
    str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  const filtered = (sortedSurveys || surveys).filter(s => {
    const matchesSearch = !filter || normalize(s.nombre).includes(normalize(filter));
    const matchesCategory = !categoryFilter || normalize(s.categoria) === normalize(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  // Modificar las funciones de ordenamiento para resetear otros filtros
  const handleSortAZ = () => {
    const sorted = [...surveys].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setSortedSurveys(sorted);
    setFilter(''); // Resetear búsqueda
    setCategoryFilter(null); // Resetear categoría
  };

  const handleSortByDate = () => {
    const sorted = [...surveys].sort((a, b) => {
      const [d1, m1, y1] = a.fecha.split('/').map(Number);
      const [d2, m2, y2] = b.fecha.split('/').map(Number);
      return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
    });
    setSortedSurveys(sorted);
    setFilter(''); // Resetear búsqueda
    setCategoryFilter(null); // Resetear categoría
  };

  // Modificar la función de selección de categoría
  const handleCategorySelect = (name) => {
    setCategoryFilter(name);
    setFilter(''); // Resetear búsqueda
    setSortedSurveys(null); // Resetear ordenamiento
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
          onSave={(name) =>
            setCategories([
              ...categories,
              { id: Date.now(), fecha: new Date().toLocaleDateString('es-AR'), nombre: name },
            ])
          }
          onDelete={(c) => setCategories(categories.filter((x) => x.id !== c.id))}
        />

        <SurveyModal
          show={showSurvey}
          onHide={() => setShowSurvey(false)}
          survey={selectedSurvey}
          categories={categories}
          onSave={(s) => {
            if (s.id) {
              setSurveys(surveys.map((x) => (x.id === s.id ? s : x)));
            } else {
              setSurveys([
                ...surveys,
                { ...s, id: Date.now(), fecha: new Date().toLocaleDateString('es-AR') },
              ]);
            }
            setSortedSurveys(null);
          }}
        />

        <DeleteConfirm
          show={showDel}
          onHide={() => setShowDel(false)}
          message={delMessage}
          onConfirm={() => {
            setSurveys(surveys.filter((x) => x.id !== selectedSurvey.id));
            setSortedSurveys(null);
          }}
        />
      </div>
    </>

  );
}

export default Admin_Home;
