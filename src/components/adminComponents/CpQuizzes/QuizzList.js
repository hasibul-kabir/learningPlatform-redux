import React from 'react'
import EachCpQuizz from './EachCpQuizz'
import { useGetAllQuizzesQuery } from '../../../REDUX/features/quizz/quizzApi'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';

const QuizzList = () => {
    const { data, isLoading, isError } = useGetAllQuizzesQuery();

    let content;
    if (isLoading) content = <p className='text-center'>Loading Quizzes...</p>
    if (!isLoading && isError) content = <ErrorMessage error='Failed to Load Quizzes' />
    if (!isLoading && !isError && !data.length) content = <p className='text-center'>No quizz here, please add</p>
    if (!isLoading && !isError && data.length) content = data.map((quizz) => <EachCpQuizz key={quizz?.id} quizz={quizz} />)
    return (
        <table className="divide-y-1 text-base divide-gray-600 w-full">
            {
                data?.length &&
                <thead>
                    <tr>
                        <th className="table-th">Question</th>
                        <th className="table-th">Video</th>
                        <th className="table-th justify-center">Action</th>
                    </tr>
                </thead>
            }

            <tbody className="divide-y divide-slate-600/50">
                {content}
            </tbody>
        </table>
    )
}

export default QuizzList