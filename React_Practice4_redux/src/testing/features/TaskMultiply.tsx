import { Paper, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setAnswerToCheckbox } from './quizSlice';
import { type RootState } from '../../store';


interface ComponentProps {
    readonly index: number
    readonly isDisabled: boolean
}


function TaskListMultiply({ index, isDisabled } : ComponentProps) {
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.lists.lists[index])
    const multiplyArr = arr || [];

    const handleChange = (question: string) => () => {
        dispatch(setAnswerToCheckbox({ 
            index, 
            markQuestion: question
        }))
    }

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mb: 3 }}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormGroup>
                    {multiplyArr.map((option) => (
                        <Paper
                            key={option.question}
                            variant="outlined"
                            sx={{
                                mb: 1,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                }
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={ typeof option.answer == "string" ? true : option.answer }
                                        onChange={handleChange(option.question)}
                                        disabled={ isDisabled }
                                    />
                                }
                                label={option.question}
                                sx={{ width: '100%', mx: 0, px: 2 }}
                            />
                        </Paper>
                    ))}
                </FormGroup>
            </FormControl>
        </Paper>
    )
}

export default TaskListMultiply;