#!/usr/bin/env python

import asyncio
import websockets.asyncio.server as wsserver



async def handler(websocket):
    async for message in websocket:
        await websocket.broadcast(global_server.connections, message)

async def main():
    global global_server
    async with wsserver.serve(handler, "localhost", 8765) as global_server:
        # server = global_server
        await global_server.serve_forever()

asyncio.run(main())