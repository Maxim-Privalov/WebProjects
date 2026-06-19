import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart} from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import SettingChart from './SettingChart'
import { type tGroup } from '../groupdata'
import React from 'react'

interface GroupChartProps {
    readonly data: tGroup
}

function GroupChart({ data }: GroupChartProps) {
    const [isBar, setIsBar] = React.useState(true);

    const [series, setSeries] = React.useState({
        'Максимальное число копий по миру': true,
        'Среднее число копий по миру': false,
        'Минимальное число копий по миру': false,
    })
    
    const seriesY = Object.entries(series)
        .filter(item => item[1] == true)
        .map(item => {
            return {dataKey: item[0], label: item[0] }
    });

    const chartSetting = {
        yAxis: [{ label: 'Число копий по миру (млн.)' }],
        height: 400,
    };

    return(
        <Container maxWidth="lg">
            { isBar && <BarChart
                dataset={ data }
                xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                series={ seriesY }
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'center' },
                    },
                }}
                
                {...chartSetting}
            /> }
            { !isBar && <LineChart
                dataset={ data }
                xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                series={ seriesY }
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'center' },
                    },
                }}
                {...chartSetting}
            /> }
            <SettingChart series={ series } setSeries={ setSeries } isBar={ isBar } setIsBar={ setIsBar }/>
        </Container>
        
    )
}

export default GroupChart;