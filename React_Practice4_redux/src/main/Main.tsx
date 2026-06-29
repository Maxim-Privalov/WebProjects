import { navigation, gallery, sideArticles, posts } from '../data'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Gallery from './components/Gallery'
import ArticleCard from './components/ArticleCard'
import Post from './components/Post'
import { Box, Container, Grid } from '@mui/material'

function Main() {

    return (
        <>
            <NavBar navigationPoints={ navigation } active="1" />
            <Box component="main">
                <Gallery images={ gallery } />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 3 }} component="aside">
                            { sideArticles.slice(0, Math.round(sideArticles.length / 2)).map((item, index) => 
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
                            { sideArticles.slice(Math.round(sideArticles.length / 2)).map((item, index) => 
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
            <Footer></Footer>
        </>
    )
}

export default Main