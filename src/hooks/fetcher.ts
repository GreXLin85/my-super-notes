const fetcher = (url: RequestInfo | URL, session: { accessToken: string }) => fetch(url, {
    headers: {
        Authorization: `Bearer ${session.accessToken}`
    }
}).then(res => res.json())

export default fetcher