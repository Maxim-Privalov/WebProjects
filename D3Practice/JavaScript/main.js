document.addEventListener("DOMContentLoaded", function() {
     showTable('build', books, header);

     d3.select("#createChartBtn")
        .on("click", function(event) {
            event.preventDefault()
            let form = d3.select("#chartForm")
            const getcheckeditems = (name) => form.selectAll(`[name="${name}"]`).nodes().filter(item => item.checked);
            const oy = getcheckeditems("oy")
            const ox = getcheckeditems("ox")

            d3.select("#error").select("*").remove()
            drawGraph(books, 
                ox[0].value,
                oy.length > 1 ? 2 : oy[0].value,
                d3.select("#chartTypeSelect").nodes()[0].value - 1
            )
            
            d3.selectAll(`[name="oy"]`)
                .on("change", function() {
                    if (getcheckeditems("oy").length == 0) {
                        d3.select("#error").text("Значения для OY не заданы!")
                        d3.select("#createChartBtn").property("disabled", true)
                    } else {
                        d3.select("#error").text("")
                        d3.select("#createChartBtn").property("disabled", false)
                    }
                })
        });

     d3.select("#hideTableBtn")
        .on("click", function() {
            let table = d3.select("#build");
            if (table.style("display") === "none") {
                this.innerHTML = "Скрыть таблицу"
                table.style("display", "table");
            } else {
                this.innerHTML = "Показать таблицу"
                table.style("display", "none");
            }
        })
})