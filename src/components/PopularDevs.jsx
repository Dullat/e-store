import { useEffect, useState } from "react"
import { fetchDevelopers } from "../data/getPopularDevs"
import PopularDevCard from "./PopularDevCard"

const PopularDevs = () => {
    const [devs, setDevs] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDevelopers()
                setDevs(data.results)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(`At PopularDevs Rel : ${error}`)
            }
        }

        getData()
    }, [])

    if (isLoading) return 'Loading..............'
    return (
        <>
            <h2 className='text-4xl font-bold w-full text-center p-6'>Top Studios</h2>
            <div className="grid grid-cols-1 [@media(min-width:880px)]:grid-cols-3">
                {
                    devs.map(dev => (
                        <div key={dev.id} className="p-3">
                            <PopularDevCard key={dev.id} dev={dev} />
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default PopularDevs