import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { myMarks } from '../../REDUX/features/quizz/quizzSlice';

const EachQuizz = ({ quizz }) => {
    const dispatch = useDispatch();
    const { id, question, options } = quizz || {};
    const [ans, setAns] = useState([]);

    const handleChange = (optionid, e) => {
        if (e.target.checked) {
            setAns((prev) => [...prev, optionid])
        } else {
            setAns(ans.filter((node) => node !== optionid))
        }
    }
    console.log(ans);
    return (
        <div className="quiz">
            <h4 className="question">Quiz {id} - {question}</h4>
            <form className="quizOptions">
                {
                    options?.map((option) =>
                        <label for={`option${option?.id}_q${id}`} key={option?.id}>
                            <input type="checkbox" id={`option${option?.id}_q${id}`} value={option?.isCorrect} onChange={(e) => handleChange(option?.id, e)} />
                            {option.option}
                        </label>
                    )
                }
            </form>
        </div>
    )
}

export default EachQuizz