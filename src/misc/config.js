const API_BASE_URL = 'https://api.tvmaze.com';

export async function getAPI(queryString) {
  const result = fetch(`${API_BASE_URL}${queryString}`).then(response =>
    response.json()
  );
  return result;
}
