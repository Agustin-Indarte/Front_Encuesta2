import React from 'react'
import { Card } from 'react-bootstrap';
import { RespText, RespQuestion, RespMultimedia } from '../../../components';

function UserCard({ type, content, onRespuesta, id }) {
  return (
    <Card className="AdmCardEncuesta flex-1 p-4 rounded border w-full">
      <div>
        {type === 'text' && <RespText content={content} onRespuesta={onRespuesta} />}
        {type === 'question' && <RespQuestion content={{...content, id}} onRespuesta={onRespuesta} />}
        {type === 'multimedia' && <RespMultimedia content={content} />}
      </div>
    </Card>
  );
}

export default UserCard