import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAPI } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result =>
      setShow(result)
    );
  }, [id]);

  console.log('show', show);

  return <div>this is show page.</div>;
};

export default Show;
