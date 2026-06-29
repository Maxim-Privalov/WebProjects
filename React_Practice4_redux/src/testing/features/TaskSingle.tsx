import { Paper, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswerToRadio, clearAnswers } from './quizSlice';
import { type RootState } from '../../store';

interface ComponentProps {
    readonly index: number;
    readonly isDisabled: boolean;
}

function TaskListSingle({ index, isDisabled }: ComponentProps) {
    const dispatch = useDispatch();
    
    // Получаем текущий список вариантов
    const singleArr = useSelector((state: RootState) => state.lists.lists[index]) || [];

    // Находим элемент, который пользователь выбрал (где маркер выбранного ответа равен true)
    const selectedOption = singleArr.find(item => item.answer === true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Передаем индекс текущего списка задач и текст выбранного варианта
        dispatch(clearAnswers({ index }))
        dispatch(setAnswerToRadio({ index, markQuestion: event.target.value }));
    };
    
    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mb: 3 }}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                    // Если нашли выбранный элемент, берем его question, иначе — пустую строку
                    value={selectedOption ? selectedOption.question : ""}
                    onChange={handleChange}
                >
                    {singleArr.map((option, index) => (
                        <Paper
                            key={index}
                            variant="outlined"
                            sx={{
                                mb: 1,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <FormControlLabel
                                value={option.question}
                                control={<Radio disabled={ isDisabled }/>}
                                label={option.question}
                                sx={{ width: '100%', mx: 0, px: 2 }}
                            />
                        </Paper>
                    ))}
                </RadioGroup>
            </FormControl>
        </Paper>
    );
}

export default TaskListSingle;