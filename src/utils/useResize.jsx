import { useEffect, useState } from 'react'

const getItemsPerScreen = (width) => {
    if (width < 640) return 1  // below sm
    if (width < 768) return 2    // sm
    if (width < 1024) return 3   // md
    return 3                    // lg and up
}

const useResize = () => {
    const [itemsPerScreen, setItemsPerScreen] = useState(() => getItemsPerScreen(window.innerWidth))

    useEffect(() => {
        const handleResize = () => {
            setItemsPerScreen(getItemsPerScreen(window.innerWidth))
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return itemsPerScreen
}

export default useResize
