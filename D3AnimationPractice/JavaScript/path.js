/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/

// создаем массив точек, расположенных по кругу
function createPathSpiral(direction, x_start, y_start) {
    let data = [];
    
    let r = 1;
    const k = 15;

    for (let theta = 0 ; theta <= Math.PI * 5; theta += 0.1) {
        r = theta * k * direction;
        data.push(
            {x: x_start - r * Math.sin(theta),
             y: y_start - r * Math.cos(theta)}
        );
    }
    return data
}

const drawPath = (direction, showPaths, x_start, y_start) => {
	// создаем массив точек
	const dataPoints = createPathSpiral(direction, x_start, y_start);

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	// создаем путь на основе массива точек	  
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('stroke', showPaths ? 'black' : "none")
		.attr('fill', 'none');
		
	return path;
}

function translateAlong(path, zx, zy, zx_f, zy_f, angle, angle_f) {
    const length = path.getTotalLength();
    console.log(length);
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y}) scale(${+zx + t*(zx_f - zx)}, ${+zy + t*(zy_f - zy)}) rotate(${+angle + t*(angle_f - angle)})`;
        }
    }
}