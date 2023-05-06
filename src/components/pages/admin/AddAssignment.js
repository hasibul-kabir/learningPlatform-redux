import React from 'react'
import Layout from '../../Layouts/Layout'
import AddAssignmentForm from '../../adminComponents/CpAssignments/AddAssignmentForm'
import { useGetVideosQuery } from '../../../REDUX/features/video/videoApi';

const AddAssignment = () => {
    const { data, isLoading, isError } = useGetVideosQuery();

    let form;
    if (!isLoading && !isError && data.length) form = <AddAssignmentForm videos={data} />
    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Add New Assignment</h1>
                </div>
                <div className="add-form">
                    {form}
                </div>
            </div>
        </Layout>
    )
}

export default AddAssignment