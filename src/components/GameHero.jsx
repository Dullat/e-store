import { useEffect, useRef, useState } from 'react'

const GameHero = ({ game, screenshots, trailers }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const intervalRef = useRef(null)
    const totalLength = screenshots.length



    const startAutoSlide = () => {
        if (totalLength === 1) {
            return
        }
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev >= totalLength - 1 ? 0 : prev + 1));
        }, 3000)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
        startAutoSlide()
    }

    useEffect(() => {
        startAutoSlide()
        return () => clearInterval(intervalRef.current)
    }, [currentSlide])
    return (
        <div className='w-full relative overflow-hidden'>
            <div className="w-full relative rounded-2xl overflow-hidden">
                <div className="w-full h-full flex transition-transform duration-1000"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`
                    }}>
                    {
                        screenshots.map((item) => (
                            <ScreenShotCard key={item.id} ss={item} />
                        ))

                    }
                    {/* {
                        trailers.map(item => (
                            <TrailerCard key={item.id} trailer={item} />
                        ))
                    } */}
                </div>
                <div className="absolute bottom-5 left-[50%] flex gap-2 translate-x-[-50%]">
                    {
                        screenshots.map((_, index) => (
                            <div key={index} onClick={() => goToSlide(index)} className={`h-3 w-3 rounded-full bg-gray-400 cursor-pointer backdrop-blur-sm ${index === currentSlide ? 'scale-110 bg-blue-700' : ''}`}></div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const ScreenShotCard = ({ ss }) => {
    return (
        <div className="w-full aspect-video flex-shrink-0">
            <img className='h-full w-full object-cover' src={ss.image} alt="" />
        </div>
    )
}

export default GameHero