import React from 'react'

const ErrorMessage = ({ error }) => {
    return (
        <div>
            <p className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600'>{error}</p>
        </div>
    )
}

export default ErrorMessage