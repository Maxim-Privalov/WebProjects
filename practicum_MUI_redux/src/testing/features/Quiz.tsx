import { Box, Button, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from "../quizData";
import { type RootState } from '../../store';
import Matching from './Matching'
import { useState } from 'react'
import { shuffle } from './quizSlice';
import type { Dispatch } from 'redux';

const getResult = (currentAnswers: { question: string, answer: string }[], correctAnswers: { question: string, answer: string }[]) => currentAnswers
    .map( (currentAnswer, index) => currentAnswer && correctAnswers[index] && currentAnswer == correctAnswers[index])
    .reduce((acc, cur) => acc + (cur ? 1 : 0), 0)

const reset = (currentAnswers: { question: string, answer: string }[][], dispatch: Dispatch, setIsAnswer: React.Dispatch<React.SetStateAction<boolean>>) => {
    for (let i = 0; i < currentAnswers.length; i++) 
        dispatch(shuffle({ index: i }))
    setIsAnswer(false)
}

function Quiz() {
    const correctAnswers = quiz
    const currentAnswers = useSelector((state: RootState) => state.lists.lists)
    const [isAnswer, setIsAnswer] = useState<boolean>(false);
    const dispatch = useDispatch()
    
    const totalCorrectTasks = currentAnswers.reduce((count, ans, index) => {
        const result = getResult(ans, correctAnswers[index].tasks);
        return result >= ans.length ? count + 1 : count;
    }, 0);

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
                {isAnswer && (() => {

                        return currentAnswers.map( (ans, index) => {
                            const result = getResult(ans, correctAnswers[index].tasks);
                            const isAllCorrect = result >= ans.length;
                            const resultString = isAllCorrect ? 'Все ответы верные' : `Верных ответов: ${result}.`
                            return <Typography key={ index }>Задание { index + 1 }: { resultString }</Typography>
                        })
                    })()
                }
                {isAnswer && <Typography>Общее число выполненных заданий: { totalCorrectTasks } </Typography>}
            </Box>
        </Container>
    );
}

export default Quiz