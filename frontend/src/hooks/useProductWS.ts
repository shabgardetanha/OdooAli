// frontend/src/hooks/useProductWS.ts
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../store'

// نوع داده محصول (Product) را بر اساس داده‌های دریافتی از WS تعریف کن
interface Product {
    id: number
    name: string
    price: number
    description?: string
    imageUrl?: string
}

export default function useProductWS() {
    const dispatch = useDispatch()

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/products/')

        ws.onmessage = (event: MessageEvent) => {
            const data: Product = JSON.parse(event.data)
            dispatch(updateProduct(data))
        }

        return () => ws.close()
    }, [dispatch])
}
