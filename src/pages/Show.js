/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getAPI } from '../misc/config';
import ShowMainData from '../components/Show/ShowMainData';
import Details from '../components/Show/Details';
import Cast from '../components/Show/Cast';
import Seasons from '../components/Show/Seasons';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

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

  return (
    <ShowPageWrapper>
      <InfoBlock>
        <ShowMainData
          name={show.name}
          rating={show.rating}
          summary={show.summary}
          tags={show.genres}
          image={show.image}
        />
      </InfoBlock>
      <InfoBlock>
        <h1>Details</h1>
        <Details
          status={show.status}
          premiered={show.premiered}
          network={show.network}
        />
        <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={show._embedded.seasons} />
        </InfoBlock>
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
