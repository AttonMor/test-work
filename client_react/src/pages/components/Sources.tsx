import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type SourceProp = {
  filename: string;
  size: string;
  url: string;
  type: string;
};

export const Sources: React.FC<any> = ({ sources }) => {
  return (
    <ul className='list-group'>
      {sources.length
        ? sources.map((value: SourceProp) => (
            <li key={uuidv4()} className='list-group-item note'>
              <div>
                <strong>
                  <a href={value.url} target='example'>
                    {value.filename}
                  </a>
                </strong>
                <small>{value.size}</small>
              </div>
            </li>
          ))
        : ''}
    </ul>
  );
};
