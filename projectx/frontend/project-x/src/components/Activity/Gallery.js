import React, { useState, useEffect } from 'react'

const Gallery = ({ galleryClicked, setGalleryClicked, setImgUrl, imgUrl }) => {
    const [activityImg, setActivityImg] = useState([])

    const getActivityImg = () => {
        const arr = []
        
        for (let i = 1; i <= 37; i++) {
            arr.push(`/activities/image${i}.jpg`)
        }

        return arr
    }

    useEffect(() => {
        setActivityImg(getActivityImg())
    }, [])

    if (!galleryClicked) return null

    return (
        <div className="h-auto w-full absolute top-0 bg-gray-600">
            <img 
                src="/icons/close.png" 
                className="absolute top-1.5 right-1.5 h-6 w-6 opacity-30 hover:opacity-100 cursor-pointer"
                onClick={() => setGalleryClicked(false)}
            />
            <div className="flex flex-row flex-wrap mt-10 justify-around">
                {activityImg.map((img) => 
                    <img key={img} className={`h-40 w-60 mb-8 mx-4 cursor-pointer ${(img === imgUrl) ? "border-yellow-200 border-4" : "border-none"}`} src={img} onClick={() => {
                            setImgUrl(img)
                            setGalleryClicked(false)
                        }
                    } />
                )}
            </div>
        </div>
    )
}

export default Gallery