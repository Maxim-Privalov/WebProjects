import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio'

type tSeries= {
    'Максимальное число копий по миру': boolean,
    'Среднее число копий по миру': boolean,
    'Минимальное число копий по миру': boolean,
}

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<
        React.SetStateAction<tSeries>
    >;
    isBar: boolean;
    setIsBar: React.Dispatch<
        React.SetStateAction<boolean>
    >;

};

function SettingChart({series, setSeries, isBar, setIsBar}: CheckboxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
            ...series,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ 
                my: '20px', 
                justifyContent: 'center'
             }}
        >
            <FormControl>
                <FormLabel id="label-radio-group">
                Тип диаграммы:
                </FormLabel>
            <RadioGroup
                name="group-radio"
                value={(isBar) ? "bar": "dot"}
            >
                <FormControlLabel value="bar"
                    control={
                        <Radio checked={isBar} onChange={ () => setIsBar(true) }/>
                    }
                    label="Гистограмма"
                />
                <FormControlLabel value="dot"
                    control={
                        <Radio checked={!isBar} onChange={ () => setIsBar(false) }/>
                    }
                label="Линейная" 
                />
            </RadioGroup>
        </FormControl>
        <FormControl>
            <FormLabel id="label-checkbox-group">
            На диаграмме показать:
            </FormLabel>
            <FormControlLabel
                control={
                    <Checkbox checked={series["Максимальное число копий по миру"]}
                    onChange={handleChange}
                    name="Максимальное число копий по миру" />
                }   
                label="Максимальное число копий по миру" />
            <FormControlLabel
                control={
                    <Checkbox checked={series["Среднее число копий по миру"]}
                    onChange={handleChange}
                    name="Среднее число копий по миру" />
                }
                label="Среднее число копий по миру" />
            <FormControlLabel
                control={
                    <Checkbox checked={series["Минимальное число копий по миру"]}
                    onChange={handleChange}
                    name="Минимальное число копий по миру" />
            }
            label="Минимальное число копий по миру" />
        </FormControl>
    </Stack>
    )
}

export default SettingChart;