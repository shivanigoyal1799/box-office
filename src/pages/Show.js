import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getAPI } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH-SUCCESS': {
      return { show: action.show, isLoading: false, error: null };
    }
    case 'FETCH-FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          dispatch({ type: 'FETCH-SUCCESS', show: result });
          // setShow(result);
          // setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH-FAILED', error: err.message });
          // setError(err.message);
          // setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show', show);
  if (isLoading) {
    return <div>Data is loading</div>;
  }
  if (error) {
    return <div>Error occured:{error}</div>;
  }

  return <div>this is show page.</div>;
};

export default Show;
