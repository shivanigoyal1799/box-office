import React from 'react';
import ShowCard from './ShowCard';
import { FlexGrid } from '../styled';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ result }) => {
  const [starredShows, dispatchStarred] = useShows();
  return (
    <FlexGrid>
      {result.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        const onStarClick = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showID: show.id });
          } else {
            dispatchStarred({ type: 'ADD', showID: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            summary={show.summary}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
