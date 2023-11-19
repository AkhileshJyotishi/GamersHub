import { fetchWithoutAuthorization } from '@/utils/functions'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Verify = () => {
    const router = useRouter()
    const { token } = router.query
    console.log("token ", router.query)
    useEffect(() => {
        const loaddata = async () => {
            const data=await fetchWithoutAuthorization(`/auth/verify-email?token=${token}`, "POST", {});
            
        }
        loaddata()
    }, [])
    return (
        <>

        </>
    )
}

export default Verify
