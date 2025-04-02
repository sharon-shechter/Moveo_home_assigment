rooms = {} 

async def handle_join(sio, sid, data):
    room = data['room']
    await sio.enter_room(sid, room)

    if room not in rooms:
        rooms[room] = {'mentor_sid': sid, 'students': []}
        role = 'mentor'
    else:
        rooms[room]['students'].append(sid)
        role = 'student'

    await sio.emit('user_count', {
        'count': len(rooms[room]['students']) + 1,
        'role': role
    }, to=sid)

async def handle_leave(sio, sid, data):
    room = data['room']
    await sio.leave_room(sid, room)
    await handle_disconnect(sio, sid)

async def handle_disconnect(sio, sid):
    for room, data in list(rooms.items()):  
        if data.get('mentor_sid') == sid:
            await sio.emit('mentor_left', room=room)
            del rooms[room]
            break
        elif sid in data['students']:
            data['students'].remove(sid)
            await sio.emit('user_count', {
                'count': len(data['students']) + 1,
                'role': 'student'
            }, room=room)
            break