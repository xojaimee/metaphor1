import React, {useState, useEffect} from 'react';

function MetaphorSearchForm() {
    const [results, setResults] = useState([])
    const [showTableHeader, setShowTableHeader] = useState(false);
    const [query, setQuery] = useState('Here are some updated job listings');
    const [numResults, setNumResults] = useState(10);
    const [startCrawlDate, setStartCrawlDate] = useState('');
    const [endCrawlDate, setEndCrawlDate] = useState('');
    const [type, setType] = useState('keyword')

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const handleNumResultsChange = (e) => {
        setNumResults(e.target.value)
    }

    const handleStartCrawlDateChange = (e) => {
        setStartCrawlDate(e.target.value)
    }

    const handleEndCrawlDateChange = (e) => {
        setEndCrawlDate(e.target.value)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }


    // HANDLE SUBMIT ------------------------------------------------------
    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        query: query,
        numResults: numResults,
        startCrawlDate: startCrawlDate || null,
        endCrawlDate: endCrawlDate || null,
        type: type
      };

      let searchUrl = "http://localhost:8000/metaphor-search";

      if (query) {
        searchUrl += `?query=${query}`;
      }
      if (numResults) {
        searchUrl += `&numResults=${numResults}`;
      }
      if (startCrawlDate) {
        searchUrl += `&startCrawlDate=${startCrawlDate}`;
      }
      if (endCrawlDate) {
        searchUrl += `&endCrawlDate=${endCrawlDate}`;
      }
      if (type) {
        searchUrl += `&type=${type}`;
      }



    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
      }

    const response = await fetch(searchUrl, fetchConfig)
    if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
            setResults(data);
            setShowTableHeader(true)
          } else if (typeof data === 'object') {
            const searchResultsArray = Object.values(data);
            setResults(searchResultsArray.flat());
            console.log(searchResultsArray)
            setShowTableHeader(true)
     } else {
        console.error('Error:', response.statusText)
    }
    }}


useEffect(() => {
    console.log("The results have been updated:", results.flat())

}, [results])



      return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4 card-color card-formatting">
            <h1>Metaphor Search</h1>
            <h4>Updated Job Listings</h4>
            <form onSubmit={handleSubmit} id="metaphor-search">
            <label htmlFor="query">Query:</label>
            <div className="form-floating mb-3">
            <textarea
              onChange={handleQueryChange}
              required
              type="text"
              id="query"
              name="query"
              rows="3"
              cols="20"
              value={query}
            />
              </div>
              <label htmlFor="numResults">Number of Results:</label>
              <div className="form-floating mb-3">
            <input
            onChange={handleNumResultsChange}
              type="number"
              id="numResults"
              value={numResults}
            />
          </div>
          <label htmlFor="startCrawlDate">Start Crawl Date:</label>
              <div className="form-floating mb-3">
              <input
              onChange={handleStartCrawlDateChange}
              type="text"
              id="startCrawlDate"
              value={startCrawlDate}
              placeholder="YYYY-MM-DD"
            />
          </div>
          <label htmlFor="endCrawlDate">End Crawl Date:</label>
              <div className="form-floating mb-3">
              <input
              onChange={handleEndCrawlDateChange}
              type="text"
              id="endCrawlDate"
              placeholder="YYYY-MM-DD"
              value={endCrawlDate}
            />
          </div>
          <label htmlFor="type">Type:</label>
              <div className="form-floating mb-3">
              <input
              onChange={handleTypeChange}
              type="text"
              id="type"
              value={type}
            />
          </div>

          <button type="submit" className="btn btn-success btn-md ">Search</button>
            </form>
            </div>
        </div>
      </div>

        {showTableHeader ? (
        results && results.length > 0 ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.title}</td>
                    <td>
                      <a href={result.url} target="_blank">{result.url}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     ) : (
          <p>No search results</p>
        )
      ) : null}

        </>
    );
    }

export default MetaphorSearchForm;
