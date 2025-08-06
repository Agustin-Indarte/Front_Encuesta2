import React from 'react'
import { Card } from 'react-bootstrap';
import { RespText, RespQuestion, RespMultimedia } from '../../../components';

function UserCard({ type, content }) {
  return (
    <Card className="AdmCardEncuesta flex-1 p-4 rounded border w-full">
      <div>
        {type === 'text' && <RespText content={content} />}
        {type === 'question' && <RespQuestion content={content} />}
        {type === 'multimedia' && <RespMultimedia content={content} />}
      </div>
    </Card>
  );
}

export default UserCard