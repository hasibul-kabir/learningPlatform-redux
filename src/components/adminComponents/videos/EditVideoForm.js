import React, { useEffect, useState } from 'react'
import { useEditVideoMutation } from '../../../REDUX/features/video/videoApi';
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const EditVideoForm = ({ video }) => {
    const navigate = useNavigate()
    const { id: videoId, title: editableTitle, description: editableDescription, url: editableUrl, views: editableViews, duration: editableDuration, createdAt } = video || {};

    const [title, setTitle] = useState(editableTitle)
    const [description, setDescription] = useState(editableDescription)
    const [url, setUrl] = useState(editableUrl)
    const [views, setViews] = useState(editableViews)
    const [duration, setDuration] = useState(editableDuration)

    const [editVideo, { isError, isLoading, isSuccess }] = useEditVideoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        editVideo({
            id: videoId,
            data: {
                title,
                description,
                url,
                views,
                duration,
                createdAt
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/videos')
        }
    }, [isSuccess])

    return (
        <form className="flex flex-col gap-5 max-w-md w-32" onSubmit={handleSubmit} >
            {
                isError && <ErrorMessage error="Failed to add video" />
            }
            <input type='text' className='login-input rounded-md' placeholder='Video title' required value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='text' className='login-input rounded-md' placeholder='video url' required value={url} onChange={(e) => setUrl(e.target.value)} />
            <div className='flex gap-2'>
                <input type='text' className='login-input rounded-md' placeholder='Views' required value={views} onChange={(e) => setViews(e.target.value)} />
                <input type='text' className='login-input rounded-md' placeholder='Duration' required value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <textarea type='text' className='login-input rounded-md' placeholder='Video description' required value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default EditVideoForm