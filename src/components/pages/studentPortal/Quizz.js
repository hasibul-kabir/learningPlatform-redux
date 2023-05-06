import React from 'react'
import Layout from '../../Layouts/Layout'
import Quizzes from '../../quizzes/Quizzes'
import { useParams } from 'react-router-dom';

const Quizz = () => {
    const { videoId } = useParams();
    return (
        <Layout>
            <section className="py-6 bg-primary">
                <Quizzes videoId={videoId} />
            </section>
        </Layout>
    )
}

export default Quizz