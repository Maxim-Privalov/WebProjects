const Filter = (props) => {
    const handleSubmit= (event) => {
        event.preventDefault();
        // создаем словарь со значениями полей формы
        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Высота": [event.target["heightFrom"].value, event.target["heightTo"].value]
        };

        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for (const key in filterField) {
            if (!(key == "Год" || key == "Высота")) {
                arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));
            } else {
                const fromTo = [
                        filterField[key][0] === '' ? 0 : Number(filterField[key][0]), 
                        filterField[key][1] === '' ? Infinity : Number(filterField[key][1])
                ]
                arr = arr.filter(item => (fromTo[0] <= Number(item[key]) && Number(item[key]) <= fromTo[1]))
            }
        }

        //передаем родительскому компоненту отфильтрованный массив
        props.filtering(arr);
    }

    const handleReset = (event) => {
        event.preventDefault()

        for (const key in Object.keys(event.target)) {
            const tg = event.target[key]
            if (tg?.tagName == "INPUT") {
                tg.value = ""
            }
        }
        
        props.filtering(props.fullData)
    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Type:</label>
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от:</label>
                <input name="yearFrom" type="number" className="small"/>
                <label> до: </label>
                <input name="yearTo" type="number" className="small"/>
            </p>
            <p>
                <label>Высота от:</label>
                <input name="heightFrom" type="number" className="small"/>
                <label> до: </label>
                <input name="heightTo" type="number" className="small"/>
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтры</button>
            </p>
        </form>
    )
}

export default Filter;