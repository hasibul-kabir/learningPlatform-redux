import React from 'react'
import EachCpVideo from './EachCpVideo'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage'
import { useGetVideosQuery } from '../../../REDUX/features/video/videoApi'

const CpVideos = () => {
    const { data: allVideos, isError, isLoading } = useGetVideosQuery();

    let videosContent;
    if (isLoading) videosContent = <p className='text-center'>Loading videos..</p>
    if (!isLoading && isError) videosContent = <ErrorMessage error='Failed to load videos' />
    if (!isLoading && !isError && !allVideos.length) videosContent = <p className='text-center'>No video here, please Add.</p>
    if (!isLoading && !isError && allVideos.length) videosContent = (
        <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-600/50">
                {
                    allVideos?.map((video) => <EachCpVideo key={video?.id} video={video} />)
                }
            </tbody>
        </table>
    )
    return (
        <div className="overflow-x-auto mt-4">
            {videosContent}
        </div>
    )
}

export default CpVideos