import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupChart from "./components/GroupChart"
import { countries, years, types, type tGroup } from './groupdata'
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import { Container } from '@mui/material'
import * as React from 'react';


type tSelect = "Страна" | "Год" | "Тип";
function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Страна");

    const handleChange = (event: SelectChangeEvent) => {
        const selectedGroup = event.target.value as tSelect;
        setGroup(selectedGroup);
        
        switch (selectedGroup) {
            case 'Страна':
                setGroupData(countries);
                break;
            case 'Год':
                setGroupData(years);
                break;
            case 'Тип':
                setGroupData(types);
                break;
        }
    }

    const [groupData, setGroupData] = React.useState<tGroup>(countries);

    const rows: GridRowsProp = groupData;
    const columns: GridColDef[] = [
 { field: 'Группа', headerName: 'Группа', flex: 1},
 { field: 'Минимальная высота', flex: 0.5},
 { field: 'Максимальная высота', flex: 0.5},
 { field: 'Средняя высота', flex: 0.5},
 ];


    return (
        <div>
            <Navbar active="3"/>
            <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
                <DataGrid
                    rows={rows}
                    showToolbar={true}
                    columns={columns}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                />
            </Container>
            <Box sx={{ width:"200px", m:"auto" }}>
                <FormControl fullWidth>
                    <InputLabel> Группировать по </InputLabel>
                    <Select
                        id="select-group"
                        value={ group }
                        label="Группировать по"
                        onChange={ handleChange }
                    >
                        <MenuItem value="Страна"> Стране </MenuItem>
                        <MenuItem value="Год"> Году </MenuItem>
                        <MenuItem value="Тип"> Типу </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data={ groupData } />
            <Footer />
        </div>
    );
}
export default Chart;