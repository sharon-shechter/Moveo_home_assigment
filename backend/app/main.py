from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.db_API import app as api_app
from app.socket.socket_server import init_socketio

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Server is up and running"}

app.mount("/api", api_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = init_socketio(app)
