function createArrGraph(data, key) {

    groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }
    return arrGraph;
}


function drawGraph(data, axisBy, isMaximum, isHist) {
    // значения по оси ОХ
    const keyX = axisBy;

    if (axisBy == "Год") {
        data = data.sort((a, b) => a["Год"] - b["Год"])
    }

    let createDiagram = createChart;
    if (isHist) {
        createDiagram = createHist;
    }


    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    let svg = d3.select("svg")
    svg.selectAll('*').remove();
    // создаем словарь с атрибутами области вывода графика
    attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, isMaximum);

    // рисуем график
    if (isMaximum == 0 || isMaximum == 2) {
        createDiagram(svg, arrGraph, scX, scY, attr_area, "blue", 0)
    }
    if (isMaximum == 1 || isMaximum == 2) {
        createDiagram(svg, arrGraph, scX, scY, attr_area, "red", 1)
    }
}


function createAxis(svg, data, attr_area, isMaximum){
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const [min, max] = d3.extent(data.map(d => isMaximum == 0 ? d.values[0] : d.values[1]))
    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1 ])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    const axisX = d3.axisBottom(scaleX); // горизонтальная
    const axisY = d3.axisLeft(scaleY); // вертикальная
    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX},
        ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX},
        ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, isMaximum) {
    const r = 4;
    svg.selectAll(`.dot-${color}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `.dot-${color}`)
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(isMaximum == 1 ? d.values[isMaximum] + 2 : d.values[isMaximum] - 2))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createHist(svg, data, scaleX, scaleY, attr_area, color, isMaximum) {
    const xBandWidth = scaleX.bandwidth() / 2
    svg.selectAll(`.rect-${color}`)
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `.rect-${color}`)
        .attr("x", d => scaleX(d.labelX) + xBandWidth + (isMaximum == 1 ? -xBandWidth / 2 : 0))
        // attr_area.height - attr_area.marginY * 2 - scaleY(isMaximum == 1 ? d.values[isMaximum] : d.values[isMaximum]))
        .attr("y", d => scaleY(isMaximum == 1 ? d.values[isMaximum] : d.values[isMaximum]))
        .attr("width", xBandWidth / 2)
        .attr("height", d => attr_area.height - attr_area.marginY * 2 - scaleY(isMaximum == 1 ? d.values[isMaximum] : d.values[isMaximum]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}
