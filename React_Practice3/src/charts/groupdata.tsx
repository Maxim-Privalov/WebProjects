import { type Book } from "../table"

type aggregationData = {
    "Группа": string | number,
    "Предметы": Book[]
}[]

export type tGroup = {
    "id": number,
    "Группа": string | number,
    "Минимальное число копий по миру": number,
    "Максимальное число копий по миру": number,
    "Среднее число копий по миру": number
}[]


export const aggregateBy = (data: Book[], groupType: keyof Book): aggregationData => {
    const keys: Array<string | number> = []
    data.forEach(item => {
        if (groupType == "Жанр (жанры)") {
            item["Жанр (жанры)"].forEach(genre => keys.push(genre))
        } else {
            keys.push(item[groupType])
        }
    })
    const uniqueKeys = new Set(keys)
    const aggData = [...uniqueKeys].map(key => { 
        return {
            "Группа": key, 
            "Предметы": data.filter(item => (Array.isArray(item[groupType]) && typeof key == 'string') ? item[groupType].includes(key) : item[groupType] == key)} 
        })
    if (groupType == 'Год') {
        return aggData.sort((a, b) => typeof a['Группа'] === 'number' && typeof b['Группа'] === 'number' ? a['Группа'] - b['Группа'] : -1)
    }
    return aggData
}

export const getMinMaxAvg = (data: aggregationData): tGroup => 
    data.map((item, index) => {
        return {
            "id": index,
            "Группа": item["Группа"],
            "Минимальное число копий по миру": item["Предметы"].reduce((min, cur) => Math.min(cur["Число копий по миру (в млн.)"], min), 9999),
            "Максимальное число копий по миру": item["Предметы"].reduce((max, cur) => Math.max(cur["Число копий по миру (в млн.)"], max), 0),
            "Среднее число копий по миру": item["Предметы"].reduce((acc, cur) => acc + cur["Число копий по миру (в млн.)"], 0) / item["Предметы"].length
        }
    })
