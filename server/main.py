#!/usr/bin/env python

import asyncio
import websockets.asyncio.server as wsserver

async def echo(websocket):
    async for message in websocket:
        await websocket.send(message)

async def main():
    async with wsserver.serve(echo, "localhost", 8765) as server:
        await server.serve_forever()

asyncio.run(main())