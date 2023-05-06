import React from 'react'
import Layout from '../../Layouts/Layout'
import EditAssignmentForm from '../../adminComponents/CpAssignments/EditAssignmentForm'
import { useParams } from 'react-router-dom'
import { useGetAssignmentByIdQuery } from '../../../REDUX/features/assignments/assignmentApi'
import { useGetVideosQuery } from '../../../REDUX/features/video/videoApi'

const EditAssignment = () => {
    const { assignmentId } = useParams()
    const { data: videos, isLoading: vLoading, isError: vError } = useGetVideosQuery();
    const { data, isLoading, isError } = useGetAssignmentByIdQuery(Number(assignmentId));

    let form;
    if (!isLoading && !vLoading && !isError && !vError && videos.length && data) form = <EditAssignmentForm videos={videos} assignment={data} />

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Assignment</h1>
                </div>
                <div className="add-form">
                    {form}
                </div>
            </div>
        </Layout>
    )
}

export default EditAssignment