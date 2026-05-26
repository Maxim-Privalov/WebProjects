import TableRow from './TableRow.jsx'

const TableBody = (props) => {

    let begRange = (props.numPage - 1) * props.amountRows;
    let endRange = begRange + Number(props.amountRows);
    if (props.numPage == "0") {
        begRange = 0 
        endRange = props.body.length
    }

    const tbody = props.body.map((item, index) => 
        <tr key={index} className={ (index >= begRange && index < endRange) ? "show" : "hide" }>
            <TableRow row={ Object.values(item) } isHead="0"></TableRow>
        </tr>
    )
    return (
        <tbody>
            { tbody }
        </tbody>
    )
}

export default TableBody