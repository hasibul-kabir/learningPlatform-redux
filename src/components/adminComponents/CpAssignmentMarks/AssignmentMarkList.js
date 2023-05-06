import React from 'react'
import EachAssignmentMark from './EachAssignmentMark'
import { useGetAllAssignmentMarksQuery } from '../../../REDUX/features/assignments/assignmentMarksApi'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';

const AssignmentMarkList = () => {
    const { data, isLoading, isError } = useGetAllAssignmentMarksQuery();

    const pending = data?.filter((mark) => mark.status === "pending");
    const published = data?.filter((mark) => mark.status === "published");

    let content;
    if (isLoading) content = <p className='text-center'>Loading Assignment Marks...</p>
    if (!isLoading && isError) content = <ErrorMessage error='Failed to load assignment marks' />
    if (!isLoading && !isError && !data.length) content = <p className='text-center'>No Assignment Here</p>
    if (!isLoading && !isError && data.length) content = data.map((mark) => <EachAssignmentMark key={data?.id} assignmentMark={mark} />)
    return (
        <>
            <ul className="assignment-status">
                <li>Total <span>{data?.length}</span></li>
                <li>Pending <span>{pending?.length}</span></li>
                <li>Mark Sent <span>{published?.length}</span></li>
            </ul>
            <div className="overflow-x-auto mt-4">
                <table className="divide-y-1 text-base divide-gray-600 w-full">
                    <thead>
                        <tr>
                            <th className="table-th">Assignment</th>
                            <th className="table-th">Date</th>
                            <th className="table-th">Student Name</th>
                            <th className="table-th">Repo Link</th>
                            <th className="table-th">Mark</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-600/50">
                        {content}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AssignmentMarkList