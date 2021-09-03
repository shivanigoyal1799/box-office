import { useReducer, useEffect,useState } from 'react';
import { getAPI } from './config';

function showReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showID];
    }
    case 'REMOVE': {
      return prevState.filter(showID => showID !== action.showID);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}

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

export function useEffectForShowPage(showID){
  const initialState = {
    show: null,
    isLoading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  // these states are not needed as we are using useReducer
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAPI(`/shows/${showID}?embed[]=seasons&embed[]=cast`)
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
  }, [showID]);

  return state;

}

export function useLastQuery(key='lastQuery'){
  const [input, setInput] = useState(()=>{
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });
  const setPersistedInput=(newInput)=>{
    setInput(newInput)
    sessionStorage.setItem(key,JSON.stringify(newInput))
  }
  return [input,setPersistedInput]
}
