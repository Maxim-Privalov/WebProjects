import buildings from "../table";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import { Container } from '@mui/material'

function BuildingsGrid() {
 const rows: GridRowsProp = buildings;
 const columns: GridColDef[] = [
 { field: 'Название', headerName: 'Название', flex: 1},
 { field: 'Тип', flex: 0.5},
 { field: 'Страна', flex: 0.5},
 { field: 'Город', flex: 0.5},
 { field: 'Год', flex: 0.25 },
 { field: 'Высота'},
 ];

 return (
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
 <DataGrid
 rows={rows}
 showToolbar={true}
 columns={columns}
 localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
 />
 </Container>
 );
}
export default BuildingsGrid;