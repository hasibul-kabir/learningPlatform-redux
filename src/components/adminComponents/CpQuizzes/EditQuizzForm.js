import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';
import { useEditQuizzMutation } from '../../../REDUX/features/quizz/quizzApi';
import { useNavigate } from 'react-router-dom';

const EditQuizzForm = ({ videos, selectedQuizz }) => {
    const navigate = useNavigate();
    const { id, question: editableQuestion, video_id: editableV_id, video_title: editableV_title, options: editableOptions } = selectedQuizz || {};
    const [editQuizz, { isLoading, isError, isSuccess }] = useEditQuizzMutation();

    const [video_id, setVideo_Id] = useState(editableV_id)
    const [video_title, setVideo_title] = useState(editableV_title)
    const [question, setQuestion] = useState(editableQuestion)
    const [options, setOptions] = useState([...editableOptions])
    const [error, setError] = useState('')

    const handleSelect = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        setVideo_Id(e.target.options[selectedIndex].getAttribute('v_id'))
        setVideo_title(e.target.value)
    }

    const handleChange = (e, index) => {
        const updatedOptions = options?.map((option, i) =>
            index === i ?
                Object.assign({ ...option }, { [e.target.name]: e.target.value })
                :
                option
        )
        setOptions(updatedOptions)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        editQuizz({
            id,
            data: {
                question,
                video_id: Number(video_id),
                video_title,
                options
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/quizzes')
        }
        if (isError) {
            setError('Failed to edit')
        }
    }, [isSuccess, isError])

    return (
        <form className="flex flex-col gap-5 max-w-md w-32" onSubmit={handleSubmit} >
            {
                error && <ErrorMessage error={error} />
            }
            <select className='login-input rounded-md' required value={video_title} onChange={(e) => handleSelect(e)} >
                <option disabled selected>Select video</option>
                {videos?.map((video) => <option key={video?.id} v_id={video?.id}>{video?.title}</option>)}
            </select>
            <input type='text' className='login-input rounded-md' placeholder='Quizz question' required value={question} onChange={(e) => setQuestion(e.target.value)} />


            {
                options.map((node, index) =>
                    <div className='option flex items-center gap-5' key={index}>
                        <input type='text' className='login-input rounded-md' style={{ width: '15rem' }} placeholder='option' name='option' value={node?.option} onChange={(e) => handleChange(e, index)} required />
                        <select type="checkbox" className='select-input rounded-md' name="isCorrect" value={node?.isCorrect} onChange={(e) => handleChange(e, index)} required>
                            <option disabled selected>Is correct</option>
                            <option>false</option>
                            <option>true</option>
                        </select>
                    </div>
                )
            }

            <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
                type='submit'
            >
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}

export default EditQuizzForm