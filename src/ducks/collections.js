export const FETCH_COLLECTIONS_START = 'collections/FETCH_COLLECTIONS_START';
export const FETCH_COLLECTIONS_END = 'collections/FETCH_COLLECTIONS_END';

const initialState = {
  fetching: false,
  fetched: false,
  collections: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_START:
      return { ...state, fetching: true };

    case FETCH_COLLECTIONS_END:
      return {
        ...state,
        fetching: false,
        fetched: true,
        collections: action.payload
      };

    default:
      return { ...state, fetching: false, error: action.payload };
  }
};

export const FetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START
});

export const FetchCollectionsEnd = data => ({
  type: FETCH_COLLECTIONS_END,
  payload: data
});

export const GetCollections = resources => {
  return function(dispatch, getState, api) {
    dispatch(FetchCollectionsStart());

    return api.GetCollections(resources).then(collections => {
      dispatch(FetchCollectionsEnd(collections));
    });
  };
};
