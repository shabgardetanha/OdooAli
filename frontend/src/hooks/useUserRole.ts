// frontend/src/hooks/useUserRole.ts
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useUserRole = (): string => {
    const { user } = useContext(AuthContext)
    return user?.role || 'Staff'
}
