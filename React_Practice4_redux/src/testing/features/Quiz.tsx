import { Box, Button, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from "../quizData";
import { type RootState } from '../../store';
import Matching from './Matching'
import { useState } from 'react'
import { shuffle, clearAnswers } from './quizSlice';
import type { Dispatch } from 'redux';

const getResult = (
    currentAnswers: { question: string, answer: string | boolean }[], 
    correctAnswers: { question: string, answer: string | boolean }[]
) => currentAnswers
    .map( (currentAnswer, index) => {
        return (
            currentAnswer && correctAnswers[index] && 
            (
                (
                    typeof currentAnswer.answer == "string" &&
                    (currentAnswer == correctAnswers[index])
                )
                ||
                (
                    typeof currentAnswer.answer == "boolean" &&
                    (
                        correctAnswers
                        .filter(item => item.answer)
                        .some(item => item.answer == currentAnswer.answer && item.question == currentAnswer.question)
                    )
                )
            )
        )

    })
    .reduce((acc, cur) => acc + (cur ? 1 : 0), 0)

const reset = (
    currentAnswers: { question: string, answer: string | boolean }[][], 
    dispatch: Dispatch, 
    setIsAnswer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    for (let i = 0; i < currentAnswers.length; i++) {
        dispatch(clearAnswers({ index: i }))
        dispatch(shuffle({ index: i }))
    }
    setIsAnswer(false)
}

function Quiz() {
    const correctAnswers = quiz
    const currentAnswers = useSelector((state: RootState) => state.lists.lists)
    const [isAnswer, setIsAnswer] = useState<boolean>(false);
    const dispatch = useDispatch()

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={item.id} component="section" sx={{ m: 2, p:2 }}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. { item.title }
                    </Typography>
                    <Matching index={ index } tasks={ item.tasks } type={ item.type } isDisabled={ isAnswer }/>
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
                <Button variant="contained" onClick={ () => setIsAnswer(true) }>Проверить</Button>
                <Button variant="contained" onClick={ () => reset(currentAnswers, dispatch, setIsAnswer) }>Начать снова</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                {isAnswer && currentAnswers.map( (ans, index) => {
                    const result = getResult(ans, correctAnswers[index].tasks)
                    const checkedAnsCount = ans.filter(item => item.answer).length
                    const correctCount = correctAnswers[index].tasks.filter(item => item.answer).length
                    let resultString
                    if (typeof ans[0].answer == "string") {
                        resultString = result >= ans.length ? 'Все ответы верные' : `Верных ответов: ${result}.`
                    } else {
                        resultString = (checkedAnsCount == correctCount) && (result == correctCount) ? 'Ответ верный' : 'Ответ неверный'
                    }
                    return <Typography key={ index }>Задание { index + 1 }: { resultString }</Typography>
                })}
            </Box>
        </Container>
    );
}

export default Quiz