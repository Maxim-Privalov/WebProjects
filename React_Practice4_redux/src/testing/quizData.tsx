export type tTasks ={
    "question": string; /* вопрос задания*/
    "answer": string | boolean; /* ответ задания*/
}[]

export type tQuizzes = {
    "id": number,
    "type": "M" | "S" | "B" | "A", /* типы заданий, М - сопоставление*/
    "title": string, /* формулировка задания */
    "tasks": tTasks,
}[];

export const quiz: tQuizzes = [
    {
        "id": 1,
        "type": "M",
        "title": "Сопоставьте название книги с её автором.",
        "tasks": [
            {
                "question": "Don Quixote",
                "answer": "Miguel de Cervantes"
            },
            {
                "question": "The Lord of the Rings",
                "answer": "J.R.R. Tolkien"
            },
            {
                "question": "Twilight",
                "answer": "Stephenie Meyer"
            },
            {
                "question": "War and Peace",
                "answer": "Leo Tolstoy"
            },
            {
                "question": "The Count of Monte Cristo",
                "answer": "Alexandre Dumas"
            }
        ]
    },
    {
        "id": 2,
        "type": "M",
        "title": "Сопоставьте книгу с количеством проданных копий (в млн.).",
        "tasks": [
            {
                "question": "Frankenstein",
                "answer": "200"
            },
            {
                "question": "The Hobbit",
                "answer": "100"
            },
            {
                "question": "Harry Potter and the Chamber of Secrets",
                "answer": "77"
            },
            {
                "question": "The Da Vinci Code",
                "answer": "80"
            },
            {
                "question": "The Catcher in the Rye",
                "answer": "65"
            }
        ]
    },
    {
        "id": 3,
        "type": "S",
        "title": "Отсортировать здания по убыванию их высоты",
        "tasks": [
            {
                "question": "Don Quixote",
                "answer": "1"
            },
            {
                "question": "The Count of Monte Cristo",
                "answer": "2"
            },
            {
                "question": "War and Peace",
                "answer": "3"
            },
            {
                "question": "The Hobbit",
                "answer": "4"
            },
            {
                "question": "Harry Potter and the Philosopher's Stone",
                "answer": "5"
            }
        ]
    },
    {
        "id": 4,
        "type": "B",
        "title": "Какие из перечисленных книг написаны британскими авторами? (Выберите все подходящие варианты)",
        "tasks": [
            {
                "question": "Frankenstein",
                "answer": true
            },
            {
                "question": "War and Peace",
                "answer": false
            },
            {
                "question": "The Lord of the Rings",
                "answer": true
            },
            {
                "question": "The Adventures of Pinocchio",
                "answer": false
            },
            {
                "question": "Harry Potter and the Goblet of Fire",
                "answer": true
            },
            {
                "question": "The Da Vinci Code",
                "answer": false
            }
        ]
    },
    {
        "id": 5,
        "type": "A",
        "title": "Какая книга была издана раньше всех остальных?",
        "tasks": [
            {
                "question": "Frankenstein",
                "answer": true
            },
            {
                "question": "The Lion, the Witch and the Wardrobe",
                "answer": false
            },
            {
                "question": "The Picture of Dorian Gray",
                "answer": false
            },
            {
                "question": "The Hobbit",
                "answer": false
            },
            {
                "question": "Crime and Punishment",
                "answer": false
            }
        ]
    },
    {
        "id": 6,
        "type": "A",
        "title": "Какая из перечисленных книг НЕ относится к жанру \"Фэнтези\"",
        "tasks": [
            {
                "question": "The Lord of the Rings",
                "answer": false
            },
            {
                "question": "Harry Potter and the Philosopher's Stone",
                "answer": false
            },
            {
                "question": "The Hobbit",
                "answer": false
            },
            {
                "question": "Crime and Punishment",
                "answer": true
            },
            {
                "question": "Twilight",
                "answer": false
            }
        ]
    }
]