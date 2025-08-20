import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Card, Row } from 'react-bootstrap';
import { Navbar } from '../../components';
import { obtenerRespuestasPorEncuesta } from '../../api';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

function AdminRespuestas() {
    const location = useLocation();
    const encuesta = location.state?.encuesta;
    const [respuestas, setRespuestas] = useState([]);

    useEffect(() => {
        if (encuesta?._id) {
            obtenerRespuestasPorEncuesta(encuesta._id).then(setRespuestas);
        }
    }, [encuesta]);

    if (!encuesta) return <div>No se encontró la encuesta.</div>;

    // Función para obtener datos para gráficos
    const getChartData = (card) => {
        const tipo = card.content?.questionType;
        let labels = [];
        let data = [];
        if (tipo === 'Choice') {
            labels = card.content.options || [];
            data = labels.map(opt =>
                respuestas.filter(r =>
                    r.respuestas.some(resp => resp.cardId === card._id && resp.valor === opt)
                ).length
            );
        } else if (tipo === 'Verificación') {
            labels = card.content.options || [];
            data = labels.map(opt =>
                respuestas.filter(r =>
                    r.respuestas.some(resp => resp.cardId === card._id && Array.isArray(resp.valor) && resp.valor.includes(opt))
                ).length
            );
        } else if (tipo === 'Desplegable') {
            labels = card.content.options || [];
            data = labels.map(opt =>
                respuestas.filter(r =>
                    r.respuestas.some(resp => resp.cardId === card._id && resp.valor === opt)
                ).length
            );
        } else if (tipo === 'Escala') {
            const min = card.content.min || 1;
            const max = card.content.max || 5;
            labels = Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
            data = labels.map(val =>
                respuestas.filter(r =>
                    r.respuestas.some(resp => resp.cardId === card._id && String(resp.valor) === val)
                ).length
            );
        }
        return {
            labels,
            datasets: [
                {
                    label: 'Cantidad',
                    data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ]
                }
            ]
        };
    };

    // Función para resumen textual
    const getResumen = (card) => {
        const tipo = card.content?.questionType;
        const chartData = getChartData(card);
        if (!chartData.labels.length) return null;
        const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
        return (
            <ul style={{ fontSize: '1.2rem', marginTop: 10 }}>
                {chartData.labels.map((label, idx) => {
                    const cantidad = chartData.datasets[0].data[idx];
                    const porcentaje = total ? ((cantidad / total) * 100).toFixed(1) : 0;
                    return (
                        <li key={label}>
                            <b>{label}:</b> {cantidad} respuesta(s) ({porcentaje}%)
                        </li>
                    );
                })}
                <li className='fw-bolder text-primary'><b>Total de respuestas:</b> {total}</li>
            </ul>
        );
    };

    return (
        <>
            <Navbar />
            <div className="Container-Page">
                <Row className='w-100'>
                    <h2 className='title-page mb-3'>INFORME DE RESPUESTAS: <span className='text-black'> {encuesta.name || encuesta.nombre}</span></h2>
                    <div style={{ height: 530, maxHeight: 530, overflowY: 'auto' }}>
                        {encuesta.cards.filter(card => card.type !== 'text' && card.type !== 'multimedia').map(card => {
                            const tipo = card.content?.questionType;
                            const esTabla = tipo === 'Fecha' || tipo === 'Pregunta' || tipo === 'Archivos';
                            return (
                                <Card key={card._id} className="mb-4">
                                    <Card.Body>
                                        <Card.Title className='fs-4 fw-bold text-uppercase'>{card.content?.questionText || card.content?.title}</Card.Title>
                                        <Card.Text>{card.content?.description}</Card.Text>
                                        {esTabla ? (
                                            <div style={{ height: 450, maxHeight: 450, overflowY: 'auto' }}>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th className='bg-primary text-white'>#</th>
                                                            <th className='bg-primary text-white'>Respuesta</th>
                                                            <th className='bg-primary text-white'>Fecha</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {respuestas
                                                            .filter(r => r.respuestas.some(resp => resp.cardId === card._id))
                                                            .map((r, idx) => {
                                                                const respuestaCard = r.respuestas.find(resp => resp.cardId === card._id);
                                                                return (
                                                                    <tr key={r._id}>
                                                                        <td>{idx + 1}</td>
                                                                        <td>{JSON.stringify(respuestaCard?.valor)}</td>
                                                                        <td>{new Date(r.createdAt).toLocaleString()}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <Row className="d-flex justify-content-center align-items-center">
                                                <div style={{ maxHeight: 450, minWidth: 320, flex: 1 }}>
                                                    {tipo === 'Choice' && (
                                                        <Pie data={getChartData(card)} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, datalabels: { color: '#222', font: { weight: 'bold', size: 22 }, formatter: (value) => value } } }} />
                                                    )}
                                                    {tipo === 'Verificación' && (
                                                        <Doughnut data={getChartData(card)} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, datalabels: { color: '#222', font: { weight: 'bold', size: 22 }, formatter: (value) => value } } }} />
                                                    )}
                                                    {tipo === 'Desplegable' && (
                                                        <Bar data={getChartData(card)} options={{
                                                            responsive: true,
                                                            plugins: {
                                                                legend: { display: false },
                                                                datalabels: {
                                                                    anchor: 'end',
                                                                    align: 'top',
                                                                    color: '#222',
                                                                    font: { weight: 'bold', size: 22 },
                                                                    formatter: (value) => value
                                                                }
                                                            },
                                                            scales: {
                                                                y: {
                                                                    beginAtZero: true,
                                                                    min: 0,
                                                                    max: 10,
                                                                    ticks: {
                                                                        stepSize: 1
                                                                    }
                                                                }
                                                            }
                                                        }} />
                                                    )}
                                                    {tipo === 'Escala' && (
                                                        <Bar data={getChartData(card)} options={{
                                                            responsive: true,
                                                            plugins: {
                                                                legend: { display: false },
                                                                datalabels: {
                                                                    anchor: 'end',
                                                                    align: 'top',
                                                                    color: '#222',
                                                                    font: { weight: 'bold', size: 22 },
                                                                    formatter: (value) => value
                                                                }
                                                            },
                                                            scales: {
                                                                y: {
                                                                    beginAtZero: true,
                                                                    min: 0,
                                                                    max: 10,
                                                                    ticks: {
                                                                        stepSize: 1
                                                                    }
                                                                }
                                                            }
                                                        }} />
                                                    )}
                                                </div>
                                                <div style={{ minWidth: 220, flex: 1 }}>{getResumen(card)}</div>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>

                </Row>

            </div>
        </>

    );
}

export default AdminRespuestas;