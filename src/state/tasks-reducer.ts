import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAC} from "./todolists-reducer";

export type RemoveTaskACType = {
    type: "REMOVE-TASK",
    payload: {
        id: string,
        todolistId: string
    }
}
export type AddTaskACType = {
    type: "ADD-TASK",
    payload: {
        title: string,
        todolistId: string
    }
}
export type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>


type ActionsType = RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistAC

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }

        case 'ADD-TASK':
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}

        case  "CHANGE-TASK-STATUS" : {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(m => m.id === action.payload.id
                    ? {...m, isDone: action.payload.isDone}
                    : {...m})
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map
                (m => m.id === action.payload.id
                    ? {...m, title: action.payload.newTitle}
                    : {...m})
            }
        }
case ""
        default:
            throw new Error("I don't understand this type")
    }
}


export const RemoveTaskAC = (id: string, todolistId: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id, todolistId,
        }
    }
}
export const AddTaskAC = (title: string, todolistId: string): AddTaskACType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistId
        }
    }
}
export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            id, isDone, todolistId
        }
    } as const
}
export const ChangeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload:{
            id,newTitle,todolistId
        }
    } as const

}
