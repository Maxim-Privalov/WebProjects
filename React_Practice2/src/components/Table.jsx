import TableHead from './TableHead.jsx'
import TableBody from './TableBody.jsx'
import Filter from './Filter.jsx'
import Sorter from './Sorter.jsx'
import { useState, useRef } from 'react'


const Table = (props) => {
    const [activePage, setActivePage] = useState("1")

    const changeActivePage = (event) => {
        setActivePage(event.target.innerHTML)
    }
    const [dataTable, setDataTable] = useState(props.data);
    const transformations = useRef({});

    /*
        {
            "FILTERING": func(),
            "SORTERING": func()
        }
    */

    const updateDataTable = (mode) => {
        return (transformation) => {
            if (transformation) {
                transformations.current[mode] = transformation
            } else {
                if (mode in transformations.current) {
                    delete transformations.current[mode];
                }
            }

            let startedData = structuredClone(props.data)
            if (!(activePage == 0) && (mode != "SORTERING")) {
                setActivePage("1");
            }
            
            for (const key of Object.keys(transformations.current)) {
                startedData = transformations.current[key](startedData)
            }
            setDataTable(startedData);
            props.changeGraphData(startedData)
        }
    }

    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (_, i) => i + 1);

    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
        <span key={ index } onClick={ changeActivePage }
        className={"pag-item " + ((index + 1 == activePage) ? "selected" : "") }> { item } </span>
    );

    return (
        <>
            <Filter updating={ updateDataTable("FILTERING") } ref={ transformations } activePage= { activePage } data={ dataTable } fullData={ props.data }/>
            <Sorter updating={ updateDataTable("SORTERING") } ref={ transformations } data={ dataTable } fullData={ props.data }/>
            <label> Добавить пагинацию
                <input type="checkbox" id="setPaginaton" onChange= { (event) => event.target.checked ? setActivePage(1) : setActivePage(0) } defaultChecked ></input>
            </label>
            <table>
                <TableHead head={ Object.keys(props.data[0]) }></TableHead>
                <TableBody body={ dataTable } amountRows={ props.amountRows } activePage={ activePage }></TableBody>
            </table>
            { Boolean(activePage) &&
                <div className="pagination-container">
                    { pages }
                </div> 
            }
        </>
    )
}

export default Table