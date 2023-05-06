import React from 'react'
import Layout from '../../Layouts/Layout'
import EditVideoForm from '../../adminComponents/videos/EditVideoForm'
import { useParams } from 'react-router-dom'
import { useGetVideoQuery } from '../../../REDUX/features/video/videoApi'

const EditVideo = () => {
    const { videoId } = useParams();
    const { data, isLoading, isError } = useGetVideoQuery(Number(videoId));
    let form;
    if (!isLoading && !isError && data) form = <EditVideoForm video={data} />
    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Video</h1>
                </div>
                <div className="add-form">
                    {form}
                </div>
            </div>
        </Layout>
    )
}

export default EditVideo