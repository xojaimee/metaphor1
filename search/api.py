from typing import Optional, List
from fastapi import APIRouter
from datetime import datetime
import requests

router=APIRouter()


API_KEY="c4cc2d1c-f4bb-4d35-9d82-9972ab32d4dd"


@router.post("/metaphor-search", response_model=dict)
async def metaphor_search(
    query: str = "job listings",
    numResults: int = 10,
    startCrawlDate: Optional[str] = None,
    endCrawlDate: Optional[str] = None,
    type: str = "keyword"
    ):

    metaphors_api_url = "https://api.metaphor.systems/search"

    payload = {
        "query": query,
        "numResults": numResults,
        "type": type
    }

    if startCrawlDate:
        try:
            datetime.strptime(startCrawlDate, "%Y-%m-%d")
            payload["startCrawlDate"] = startCrawlDate
        except ValueError:
            return {"error": "Invalid start_crawl_date format. Use 'YYYY-MM-DD'."}
    if endCrawlDate:
        try:
            datetime.strptime(startCrawlDate, "%Y-%m-%d")
            payload["endCrawlDate"] = endCrawlDate
        except ValueError:
            return {"error": "Invalid start_crawl_date format. Use 'YYYY-MM-DD'."}

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY
    }

    response = requests.post(metaphors_api_url, json=payload, headers=headers)
    data = response.json()
    return data
