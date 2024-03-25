from typing import Union,Optional

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "Test" : "World1234"
    }


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}