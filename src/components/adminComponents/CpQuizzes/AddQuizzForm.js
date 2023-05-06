import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage'
import { useAddQuizzMutation } from '../../../REDUX/features/quizz/quizzApi'
import { useNavigate } from 'react-router-dom'

const AddQuizzForm = ({ videos }) => {
    const navigate = useNavigate();
    const [addQuizz, { isError, isLoading, isSuccess }] = useAddQuizzMutation();

    const [video_id, setVideo_Id] = useState('')
    const [video_title, setVideo_title] = useState('')
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [error, setError] = useState('')

    const handleSelect = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        setVideo_Id(e.target.options[selectedIndex].getAttribute('v_id'))
        setVideo_title(e.target.value)
    }

    //add option requisition
    const handleAdd = () => {
        if (options.length < 4) {
            setOptions([...options,
            {
                id: options.length + 1,
                option: '',
                isCorrect: 'false'
            }])
        }
    }


    // set value by onChange
    const handleChange = (e, index) => {
        const updatedOptions = options?.map((option, i) =>
            index === i ?
                Object.assign(option, { [e.target.name]: e.target.value })
                :
                option
        )
        setOptions(updatedOptions)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (video_id && video_title && question && options.length) {
            addQuizz({
                question,
                video_id: Number(video_id),
                video_title,
                options
            })
        } else {
            setError('Please fill out all the feild')
        }
    }

    useEffect(() => {
        if (isError) {
            setError('Failed to add quizz')
        }
        if (isSuccess) {
            navigate('/admin/quizzes')
        }
    }, [isSuccess, isError])



    return (
        <form className="flex flex-col gap-5 max-w-md w-32" onSubmit={handleSubmit} >
            {
                error && <ErrorMessage error={error} />
            }
            <select className='login-input rounded-md' required onChange={(e) => handleSelect(e)} >
                <option disabled selected>Select video</option>
                {videos?.map((video) => <option key={video?.id} v_id={video?.id}>{video?.title}</option>)}
            </select>
            <input type='text' className='login-input rounded-md' placeholder='Quizz question' required value={question} onChange={(e) => setQuestion(e.target.value)} />
            <button className='group relative w-12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                onClick={handleAdd}
            >
                Add Option
            </button>

            {
                options.map((node, index) =>
                    <div className='option flex items-center gap-5' key={index}>
                        <input type='text' className='login-input rounded-md' style={{ width: '15rem' }} placeholder='option' name='option' onChange={(e) => handleChange(e, index)} required />
                        <select type="checkbox" className='select-input rounded-md' name="isCorrect" onChange={(e) => handleChange(e, index)} required>
                            <option disabled selected>Is correct</option>
                            <option value={false}>false</option>
                            <option value={true}>true</option>
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

export default AddQuizzForm