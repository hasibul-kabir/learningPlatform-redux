import React, { useState } from 'react'
import Layout from '../../Layouts/Layout'
import { useGetAllAssignmentMarksQuery } from '../../../REDUX/features/assignments/assignmentMarksApi';
import { useGetAllQuizzMarksQuery } from '../../../REDUX/features/quizz/quizzMarksApi';
import { useGetAllUsersQuery } from '../../../REDUX/features/users/usersApi';
import useAuth from '../../../hooks/useAuth';

const Leaderboard = () => {
    const auth = useAuth();
    const [ranking, setRanking] = useState([]);
    const { data: assignmentMarks, isLoading, isError } = useGetAllAssignmentMarksQuery();
    const { data: quizzMarks } = useGetAllQuizzMarksQuery();
    const { data: users } = useGetAllUsersQuery();


    let allAssignmentMarks = [];
    let allQuizzMarks = [];
    let studentsMarks = [];
    users?.forEach((user) => {
        const filtered = assignmentMarks?.filter((assignmentMark) => assignmentMark.student_id === user.id)
        const eachStudentsTotal = filtered.reduce((acc, curr) => acc + curr.mark, 0)
        allAssignmentMarks.push({
            id: user.id,
            name: user.name,
            totalAssignmentMark: eachStudentsTotal ? eachStudentsTotal : 0
        })
    })
    allAssignmentMarks?.forEach((user) => {
        const filtered = quizzMarks?.filter((quizMark) => quizMark.student_id === user.id)
        const eachStudentsTotal = filtered?.reduce((acc, curr) => acc + curr.mark, 0)
        allQuizzMarks.push({
            id: user.id,
            name: user.name,
            totalQuizMark: eachStudentsTotal ? eachStudentsTotal : 0
        })
    })

    allAssignmentMarks?.forEach((assignmentmark) => {
        allQuizzMarks?.forEach((quizzmark) => {
            if (quizzmark.id === assignmentmark.id) {
                studentsMarks.push({
                    studentId: quizzmark.id,
                    studentName: quizzmark.name,
                    quizMark: quizzmark.totalQuizMark,
                    assignmentMark: assignmentmark.totalAssignmentMark,
                    totalMark: quizzmark.totalQuizMark + assignmentmark.totalAssignmentMark
                })
            }
        })
    })
    const sortedList = studentsMarks?.sort((a, b) => b.totalMark - a.totalMark)

    const newA = sortedList?.reduce((a, curr) => Math.max(a, curr.totalMark), 0)
    console.log(newA);
    const my_marks = sortedList?.find((student) => student.studentId === auth?.id)

    return (
        <Layout>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div>
                        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr>
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-2 border-cyan">
                                    <td className="table-td text-center font-bold">4</td>
                                    <td className="table-td text-center font-bold">{my_marks?.studentName}</td>
                                    <td className="table-td text-center font-bold">{my_marks?.quizMark}</td>
                                    <td className="table-td text-center font-bold">{my_marks?.assignmentMark}</td>
                                    <td className="table-td text-center font-bold">{my_marks?.totalMark}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="my-8">
                        <h3 className="text-lg font-bold">Top 20 Result</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr className="border-b border-slate-600/50">
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    sortedList?.map((student) => {
                                        const { studentName, quizMark, assignmentMark, totalMark } = student || {};
                                        return (
                                            <tr className="border-b border-slate-600/50">
                                                <td className="table-td text-center">4</td>
                                                <td className="table-td text-center">{studentName}</td>
                                                <td className="table-td text-center">{quizMark}</td>
                                                <td className="table-td text-center">{assignmentMark}</td>
                                                <td className="table-td text-center">{totalMark}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Layout>

    )
}

export default Leaderboard