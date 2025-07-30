import { useEffect, useRef, useState } from 'react'
import GameCard from '../components/GameCard'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import useResize from './useResize'

const CarouselSkeleton = () => {
  return (
    <div className="relative min-h-30 w-[250px]">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>
    </div>
  )
}

const CarouselSlide = ({ games, isError, isLoading, sectionTitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const itemsPerScreen = useResize()
 

  useEffect(() => {
    setTotalSlides(() => {

      // const total = Math.ceil(games.length / itemsPerScreen)
      
      // return total
      setCurrentSlide(0) // this will adjust the or reset the scrolled bar , so that scrolled view and currentSlide ramain const
      if (itemsPerScreen === 3) {
        return 4
      } else if (itemsPerScreen === 2) {
        return 6
      }
    })
  }, [itemsPerScreen])


  const scrollRight = () => {
    setCurrentSlide(prev => {
      if (prev >= totalSlides - 1) {
        return 0
      } else return prev + 1
    })
  }

  const scrollLeft = () => {
    setCurrentSlide(prev => {
      if (prev <= 0) {
        return 0
      } else return prev - 1
    })
  }

  if (isError) {
    return (
      <p>eoorrrooro occuurreeddd</p>
    )
  }

  if (isLoading) return <CarouselSkeleton />

  return (
    <div className="">
      <div className="flex items-center justify-between py-8 px-2">
        <h2 className='text-3xl font-bold'>{sectionTitle}</h2>
        <div className={`flex gap-2 items-center ${itemsPerScreen === 1 ? 'hidden' : ''}`}>
          <button onClick={scrollLeft} className='p-3 bg-black rounded-full cursor-pointer hover:scale-110 transition-transform hover:shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]'>
            <FaArrowLeft />
          </button>
          <button onClick={scrollRight} className='p-3 bg-black rounded-full cursor-pointer hover:scale-110 transition-transform hover:shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]'>
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="w-full min-h-40 h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide sm:overflow-hidden">
        <div className="relative w-full h-full">
          <div
            className="flex h-full transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }} // you'll control this later
          >

            {
              games.map((game, index) => (
                <div
                  key={index}
                  className="p-4
                  flex-shrink-0 h-full py-2 rounded-md flex items-center justify-center snap-start
                  w-[calc(100%/4)] 
                  md:w-[calc((100%)/3)]
                  sm:w-[calc((100%)/2)]
                  min-[100px]:w-[66.6667%]
                "
                >
                  <GameCard game={game} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default CarouselSlide