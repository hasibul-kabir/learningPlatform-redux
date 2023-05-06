import React, { useEffect, useState } from 'react'
import { useGetAssignmentMarksQuery, useSubmitAssignmentMutation } from '../../REDUX/features/assignments/assignmentMarksApi';
import ErrorMessage from '../ResponseToastMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SubmitAssignment = ({ assignment }) => {
    const navigate = useNavigate();
    const [link, setLink] = useState('');
    const [submitAssignment, { isError, isLoading, isSuccess }] = useSubmitAssignmentMutation();
    const { id: assignment_id, title, totalMark } = assignment || {};
    const auth = useAuth();
    const { id: student_id, name: student_name } = auth || {};




    //submit assignment
    const handleSubmit = (e) => {
        e.preventDefault();
        submitAssignment({
            student_id,
            student_name,
            assignment_id,
            title,
            createdAt: new Date(),
            totalMark,
            mark: 0,
            repo_link: link,
            status: 'pending'
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/leaderboard')
        }
    }, [isSuccess, navigate])

    //to check assignment submitted or not
    const { data: assignmentMark, isLoading: markLoading, isError: markError } = useGetAssignmentMarksQuery({ assignmentId: assignment_id, studentId: student_id });

    let content;
    if (!markLoading && !markError && !assignmentMark.length) content = (
        <div className="quiz">
            <form className='flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit}>
                {
                    isError && <ErrorMessage error='Failed to submit!' />
                }
                <input className='assignment-input rounded-md' type='text' name='assignment' placeholder='Repository Link' value={link} onChange={(e) => setLink(e.target.value)} />
                <button type='submit'
                    className='group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                    disabled={isLoading}>
                    {
                        isLoading ? 'Submitting...' : 'Submit'
                    }
                </button>
            </form>
        </div>
    )
    if (!markLoading && !markError && assignmentMark.length) content = (
        <div>
            <p className='font-bold'>You have submitted this assignment</p>
            <p>Assignment mark is {assignmentMark[0]?.status}</p>
            {assignmentMark[0]?.status === "published" && <p>You have got - {assignmentMark[0]?.mark}</p>}
        </div>
    )

    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-0 text-center">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">{title}
                </h1>
                <p className="text-sm text-slate-200">Total Marks - {totalMark}</p>
            </div>
            <div className="space-y-8">
                {content}
            </div>
        </div>
    )
}

export default SubmitAssignment