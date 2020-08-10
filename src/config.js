export default {
  API_ENDPOINT: (process.env.NODE_ENV==='production')
              ? process.env.REACT_APP_API_BASE_URL
              : 'http://localhost:8000/api/bookmarks',
  API_KEY: 'baaa11ee-92c8-4616-9bdc-f8a60adff6d9'
}

/*
export default {
  API_ENDPOINT: `https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks`,
  API_KEY: '$2a$10$ra1z0n2XnSnbMP/ipTMHeOqqrI7i8Rssm/z8MHTxgb7LamV7LpfXu',
}*/
