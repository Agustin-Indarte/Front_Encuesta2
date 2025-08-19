import React from 'react'
import { Card, Row } from 'react-bootstrap'

function RespMultimedia({ content }) {
  return (
    <Row className="g-0 align-items-center">
      <Card.Img
        src={content.fileUrl}
        alt={content.caption || content.title}
        className="img-fluid rounded-start"
        style={{
          width: '100%',
          maxHeight: '300px', // altura máxima consistente
          objectFit: 'contain', // mantiene proporción sin recortar
          backgroundColor: '#f8f9fa', // fondo neutro para imágenes pequeñas o transparentes
          borderRadius: '0.5rem'
        }}
      />
    </Row>
  )
}

export default RespMultimedia