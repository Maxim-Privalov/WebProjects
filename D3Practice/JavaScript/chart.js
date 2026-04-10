"use struct"

function createArrGraph(data, key) {
    if (key == 'Жанр') {
        let booksWithGenres = []
        data.forEach(item => {
            for (genre of item["Жанр (жанры)"]) {
                let itemCopy = structuredClone(item)
                itemCopy["Жанр (жанры)"] = genre
                booksWithGenres.push(itemCopy)
            }
        });
        data = booksWithGenres
        key = "Жанр (жанры)"
    }
    groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Число копий по миру (в млн.)']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }
    return arrGraph;
}

const diagrams = [createChart, createHist, createLinear]

function drawGraph(data, axisBy, isMaximum, type) {
    // значения по оси ОХ
    const keyX = axisBy;

    if (axisBy == "Год") {
        data = data.sort((a, b) => a["Год"] - b["Год"])
    }

    let createDiagram = diagrams[type]

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


function createAxis(svg, data, attr_area, isMaximum) {
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
    
    // Создаем группу для всей легенды и позиционируем её
    var legendGroup = svg.append("g")
        .attr("class", "legend-container")
        .attr("transform", `translate(${attr_area.width - 200}, ${attr_area.marginY + 20})`);

    // Создаем элементы легенды
    var legend = legendGroup.selectAll(".legend-item")
        .data(dd => {
            let res = []
            if (isMaximum == 0 || isMaximum == 2) {
                res.push(legendData[0])
            }
            if (isMaximum == 1 || isMaximum == 2) {
                res.push(legendData[1])
            }
            return res
        })
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", function(d, i) {
            return `translate(0, ${i * 25})`; // Увеличил отступ для читаемости
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

function createLinear(svg, data, scaleX, scaleY, attr_area, color, isMaximum) {
    let lineF = d3.line()
        .x(d => scaleX(d.labelX))
        .y(d => scaleY(isMaximum == 1 ? d.values[isMaximum] - 2 : d.values[isMaximum]))
         .curve(d3.curveBasis); 

    chart = svg.append("path")
        .datum(data)
        .attr("d", lineF)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("stroke-width", "2")
        .style("stroke", color)
}
