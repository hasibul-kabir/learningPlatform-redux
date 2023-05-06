import React from 'react'
import EachQuizz from './EachQuizz'
import { useGetCorrespondingQuizzesQuery } from '../../REDUX/features/quizz/quizzApi'
import ErrorMessage from '../ResponseToastMessages/ErrorMessage';
import { useGetVideoQuery } from '../../REDUX/features/video/videoApi';

const Quizzes = ({ videoId }) => {
    const { data: video } = useGetVideoQuery(Number(videoId));
    const { data, isLoading, isError } = useGetCorrespondingQuizzesQuery(Number(videoId));
    let quizzesContent;
    if (isLoading) quizzesContent = <p>Loading Quizzes...</p>
    if (!isLoading && isError) quizzesContent = <ErrorMessage error="Failed to load Qizzes" />
    if (!isLoading && !isError && !data.length) quizzesContent = <p>No Quizz Available!</p>
    if (!isLoading && !isError && data.length) quizzesContent = data.map((quizz) => <EachQuizz key={quizz.id} quizz={quizz} />)
    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"
                </h1>
                <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div className="space-y-8 ">
                {quizzesContent}
            </div>
            {
                data?.length ?
                    <button
                        className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
                        Submit
                    </button> : ''
            }

        </div>
    )
}

export default Quizzes