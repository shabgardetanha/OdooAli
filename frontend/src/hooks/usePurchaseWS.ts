import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePurchaseOrder } from '../store/purchaseSlice'

export default function usePurchaseWS() {
    const dispatch = useDispatch()

    useEffect(() => {
        const ws = new WebSocket(`ws://${window.location.host}/ws/purchase_orders/`)

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.purchase_order) {
                dispatch(updatePurchaseOrder(data.purchase_order))
            }
        }

        return () => ws.close()
    }, [dispatch])
}
