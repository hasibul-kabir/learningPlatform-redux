import React from 'react'
import ErrorMessage from '../ResponseToastMessages/ErrorMessage'
import VideoFromList from './VideoFromList'
import { useGetVideosQuery } from '../../REDUX/features/video/videoApi'

const VideoList = () => {
    const { data: videoList, isLoading: listLoading, isError: listError } = useGetVideosQuery();

    let videoListContent;
    if (listLoading) videoListContent = <p>Fetching Videos...</p>;
    if (!listLoading && listError) videoListContent = <ErrorMessage error="Failed to Fetch" />
    if (!listLoading && !listError && !videoList.length) videoListContent = <ErrorMessage error="No videos here" />
    if (!listLoading && !listError && videoList.length) videoListContent = videoList.map((video) => <VideoFromList key={video?.id} video={video} />)


    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
            {videoListContent}
        </div>
    )
}

export default VideoList