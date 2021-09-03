/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';

import ShowMainData from '../components/Show/ShowMainData';
import Details from '../components/Show/Details';
import Cast from '../components/Show/Cast';
import Seasons from '../components/Show/Seasons';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useEffectForShowPage } from '../misc/custom-hooks';



const Show = () => {
  const { id } = useParams();
  const {show,isLoading,error}=useEffectForShowPage(id);

  // console.log('show', show);
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
