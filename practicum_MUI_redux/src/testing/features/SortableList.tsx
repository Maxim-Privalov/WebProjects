import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { SortableItem } from '../components/SortableItem'
import { useDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizSlice';
import { type RootState } from '../../store';

interface ComponentProps {
    readonly index: number;
    readonly isDisabled: boolean;
    readonly type: string;
}

function SortableList({ index, type, isDisabled }: ComponentProps ) {
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.lists.lists[index])
    const draggedItems = arr || [];

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = draggedItems.map(item => item.answer).indexOf(active.id.toString());
            const newIndex = draggedItems.map(item => item.answer).indexOf(over?.id.toString() ?? "");
            const newList = arrayMove(draggedItems, oldIndex, newIndex)
            dispatch(setDraggedItems({ index, items: newList }));
        }
    };
    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext 
                items={ draggedItems.map(item => item.answer) }
                strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem key={ item.answer } item={ item.answer } label={ type == "M" ? item.answer : item.question } isDisabled={ isDisabled }/>
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;