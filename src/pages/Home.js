import React, { useState,useCallback } from 'react';
import ActorGrid from '../components/Actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/Show/ShowGrid';
import { getAPI } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import CustomRadio from '../components/CustomRadio';
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from './Home.styled';

const renderResults = (result) => {
  if (result && result.length === 0) {
    return <div>No result</div>;
  }
  if (result && result.length > 0) {
    return result[0].show ? (
      <ShowGrid result={result} />
    ) : (
      <ActorGrid result={result} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onChangeInput = useCallback(ev => {
    setInput(ev.target.value);
  },[setInput])

  const onSearch = () => {
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     setResult(res);
    //     console.log(res);
    //   });

    getAPI(`/search/${searchOption}?q=${input}`).then(res => {
      setResult(res);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };


  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  },[])

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        placeholder="Search for Something"
        value={input}
      />
      <RadioInputsWrapper>
        {/* <div>
          <label htmlFor="shows-search">
            Show
            <input
              id="shows-search"
              type="radio"
              value="shows"
              checked={isShowSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="actors-search">
            Actor
            <input
              id="actors-search"
              type="radio"
              value="people"
              checked={!isShowSearch}
              onChange={onRadioChange}
            />
          </label>
        </div> */}

        <div>
          <CustomRadio
            label="Show"
            id="shows-search"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actor"
            id="actors-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(result)}
    </MainPageLayout>
  );
};

export default Home;
