from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI()

origins = [
    "http://localhost:3000",  # Your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models extended to reflect React Flow typical node and edge properties
class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict] = None
    position: Optional[Dict] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None
    type: Optional[str] = None
    animated: Optional[bool] = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# Simple in-memory storage for saved pipelines (keyed by user or pipeline ID)
saved_pipelines = {}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    rec_stack = set()

    def dfs(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node_id)
        return False

    for node in nodes:
        if node.id not in visited:
            if dfs(node.id):
                return False
    return True

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}

@app.post("/pipelines/save/{pipeline_id}")
async def save_pipeline(pipeline_id: str, pipeline: PipelineData):
    saved_pipelines[pipeline_id] = pipeline
    return {"message": f"Pipeline {pipeline_id} saved successfully."}

@app.get("/pipelines/load/{pipeline_id}")
async def load_pipeline(pipeline_id: str):
    pipeline = saved_pipelines.get(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline
