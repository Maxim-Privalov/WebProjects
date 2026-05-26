import { useState } from "react";
import ChartDraw from "./ChartDraw.jsx"
import * as d3 from "d3";


const createChart = (svg, data, scaleX, scaleY, margin, height, index) => {
    svg .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[index] + index * 5) )
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill", index == 0 ? "red" : "blue")
}

const createHist = (svg, data, scaleX, scaleY, margin, height, index) => {
    const xBandWidth = scaleX.bandwidth() / 2
    svg.selectAll(`.rect`)
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `.rect`)
        .attr("x", d => scaleX(d.labelX) + xBandWidth + (index == 0 ? -xBandWidth / 2 : 0))
        .attr("y", d => scaleY(d.values[index]))
        .attr("width", xBandWidth / 2)
        .attr("height", d => height - margin.bottom - margin.top - scaleY(d.values[index]))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill", index == 0 ? "red" : "blue")
};

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false])
    const [graphType, setGraphType] = useState(() => createChart);

    const [error, setError] = useState("")

    const createArrGraph =(data, key)=>{
        let groupObj = d3.group(data, d => d[key]);
        if (key == "Год") {
            groupObj = new d3.InternMap(d3.sort(groupObj, ([a], [b]) => d3.ascending(a, b)))
        }
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота'])).reverse();
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target["oy"][0].checked || event.target["oy"][1].checked) {
            setOx(event.target["ox"].value);
            setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
            setGraphType(Number(event.target["graphType"].value) ? () => createHist : () => createChart)
            setError("")
        } else {
            setError("Выберите хотя-бы один OX пункт!")
            const svg = d3.select("svg");
            svg.selectAll("*").remove();
        }
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit= { handleSubmit }>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"}/>Страна
                    <br/>
                    <input type="radio" name="ox" value="Год" />Год
                </div>
                <p> Значение по оси OY </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />Максимальная высота
                    <br/>
                    <input type="checkbox" name="oy" />Минимальная высота
                </div>
                <p> Тип диаграммы 
                    <select name="graphType">
                        <option value="0">Точечная диаграмма</option>
                        <option value="1">Гистограмма</option>
                    </select>
                </p>
                <p>
                    <button type="submit">Построить </button>
                </p>
                <p style= {{ color: "red" }}>{ error }</p>
            </form>
            <ChartDraw data={ createArrGraph(props.data, ox) } ox= { ox } oy= { oy } graphType= { graphType }/>
        </>
    )
}

export default Chart;