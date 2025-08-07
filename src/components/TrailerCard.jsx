const TrailerCard = ({ trailer }) => {
    console.log(trailer)
    return (
        <div className="w-full aspect-video bg-amber-200 flex-shrink-0">
            <video muted={true} autoPlay={true} className='h-full w-full object-cover'>
                <source src={`url('${trailer.data.max}')`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    )
}

export default TrailerCard