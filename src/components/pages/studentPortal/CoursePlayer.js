import React from 'react'
import Layout from '../../Layouts/Layout'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage'
import VideoPlayer from '../../coursePlayer/VideoPlayer'
import VideoList from '../../coursePlayer/VideoList'
import { useGetVideoQuery } from '../../../REDUX/features/video/videoApi'
import { useParams } from 'react-router-dom'

const CoursePlayer = () => {
    const { videoId } = useParams();
    const { data: video, isLoading: playerLoading, isError: playerError } = useGetVideoQuery(Number(videoId));

    let videoContent;
    if (playerLoading) videoContent = <p>Video Player is Loading...</p>;
    if (!playerLoading && playerError) videoContent = <ErrorMessage error="Failed to Fetch" />
    if (!playerLoading && !playerError && video) videoContent = <VideoPlayer video={video} />

    return (
        <Layout>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            {videoContent}
                        </div>
                        <VideoList />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default CoursePlayer