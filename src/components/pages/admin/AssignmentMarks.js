import React from 'react'
import Layout from '../../Layouts/Layout'
import AssignmentMarkList from '../../adminComponents/CpAssignmentMarks/AssignmentMarkList'

const AssignmentMarks = () => {
    return (
        <Layout>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <AssignmentMarkList />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default AssignmentMarks