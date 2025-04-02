from fastapi_socketio import SocketManager
from app.socket.handel_services import handle_join, handle_leave, handle_disconnect, handle_code_update

def init_socketio(app):
    sio = SocketManager(app=app, mount_location="/socket.io")

    @sio.on("join_room")
    async def on_join(sid, data):
        print(f"🔌 SID {sid} joined room {data['room']}")
        await handle_join(sio, sid, data)

    @sio.on("leave_room")
    async def on_leave(sid, data):
        print(f"👋 SID {sid} left room {data['room']}")
        await handle_leave(sio, sid, data)

    @sio.on("disconnect")
    async def on_disconnect(sid):
        print(f"❌ SID {sid} disconnected")
        await handle_disconnect(sio, sid)

    @sio.on("code_update")
    async def on_code_update(sid, data):
        await handle_code_update(sio, sid, data)


    return sio
