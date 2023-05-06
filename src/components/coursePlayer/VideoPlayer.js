import React from 'react'
import AssociatedContents from './AssociatedContents'

const VideoPlayer = ({ video }) => {
    const { title, url } = video || {};
    return (
        <>
            {/* video player */}
            <iframe width="100%" className="aspect-video" src={url}
                title={title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

            {/* Rest contents */}
            <AssociatedContents video={video} />
        </>
    )
}

export default VideoPlayer