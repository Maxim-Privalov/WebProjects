import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
    lists: { question: string, answer: string | boolean }[][]; // хранит перемещаемые элементы каждого списка ответов
}

const initialState: ListsState = {
    lists: [],
};

const shuffleArray = (arr : { question: string, answer: string | boolean }[]) => {
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
        addList: (state, action: PayloadAction<{index: number; items: { question: string, answer: string | boolean }[]}>) => {
            const { index, items } = action.payload;
            state.lists.splice(index, state.lists.length, items);
        },
        setDraggedItems: (state, action: PayloadAction<{ index: number; items: { question: string, answer: string | boolean }[] }>) => {
            const { index, items } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items; // обновляем конкретный список
            }
        },
        setAnswerToRadio: (state, action: PayloadAction<{ index: number, markQuestion: string }>) => {
            const { index, markQuestion } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = state.lists[index].map((item) => {
                    return {
                        question: item.question,
                        answer: item.question == markQuestion ? true : item.answer
                    }
                })
            }
        },
        setAnswerToCheckbox: (state, action: PayloadAction<{ index: number, markQuestion: string }>) => {
            const { index, markQuestion } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = state.lists[index].map((item) => {
                    return {
                        question: item.question,
                        answer: item.question == markQuestion ? !item.answer : item.answer
                    }
                })
            }
        },
        clearAnswers: (state, action: PayloadAction<{ index: number }>) => {
            const { index } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = state.lists[index].map((item) => {
                    return {
                        question: item.question,
                        answer: typeof item.answer == "string" ? item.answer : false
                    }
                })
            }
        },
        shuffle: (state, action: PayloadAction<{ index: number }>) => {
            const { index } = action.payload;
            state.lists[index] = shuffleArray(state.lists[index])
        }
    },
});

// Экспортируем действия и редьюсер
export const { addList, setDraggedItems, shuffle, setAnswerToRadio, setAnswerToCheckbox, clearAnswers } = listsSlice.actions;
export default listsSlice.reducer