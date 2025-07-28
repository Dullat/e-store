```jsx

    <div className="w-full h-40 bg-gray-500 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
      <div className="relative w-full h-full">
        <div
          className="flex h-full transition-transform duration-700 ease-out gap-2"
          style={{ transform: `translateX(0px)` }} // you'll control this later
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="
            flex-shrink-0 h-full bg-amber-200 rounded-md flex items-center justify-center snap-start
            w-[calc((100%_-_3*0.5rem)/4)] 
            md:w-[calc((100%_-_2*0.5rem)/3)]
            sm:w-[calc((100%_-_1*0.5rem)/2)]
            min-[100px]:w-[66.6667%]  // for ~1.5 cards (100% / 1.5)
          "
            >
              Card {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
```