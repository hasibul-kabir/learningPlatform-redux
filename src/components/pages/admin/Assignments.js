import React from 'react'
import Layout from '../../Layouts/Layout'
import AssignmentList from '../../adminComponents/CpAssignments/AssignmentList'
import { Link } from 'react-router-dom'

const Assignments = () => {
    return (
        <Layout>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to="/admin/assignments/add" className='ml-auto'>
                                <button className="btn">Add Assignment</button>
                            </Link>
                        </div>
                        <AssignmentList />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Assignments