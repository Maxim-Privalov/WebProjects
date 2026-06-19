import { useMemo } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface GalleryProps {
    readonly images: Array<{ img: string, title: string }>
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
                    {images.map((item, index) => (
                        <ImageListItem key={ index } cols={ ((index + 1) % 3 == 0 && !isMobile) ? 2 : 1 }>
                            <img
                                srcSet={ item.img }
                                src={ item.img }
                                alt={ item.title }
                                loading="lazy"
                            />
                            <ImageListItemBar position="bottom" title={ item.title } />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container> 
    );
}

export default Gallery;