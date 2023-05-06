import React from 'react'
import Layout from '../../Layouts/Layout'
import { useParams } from 'react-router-dom'
import { useGetQuizzByIdQuery } from '../../../REDUX/features/quizz/quizzApi'
import EditQuizzForm from '../../adminComponents/CpQuizzes/EditQuizzForm'
import { useGetVideosQuery } from '../../../REDUX/features/video/videoApi'

const EditQuizz = () => {
    const { quizzId } = useParams();
    const { data: videos, isLoading: vLoading, isError: vError } = useGetVideosQuery();
    const { data, isLoading, isError } = useGetQuizzByIdQuery(Number(quizzId))

    let form;

    if (!isLoading && !vLoading && !isError && !vError && videos.length && data) form = <EditQuizzForm videos={videos} selectedQuizz={data} />
    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Quizz</h1>
                </div>
                <div className="add-form">
                    {form}
                </div>
            </div>
        </Layout>
    )
}

export default EditQuizz