const Filter = (props) => {
    const filtering = (event) => {
        const filterField = {
            "Название книги": event.target["book_name"].value.toLowerCase(),
            "Жанр (жанры)": event.target["genres"].value.toLowerCase(),
            "Автор": event.target["author"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Страна": event.target["country"].value.toLowerCase(),
            "Число копий по миру (в млн.)": [event.target["copiesFrom"].value, event.target["copiesTo"].value]
        };

        return (arr) => {
            for (const key in filterField) {
                if (!(key == "Год" || key == "Число копий по миру (в млн.)")) {
                    arr = arr.filter(item => {
                        const union_item = Array.isArray(item[key]) ? item[key].join(", ") : item[key]
                        return union_item.toLowerCase().includes(filterField[key])
                    })
                } else {
                    const fromTo = [
                            filterField[key][0] === '' ? 0 : Number(filterField[key][0]), 
                            filterField[key][1] === '' ? Infinity : Number(filterField[key][1])
                    ]
                    arr = arr.filter(item => (fromTo[0] <= Number(item[key]) && Number(item[key]) <= fromTo[1]))
                }
            }
            return arr
        }
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        props.updating(filtering(event))
    }

    const handleReset = (event) => {
        event.preventDefault()

        for (const key in Object.keys(event.target)) {
            const tg = event.target[key]
            if (tg?.tagName == "INPUT") {
                tg.value = ""
            }
        }
        
        props.updating()
    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <table>
                <thead>
                    <tr>
                        <td colSpan="2"><h4>Фильтры</h4></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Название книги:</th>
                        <td><input name="book_name" type="text" /></td>
                    </tr>
                    <tr>
                        <th>Жанр (жанры):</th>
                        <td><input name="genres" type="text" /></td>
                    </tr>
                    <tr>
                        <th>Автор:</th>
                        <td><input name="author" type="text" /></td>
                    </tr>
                    <tr>
                        <th>Год</th>
                        <td>от:
                        <input name="yearFrom" type="number" className="small"/>
                        <label> до: </label>
                        <input name="yearTo" type="number" className="small"/></td>
                    </tr>
                    <tr>
                        <th>Страна:</th>
                        <td><input name="country" type="text" /></td>
                    </tr>
                    <tr>
                        <th>Число копий по миру (в млн.)</th> 
                        <td>от:
                        <input name="copiesFrom" type="number" className="small"/>
                        <label> до: </label>
                        <input name="copiesTo" type="number" className="small"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="submit">Фильтровать</button>
                            <button type="reset">Очистить фильтры</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Filter;