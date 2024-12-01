import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if token exists
        if (!token) {
            navigate('/captain-login')
        } else {
            // Simulate loading completion without API call
            setIsLoading(false)
        }
    }, [token, navigate])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
