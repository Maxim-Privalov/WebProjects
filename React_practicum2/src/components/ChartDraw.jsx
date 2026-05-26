import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    // заносим в состояния ширину и высоту svg-элемента
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });
    // задаем отступы в svg-элементе
    const margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = Math.max(0, width - margin.left - margin.right);
    const boundsHeight = Math.max(0, height - margin.top - margin.bottom);
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник,
        svg
            .append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", boundsWidth)
            .attr("height", boundsWidth)
            .style("fill", "lightgrey");
    })

    let [min, max] = d3.extent(props.data.map(d => props.oy[0] && props.oy[1] ? d.values[0] : d.values[props.oy.indexOf(true)]));

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", () => "rotate(-30)");
        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        // рисуем легенду
        let legendGroup = svg.append("g")
            .attr("class", "legend-container")
            .attr("transform", `translate(${width - 200}, ${50})`);

        // Создаем элементы легенды
        let legend = legendGroup.selectAll(".legend-item")
            .data(() =>
                props.oy
                .map((item, index) => {
                    if (item) {
                        return { 
                            color: (index == 0 ? "red" : "blue"),
                            name: (index == 0 ? "Максимальная высота" : "Минимальная высота")
                        }
                    }
                })
                .filter(item => item != undefined)
            )
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", function(d, i) {
                return `translate(0, ${i * 25})`;
            });

        // Добавляем цветные маркеры (прямоугольники)
        legend.append("rect")
            .attr("x", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d) { return d.color; })
            .style("stroke", "black")
            .style("stroke-width", "1px");

        // Добавляем текст
        legend.append("text")
            .attr("x", 25)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size", "12px")
            .text(function(d) { return d.name; });


        props.oy.map((item, index) => {

            //рисуем графики
            if (item) {
                props.graphType(svg, props.data, scaleX, scaleY, margin, height, index)
            }
        })
    }, [scaleX, scaleY, props.data, props.oy]);

    return (
        <svg ref={ chartRef }> </svg>
    )
}

export default ChartDraw;