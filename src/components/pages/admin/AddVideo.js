import React from 'react'
import Layout from '../../Layouts/Layout'
import AddVideoForm from '../../adminComponents/videos/AddVideoForm'

const AddVideo = () => {
    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Add New Video</h1>
                </div>
                <div className="add-form">
                    <AddVideoForm />
                </div>
            </div>
        </Layout>
    )
}

export default AddVideo