// frontend/src/services/websocket.ts
import { Product } from '../types'

type ProductUpdateCallback = (updatedProduct: Product) => void

let socket: WebSocket | null = null

export const subscribeToProductUpdates = (callback: ProductUpdateCallback) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(
            process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws/products/'
        )
    }

    const handleMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as Product
        callback(data)
    }

    socket.addEventListener('message', handleMessage)

    return () => socket?.removeEventListener('message', handleMessage)
}
