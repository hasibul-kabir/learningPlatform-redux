import React from 'react'
import Layout from '../../Layouts/Layout'
import QuizzList from '../../adminComponents/CpQuizzes/QuizzList'
import { Link } from 'react-router-dom'

const Quizz = () => {

    return (
        <Layout>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to='/admin/quizzes/add' className='ml-auto'><button className="btn">Add Quiz</button></Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <QuizzList />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Quizz