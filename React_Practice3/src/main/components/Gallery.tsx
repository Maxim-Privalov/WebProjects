import { useMemo } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface GalleryImage {
    articleId: number,
    img: string,
    title: string
}

interface GalleryProps {
    readonly images: GalleryImage[]
}

function Gallery({ images }: GalleryProps) {
    const theme = useTheme();
  
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const galleryCols = useMemo(() => {
        if (isMobile) return 1
        if (isTablet) return 2
        return 6
    }, [isMobile, isTablet])

    const rowHeight = useMemo(() => {
        if (isMobile) return 200
        if (isTablet) return 250
        return 300
    }, [isMobile, isTablet])



    return (
        <Container>
            <Box sx={{ m: '20px auto'}}>
                <ImageList 
                    variant="quilted"
                    cols={ galleryCols }
                    rowHeight={ rowHeight }
                    gap={ 8 }>
                    {images.map((item: GalleryImage, index) => (
                        <ImageListItem key={ index } cols={ ((index + 1) % 3 == 0 && !isMobile) ? 2 : 1 } sx={{ overflow:"hidden" }}>
                            <MuiLink component={RouterLink} to={ "/book/" + index }>
                                <Box
                                    sx={{ width:"100%", height:"100%" }}
                                    component="img"
                                    src={ item.img }
                                    alt={ item.title }
                                    loading="lazy"
                                />
                            <Link key={ index } to={ "/book/" + index }><ImageListItemBar position="bottom" title={ item.title } /></Link>
                            </MuiLink>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container> 
    );
}

export default Gallery;