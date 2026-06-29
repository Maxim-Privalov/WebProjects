import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Skeleton } from '@mui/material'
import structures from "../../data";

const imgData=structures.slice(0, -1)

function Gallery() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto'}}>
                <ImageList 
                    variant="quilted"
                    sx={{
                        columnCount: {
                            xs: '1 !important',
                            sm: '2 !important',
                            md: '3 !important',
                            lg: '4 !important',
                        },
                    }}
                    gap={ 8 }>
                    {imgData.map((item, index) => (
                        <ImageListItem key={ index }>
                            { item.img != "" ?
                            <MuiLink component={RouterLink} to={ "/building/" + index }>
                                <Box
                                    sx={{ width:"100%", height:"100%" }}
                                    component="img"
                                    src={ item.img }
                                    alt={ item.title }
                                    loading="lazy"
                                />
                            <Link key={ index } to={ "/building/" + index }><ImageListItemBar position="bottom" title={ item.title } /></Link>
                            </MuiLink>
                            : <Skeleton variant="rectangular" height="100%"/>
                            }
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container> 
    );
}
export default Gallery;
