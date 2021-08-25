import React from 'react';
import ActorCard from './ActorCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';

const ActorGrid = ({ result }) => {
  return result.map(({ person }) => (
    <ActorCard
      key={person.id}
      id={person.id}
      name={person.name}
      country={person.country}
      gender={person.gender}
      birthday={person.birthday}
      deathday={person.deathday}
      image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
    />
  ));
};

export default ActorGrid;
