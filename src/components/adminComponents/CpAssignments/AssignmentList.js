import React from 'react'
import EachCpAssignment from './EachCpAssignment'
import { useGetAssignmentsQuery } from '../../../REDUX/features/assignments/assignmentApi'
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';

const AssignmentList = () => {
    const { data, isError, isLoading } = useGetAssignmentsQuery();

    let contents;
    if (isLoading) contents = <p className='text-center'>Loading Assignments...</p>
    if (!isLoading && isError) contents = <ErrorMessage error="Failed to load assignments" />
    if (!isLoading && !isError && !data.length) contents = <p className='text-center'>No Assignment here, please add</p>
    if (!isLoading && !isError && data.length) contents = data.map((assignment) => <EachCpAssignment key={assignment?.id} assignment={assignment} />)
    return (
        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Mark</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                    {contents}
                </tbody>
            </table>
        </div>
    )
}

export default AssignmentList