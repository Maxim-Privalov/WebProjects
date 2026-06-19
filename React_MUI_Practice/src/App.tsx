import './styles/style.css';
import { navigation, gallery, articles, posts } from './data'
import NavBar from './components/NavBar'
import Gallery from './components/Gallery'
import ArticleCard from './components/ArticleCard'
import Post from './components/Post'
import { Box, Container, Grid, Divider, Typography } from '@mui/material'

function App() {

    return (
        <>
            <NavBar navigationPoints={ navigation } active="1" />
            <Box component="main">
                <Gallery images={ gallery } />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 3 }} component="aside">
                            { articles.slice(0, Math.round(articles.length / 2)).map((item, index) => 
                                <ArticleCard 
                                    key={ index }
                                    title={ item.title }
                                    description={ item.description }
                                    thumbnail={ item.thumbnail }
                                />
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} component="section">
                            { posts.map((item, index) =>
                                <Post
                                    type={ ((index + 1) % 2) == 0 ? "center" : ((index + 1) % 3 == 0 ? "left" : "right") }
                                    key={ index }
                                    title={ item.title }
                                    description={ item.description }
                                    image={ item.image }
                                />
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }} component="aside">
                            { articles.slice(Math.round(articles.length / 2)).map((item, index) => 
                                <ArticleCard 
                                    key={ index }
                                    title={ item.title }
                                    description={ item.description }
                                    thumbnail={ item.thumbnail }
                                />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box component="footer">
                <Divider />
                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="body2">Максим Привалов</Typography>
                    <Typography variant="body2">Группа: Б9123-09.03.04 / 2</Typography>
                </Box>
            </Box>
        </>
    )
}

export default App