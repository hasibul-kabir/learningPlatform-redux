import React, { useState } from 'react'
import { useUpdateAssignmentsMarkMutation } from '../../../REDUX/features/assignments/assignmentMarksApi';

const EachAssignmentMark = ({ assignmentMark }) => {
    const { id, student_id, student_name, assignment_id, title, createdAt, totalMark, mark, repo_link, status } = assignmentMark || {};
    const [updateAssignmentsMark, { }] = useUpdateAssignmentsMarkMutation();
    const [aMark, setA_Mark] = useState(mark);

    const createdTime = new Date(createdAt);
    const month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];


    const handleSubit = () => {
        updateAssignmentsMark({
            id,
            data: {
                student_id,
                student_name,
                assignment_id,
                title,
                createdAt,
                totalMark,
                mark: Number(aMark),
                repo_link,
                status: "published"
            }
        })
    }
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdTime.getDate()}  {month[createdTime.getMonth()]}  {createdTime.getFullYear()}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {
                status === "published" ?
                    <td class="table-td">{mark}</td>
                    : status === "pending" &&
                    <td className="table-td input-mark">
                        <input max="100" value={aMark} onChange={(e) => setA_Mark(e.target.value)} />
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                            onClick={handleSubit}
                        >
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </td>
            }


        </tr>
    )
}

export default EachAssignmentMark