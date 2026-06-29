import Navbar from "../components/NavBar";
import { Container, Typography, Box, Button } from "@mui/material"
import { Link, useParams } from 'react-router-dom'
import { articles, navigation } from "../data";

function Book() {
    const { id } = useParams();
    const ID = Number(id)

    return (
        <div>
            <Navbar active="0" navigationPoints={ navigation }/>
            <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
                <Typography>
                    <Link to="/"><Button color="info" size="medium">Главная</Button></Link>{"\u003e"} { articles[ID].title }
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h2" sx={{ color: 'grey' }}>{ articles[ID].title }</Typography>
                    <Box
                        component="img"
                        src={ articles[ID].img }
                        alt={ articles[ID].title }
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
                    />
                    <Container maxWidth="lg" sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>
                        <Box sx={{ display: 'flex', flex: 1, margin: '1rem 0' }}>
                            <Typography>{ articles[ID].description[0] }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, margin: '1rem 0' }}>
                            <Typography>{ articles[ID].description[1] }</Typography>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </div>
    );
}
export default Book;