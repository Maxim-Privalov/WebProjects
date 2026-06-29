import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { Box, Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import GroupChart from "./components/GroupChart"
import { type tGroup, aggregateBy, getMinMaxAvg } from './groupdata'
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import { navigation } from "../data"
import { books } from "../table"
import * as React from 'react';

type tSelect = "Страна" | "Год" | "Жанр (жанры)";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Страна");

    const handleChange = (event: SelectChangeEvent) => {
        const selectedGroup = event.target.value as tSelect;
        setGroup(selectedGroup);
        setGroupData(getMinMaxAvg(aggregateBy(books, selectedGroup)));
    }

    const [groupData, setGroupData] = React.useState<tGroup>(getMinMaxAvg(aggregateBy(books, "Страна")));

    const rows: GridRowsProp = groupData;
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1},
        { field: 'Минимальное число копий по миру', flex: 0.5},
        { field: 'Максимальное число копий по миру', flex: 0.5},
        { field: 'Среднее число копий по миру', flex: 0.5},
    ];

    return (
        <div>
            <Navbar active="3" navigationPoints={ navigation }/>
            <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
                <DataGrid
                    rows={rows}
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
                        <MenuItem value="Жанр (жанры)"> Жанр (жанры) </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data={ groupData } />
            <Footer />
        </div>
    );
}
export default Chart;