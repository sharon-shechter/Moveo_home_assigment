room_participants = {}

async def handle_join(sio, sid, data):
    room = data["room"]
    await sio.enter_room(sid, room)
    room_participants.setdefault(room, []).append(sid)
    await sio.emit("user_count", {"count": len(room_participants[room])}, room=room)

async def handle_leave(sio, sid, data):
    room = data["room"]
    await sio.leave_room(sid, room)
    if room in room_participants and sid in room_participants[room]:
        room_participants[room].remove(sid)
        await sio.emit("user_count", {"count": len(room_participants[room])}, room=room)

async def handle_disconnect(sio, sid):
    for room, participants in room_participants.items():
        if sid in participants:
            participants.remove(sid)
            await sio.emit("user_count", {"count": len(participants)}, room=room)
