import React from 'react'
import Layout from '../../Layouts/Layout'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';
import { useParams } from 'react-router-dom'
import { useGetAssignmentQuery } from '../../../REDUX/features/assignments/assignmentApi';
import SubmitAssignment from '../../assignments/SubmitAssignment';
import useAuth from '../../../hooks/useAuth';

const MyAssignment = () => {
    const { id } = useAuth();
    const { videoId } = useParams();
    const { data, isError, isLoading } = useGetAssignmentQuery(Number(videoId));


    let assignmentContent;
    if (isLoading) assignmentContent = <p className='text-center'>Loading Your Assignment</p>
    if (!isLoading && isError) assignmentContent = <ErrorMessage error='Failed to load assignment' />
    if (!isLoading && !isError && !data.length) assignmentContent = <p className='text-center'>No Assignment</p>
    if (!isLoading && !isError && data.length) assignmentContent = data.map((assignment) => <SubmitAssignment key={assignment.id} assignment={assignment} />)

    return (
        <Layout>
            <section className="py-6 bg-primary">
                {assignmentContent}
            </section>
        </Layout>
    )
}

export default MyAssignment