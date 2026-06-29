import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
    lists: { question: string, answer: string }[][]; // хранит перемещаемые элементы каждого списка ответов
}

const initialState: ListsState = {
    lists: [],
};

const shuffleArray = (arr : { question: string, answer: string }[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<{index: number; items: { question: string, answer: string }[]}>) => {
            const { index, items } = action.payload;
            state.lists.splice(index, state.lists.length, items);
        },
        setDraggedItems: (state, action: PayloadAction<{ index: number; items: { question: string, answer: string }[] }>) => {
            const { index, items } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items; // обновляем конкретный список
            }
        },
        shuffle: (state, action: PayloadAction<{ index: number }>) => {
            const { index } = action.payload;
            state.lists[index] = shuffleArray(state.lists[index])
        }
    },
});

// Экспортируем действия и редьюсер
export const { addList, setDraggedItems, shuffle } = listsSlice.actions;
export default listsSlice.reducer