import Container from '@mui/material/Container';
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import { books } from "../../table"

const processedBooks = books.map((book, index) => ({
    ...book,
    'id': index,
    'Жанр (жанры)': Array.isArray(book['Жанр (жанры)']) 
        ? book['Жанр (жанры)'].join(', ') 
        : book['Жанр (жанры)']
}));

function BuildingsGrid() {
    const rows: GridRowsProp = processedBooks;
    const columns: GridColDef[] = [
        { field: 'Название книги', headerName: 'Название', flex: 1},
        { field: 'Жанр (жанры)', flex: 0.5},
        { field: 'Автор', flex: 0.5},
        { field: 'Год', flex: 0.5},
        { field: 'Страна' },
        { field: 'Число копий по миру (в млн.)'},
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                showToolbar={true}
                columns={columns}
            />
        </Container>
    );
}
export default BuildingsGrid;
