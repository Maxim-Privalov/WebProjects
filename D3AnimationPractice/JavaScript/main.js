document.addEventListener("DOMContentLoaded", function() {

    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height);

    document.querySelector('#animateBtn').addEventListener("click", function() {
        runAnimation(
            document.querySelector("#setting"), 
            document.querySelector("#effects"),
            document.querySelector("#showPaths").checked
        );
    })

    document.querySelector('#clearBtn').addEventListener("click", function() {
        clearCanvas();
    })

})

const getFormData = (dataForm) => {
    const reqObjectValue = (id) => {
        const obj = document.getElementById(id);
        return obj ? obj.value : null;
    };

    return Object.fromEntries(
        Object.entries({ 
            x: reqObjectValue('cx'), 
            y: reqObjectValue('cy'),
            zx : reqObjectValue('zoomx'),
            zy : reqObjectValue('zoomy'),
            zx_f : reqObjectValue('zoomx_finish'),
            zy_f : reqObjectValue('zoomy_finish'),
            angle: reqObjectValue('angle'),
            angle_f : reqObjectValue('angle_finish'),
            speed: reqObjectValue('animationSpeed'),
            direction: reqObjectValue('animationDirection')
        }).map(([key, value]) => [key, value == '' ? 0 : value])
    )
}

const clearCanvas = () => {
    const svg = d3.select("svg");
    svg.selectAll('*').remove();
}


const runAnimation = (settingForm, effectsForm, showPaths) => {
	const svg = d3.select("svg")
    let pict = drawPerson(svg);
    let {x, y, speed, direction} = getFormData(settingForm);
    let {zx, zy, zx_f, zy_f, angle, angle_f} = getFormData(effectsForm);
    let path = drawPath(direction == 0 ? 1 : -1, showPaths, x, y);
    pict.transition()
    .duration(speed * 1000)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(path.node(), zx, zy, zx_f, zy_f, angle, angle_f));
}