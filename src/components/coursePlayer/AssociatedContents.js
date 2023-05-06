import React from 'react'
import { Link } from 'react-router-dom';

const AssociatedContents = ({ video }) => {
    const { id, title, description, createdAt } = video || {};
    let date = new Date(createdAt).getDate();
    let month = new Date(createdAt).getMonth();
    let year = new Date(createdAt).getFullYear();
    let monthName = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    return (
        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on {date} {monthName[month]} {year}
            </h2>

            <div className="flex gap-4">
                <Link to={`/courseplayer/${id}/assignment`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                    এসাইনমেন্ট
                </Link>

                <Link to={`/courseplayer/${id}/quizz`} state={{ data: id }}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                    অংশগ্রহণ
                    করুন</Link>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
                {description}
            </p>

        </div>
    )
}

export default AssociatedContents