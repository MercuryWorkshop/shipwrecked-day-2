#!/usr/bin/env python

import asyncio
import websockets.asyncio.server as wsserver
from websockets.exceptions import ConnectionClosed

CONNECTIONS = set()

async def handler(websocket):
    CONNECTIONS.add(websocket)
    try:
        async for message in websocket:
            await broadcast_all(message, websocket)
            pass
    finally:
        CONNECTIONS.remove(websocket)

async def broadcast_all(message, websocket):
    for websocket in CONNECTIONS.copy():
        try:
            await websocket.send(message)
            print(f"broadcasted {message}")
        except ConnectionClosed:
            pass

async def main():
    async with wsserver.serve(handler, "localhost", 8765) as server:
        await server.serve_forever()

asyncio.run(main())