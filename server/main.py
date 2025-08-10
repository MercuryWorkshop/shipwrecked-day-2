#!/usr/bin/env python

import asyncio
import websockets.asyncio.server as wsserver
from websockets.exceptions import ConnectionClosed

CONNECTIONS = set()

async def handler(websocket):
    CONNECTIONS.add(websocket)
    try:
        async for message in websocket:
            broadcast_all(message, websocket)
            pass
    finally:
        CONNECTIONS.remove(websocket)

async def send(websocket, message):
    try:
        await websocket.send(message)
    except ConnectionClosed:
        pass

def broadcast_all(message, websocket):
    for connection in CONNECTIONS:
        if connection != websocket:
            print(f"broadcasting \"{message}\"")
            asyncio.create_task(send(connection, message))

async def main():
    async with wsserver.serve(handler, "localhost", 8765) as server:
        await server.serve_forever()

asyncio.run(main())
