
const fetcher = (apiURL: string) => {
    return fetch(apiURL).then(res => res.json()) 
}

export default fetcher;