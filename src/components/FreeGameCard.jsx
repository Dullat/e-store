import React, { useEffect, useState } from 'react'

const FreeGameCard = ({ game }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [currentScreenshot, setCurrentScreenshot] = useState(1)

    useEffect(() => {
        if (isHovered && game?.short_screenshots?.length > 2) {
            setCurrentScreenshot(2)
        } else {
            setCurrentScreenshot(1)
        }
    }, [isHovered, game])

    const getCurrentImage = () => {
        if (game?.short_screenshots?.length > 0) {
            return game.short_screenshots[currentScreenshot]?.image || game.background_image
        }
        return game.background_image
    }

    return (
        <div
            key={game.id}
            className="flex w-full p-4"
        >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="rounded overflow-hidden w-full aspect-movie hover:scale-101 transition relative cursor-pointer">
                <img
                    src={getCurrentImage()}
                    alt={game.name}
                    className="w-full h-full object-cover transition-all duration-500"
                />
                <div className='absolute bottom-0 left-0 w-[100%] bg-[rgba(62,90,247,0.76)] text-center p-2'>{game.name}</div>
            </div>
        </div>
    )
}

export default FreeGameCard
