import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getAPI } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const onChangeInput = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     setResult(res);
    //     console.log(res);
    //   });

    getAPI(`/search/shows?q=${input}`).then(res => {
      setResult(res);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  const renderResults = () => {
    if (result && result.length === 0) {
      return <div>No result</div>;
    }
    if (result && result.length > 0) {
      return (
        <div>
          {result.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
