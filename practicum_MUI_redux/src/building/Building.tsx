import Navbar from "../components/Navbar";
import { Container, Typography, Box, Button } from "@mui/material"
import { Link, useParams } from 'react-router-dom'
import structures from "../data";
import { Skeleton } from '@mui/material'

function List() {
    const { id } = useParams();
    const ID = Number(id)

    return (
        <div>
            <Navbar active="0"/>
            <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
                <Typography>
                    <Link to="/"><Button color="info" size="medium">Главная</Button></Link>{"\u003e"} { structures[ID].title }
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h2" sx={{ color: 'grey' }}>{ structures[ID].title }</Typography>
                    { structures[ID].img != "" ?
                    <Box
                        component="img"
                        src={ structures[ID].img }
                        alt={ structures[ID].title }
                        sx={(theme) => ({
                            minHeight: 400,
                            objectFit: 'cover',
                            padding: 4,
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                                minHeight: 0
                            }
                        })}
                        loading="lazy"
                    /> :
                    <Skeleton variant="rectangular" height="100%"/>
                    }
                    <Container maxWidth="lg" sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>
                        <Box sx={{ display: 'flex', flex: 1, margin: '1rem 0' }}>
                            <Typography>{ structures[ID].description[0] }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, margin: '1rem 0' }}>
                            <Typography>{ structures[ID].description[1] }</Typography>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </div>
    );
}
export default List;