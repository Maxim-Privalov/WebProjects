// создаем изображение смайлик
// рисуем его относительно точки (0, 0)
function drawPerson(svg) {
    let person = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 8)
        .style("fill", "black");

    //бошка 
    person.append("circle") 
        .attr("cx", 0)
        .attr("cx", 0)
        .attr("r", 16)
        .style("fill", "transparent")
        .style("stroke-width", 8)

    //туловище
    person.append("line")
        .attr("x1", 0)
        .attr("y1", 16)
        .attr("x2", 0)
        .attr("y2", 64)

    //ручки
    person.append("line")
        .attr("x1", 0)
        .attr("y1", 16)
        .attr("x2", -24)
        .attr("y2", 16 + 32)
    
    person.append("line")
        .attr("x1", 0)
        .attr("y1", 16)
        .attr("x2", 24)
        .attr("y2", 16 + 32)

    //ноги
    person.append("line")
        .attr("x1", 0)
        .attr("y1", 64)
        .attr("x2", -24)
        .attr("y2", 64 + 32)
    
    person.append("line")
        .attr("x1", 0)
        .attr("y1", 64)
        .attr("x2", 24)
        .attr("y2", 64 + 32)

    // улыбка
    // let arc = d3.arc()
    //    .innerRadius(35)
    //    .outerRadius(35);    
    // smile.append("path")
    //    .attr("d", arc({startAngle: Math.PI /3 * 2, endAngle: Math.PI/3 * 4}))
    //    .style("stroke", "brown")

     return person 
}