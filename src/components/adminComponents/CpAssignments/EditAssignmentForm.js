import React, { useEffect, useState } from 'react'
import { useEditAssignmentMutation } from '../../../REDUX/features/assignments/assignmentApi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';

const EditAssignmentForm = ({ videos, assignment }) => {
    const navigate = useNavigate();
    const { id: assignmentId, title: editableTitle, video_id: editableV_Id, video_title: editableV_title, totalMark: editableMark } = assignment || {};
    const [editAssignment, { isLoading, isError, isSuccess }] = useEditAssignmentMutation();

    const [video_id, setVideo_Id] = useState(editableV_Id)
    const [video_title, setVideo_title] = useState(editableV_title);
    const [title, setTitle] = useState(editableTitle)
    const [totalMark, setTotalMark] = useState(editableMark)

    const handleSelect = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        setVideo_Id(e.target.options[selectedIndex].getAttribute('v_id'))
        setVideo_title(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editAssignment({
            id: assignmentId,
            data: {
                video_id: Number(video_id),
                video_title,
                title,
                totalMark: Number(totalMark)
            }
        })
    }
    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/assignments')
        }
    }, [isSuccess])

    return (
        <form className="flex flex-col gap-5 max-w-md w-32" onSubmit={handleSubmit} >
            {
                isError && <ErrorMessage error="Failed to Edit assignment" />
            }
            <select className='login-input rounded-md' required value={video_title} onChange={(e) => handleSelect(e)}>
                {/* <option disabled selected>Select video</option> */}
                {videos?.map((video) => <option key={video?.id} v_id={video?.id} >{video?.title}</option>)}
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

export default EditAssignmentForm