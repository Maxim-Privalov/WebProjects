import TableHead from './TableHead.jsx'
import TableBody from './TableBody.jsx'
import Filter from './Filter.jsx'
import { useState } from 'react'


const Table = (props) => {
    const [activePage, setActivePage] = useState("1")

    const changeActivePage = (event) => {
        setActivePage(event.target.innerHTML)
    }
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => {
        setActivePage("1");
        setDataTable(value);
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

    let numPage = (0 < Number(activePage) && Number(activePage) <= n) ? activePage : undefined

    if (props.nopagination) {
        numPage = 0;
    }

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
            <table>
                <TableHead head={ Object.keys(props.data[0]) }></TableHead>
                <TableBody body={ dataTable } amountRows={ props.amountRows } numPage={ numPage }></TableBody>
            </table>
            { Boolean(numPage) &&
                <div className="pagination-container">
                    { pages }
                </div> 
            }
        </>
    )
}

export default Table