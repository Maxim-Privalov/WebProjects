import { useState } from 'react'

const Sorter = (props) => {
    const savedSortList = ["Название книги", "Жанр (жанры)", "Автор", "Год", "Страна", "Число копий по миру (в млн.)"]
    const [selectedSort, setSelectedSort] = useState([["Нет", false], ["Нет", false], ["Нет", false]])

    const createSortOptions = (key) => {
        return ["Нет", ...structuredClone(savedSortList
                        .filter(item => !selectedSort.includes(item) || item == selectedSort[key]))]
                .map((item, index) => <option key= { index}>{ item }</option>)
    } 

    const removeSortItem = (target, key, n) => {
        setSelectedSort(selectedSort => {
            let selectedSortCopy = structuredClone(selectedSort)
            selectedSortCopy[key][0] = target
            for (let i = key + 1; i < n; i++) {
                selectedSortCopy[i][0] = "Нет"
            }
            return selectedSortCopy
        })
    }

    const setDescending = (key) => {
        return () => {
            let selectedSortCopy = structuredClone(selectedSort)
            selectedSortCopy[key][1] = selectedSortCopy[key][1] ? false : true
            setSelectedSort(selectedSortCopy)
        }
    }
    
    const sortering= () => {
        
        return (arr) => {
            arr.sort((a, b) => {
                for (const [sortOption, isDesc] of selectedSort) {
                    if (sortOption == "Нет") break
                    let sortA = Array.isArray(a[sortOption]) ? a[sortOption][0] : a[sortOption]
                    let sortB = Array.isArray(b[sortOption]) ? b[sortOption][0] : b[sortOption]
                    let comparison = 0;
                    if (sortOption == "Год" || sortOption == "Число копий по миру (в млн.)") {
                        comparison = isDesc ? sortB - sortA : sortA - sortB
                    } else {
                        comparison = isDesc ? sortB[0].localeCompare(sortA[0]) : sortA[0].localeCompare(sortB[0])
                    }
                    if (comparison != 0) return comparison
                }
                return 0;
            })
            return arr
        }
        //передаем родительскому компоненту отсортированный массив
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        props.updating(sortering())
    }

    const handleReset = (event) => {
        event.preventDefault()

        setSelectedSort([["Нет", false], ["Нет", false], ["Нет", false]])
        props.updating()
    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <table>
                <thead>
                    <tr>
                        <td colSpan="2"><h4>Сортировка</h4></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Уровень первый:</th>
                        <td><select key="0"
                            onChange= { (event) => removeSortItem(event.target.options[event.target.selectedIndex].text, 0, 3) }
                            value= { selectedSort[0][0] }
                            >{ createSortOptions(0) }</select>
                            <label>По убыванию? <input type="checkbox" onChange= { setDescending(0) } checked= { selectedSort[0][1] }></input></label></td>
                    </tr>
                    <tr>
                        <th>Уровень второй:</th>
                        <td><select key="1" disabled= { (selectedSort[0][0] == "Нет" || !selectedSort[0]) ? true : false }
                            value= { selectedSort[1][0] }
                            onChange= { (event) => removeSortItem(event.target.options[event.target.selectedIndex].text, 1, 3) }
                            >{ createSortOptions(1) }</select>
                            <label>По убыванию? <input type="checkbox" onChange= { setDescending(1) } checked= { selectedSort[1][1] }></input></label></td>
                    </tr>
                    <tr>
                        <th>Уровень третий:</th>
                        <td><select key="2" disabled= { (selectedSort[1][0] == "Нет" || !selectedSort[1]) ? true : false }
                            value= { selectedSort[2][0] }
                            onChange= { (event) => removeSortItem(event.target.options[event.target.selectedIndex].text, 2, 3) }
                            >{ createSortOptions(2) }</select>
                            <label>По убыванию? <input type="checkbox" onChange= { setDescending(2) } checked= { selectedSort[2][1] }></input></label></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="submit">Сортировать</button>
                            <button type="reset">Очистить сортировку</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Sorter;