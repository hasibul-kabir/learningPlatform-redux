import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage'
import { useAddAssignmentMutation } from '../../../REDUX/features/assignments/assignmentApi'
import { useNavigate } from 'react-router-dom'

const AddAssignmentForm = ({ videos }) => {
    const navigate = useNavigate();
    const [addAssignment, { isLoading, isError, isSuccess }] = useAddAssignmentMutation();
    const [video_id, setVideo_Id] = useState('')
    const [video_title, setVideo_title] = useState('');
    const [title, setTitle] = useState('')
    const [totalMark, setTotalMark] = useState('')


    const handleSelect = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        setVideo_Id(e.target.options[selectedIndex].getAttribute('v_id'))
        setVideo_title(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addAssignment({
            title,
            video_id: Number(video_id),
            video_title,
            totalMark: Number(totalMark)
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/assignments')
        }
    }, [isSuccess])

    return (
        <form className="flex flex-col gap-5 max-w-md w-32" onSubmit={handleSubmit}  >
            {
                isError && <ErrorMessage error="Failed to add assignment" />
            }
            <select className='login-input rounded-md' required onChange={(e) => handleSelect(e)}>
                <option disabled selected>Select video</option>
                {videos?.map((video) => <option key={video?.id} v_id={video?.id}>{video?.title}</option>)}
            </select>
            <input type='text' className='login-input rounded-md' placeholder='Assignment title' required value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='number' className='login-input rounded-md' style={{ width: '15rem' }} placeholder='Total mark' required value={totalMark} onChange={(e) => setTotalMark(e.target.value)} />
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

export default AddAssignmentForm