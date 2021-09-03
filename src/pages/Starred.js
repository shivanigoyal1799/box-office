import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/Show/ShowGrid';
import { getAPI } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starredShows] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starredShows && starredShows.length > 0) {
      const promises = starredShows.map(showID => getAPI(`/shows/${showID}`));
      Promise.all(promises)
      .then(apiData=>apiData.map(show=>({show})))
        .then(result => {
          setShows(result);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starredShows]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error Occurred : {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid result={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
