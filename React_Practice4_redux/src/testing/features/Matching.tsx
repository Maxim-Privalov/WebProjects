import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import SortableList from './SortableList'
import { type tTasks } from "../quizData"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList, shuffle, clearAnswers } from './quizSlice';
import TaskListSingle from './TaskSingle'
import TaskListMultiply from './TaskMultiply'

interface ComponentProps {
    readonly index: number;
    readonly tasks: tTasks;
    readonly type: string;
    readonly isDisabled: boolean;
}

function Matching({ index, tasks, type, isDisabled }: ComponentProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addList({ index, items: tasks }));
        dispatch(clearAnswers({ index }))
        dispatch(shuffle({ index }))
    }, [])

    return (
        <Grid container spacing={2}>
            {type == "M" && (
                <Grid size={6}>
                    <List>
                        {tasks.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemButton
                                    sx={{
                                        border: '1px solid gray',
                                        borderRadius: '5px',
                                        textAlign: 'right',
                                    }}
                                >
                                    <ListItemText primary={item.question} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            )}
            {(type == "M" || type == "S") &&
                <Grid size={type == "M" ? 6 : 12}>
                    <SortableList type={ type } index={ index } isDisabled={ isDisabled }/>
                </Grid>
            }
            {(type == "A" || type == "B") && (
                <Grid size={12}>
                    <List>
                        {(type == "A") ? (
                            <TaskListSingle key={ index } index={ index } isDisabled={ isDisabled }/>
                        ) : (
                            <TaskListMultiply key={ index } index={ index } isDisabled={ isDisabled }/>
                            )
                        }
                    </List>
                </Grid>
            )}
        </Grid>
    );
}
export default Matching