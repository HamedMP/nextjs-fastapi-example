#!/bin/bash

# Activate the virtual environment
. .venv/bin/activate

# Install dependencies using uv
uv pip install -r requirements.txt

# Run FastAPI server with uvicorn
python -m uvicorn api.index:app --reload --port 8000 