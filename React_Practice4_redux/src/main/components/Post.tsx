import { Card, CardMedia, Typography, Button, Box } from '@mui/material';

interface PostProps {
    readonly key: number,
    readonly type: string,
    readonly title: string,
    readonly description: string,
    readonly image: string
}

function Post({key, type, title, description, image}: PostProps) {
    if (type === "left" || type === "right") {
        return (
            <Card 
                key={key}
                sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' + ( type == "right" ? "-reverse" : "" ) },
                    padding: 2,
                    gap: 2,
                    alignItems: { xs: 'center', md: 'flex-start' },
                    boxShadow: 0
                }}
            >
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={(theme) => ({

                        width: 200,
                        height: 300,
                        borderRadius: 1.5,
                        objectFit: 'cover',
                        flexShrink: 0,
                        [theme.breakpoints.down('lg')]: {
                            width: 200 / 1.5,
                            height: 300 / 1.5
                        },
                        [theme.breakpoints.down('md')]: {
                            width: 300,
                            height: 400,
                        }
                    })}
                />
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1,
                    gap: 1
                }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                        }}
                    >
                        {description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-' + ( type == 'right' ? 'start' : 'end') }}>
                        <Button 
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                borderRadius: 1.5,
                                minWidth: 100,
                            }}
                        >
                            Подробнее
                        </Button>
                    </Box>
                </Box>
            </Card>
        );
    }
    
    const halfLength = Math.floor(description.length / 2);
    const firstHalf = description.slice(0, halfLength);
    const secondHalf = description.slice(halfLength);
    
    return (
        <Card 
            key={key}
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                gap: 2,
                boxShadow: 0,
            }}>
            <Typography 
                variant="h5" 
                sx={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1.3rem',
                }}>
                {title}
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2,
                alignItems: { xs: 'center', md: 'flex-start' }
            }}>
                <Box sx={{ flex: 1, order: 1}}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                        }}>
                        {firstHalf}
                    </Typography>
                </Box>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={(theme) => ({
                        width: 200,
                        height: 300,
                        borderRadius: 1.5,
                        objectFit: 'cover',
                        flexShrink: 0,
                        order: { xs: 0, md: 2 },
                        [theme.breakpoints.down('lg')]: {
                            width: 200 / 1.7,
                            height: 300 / 1.7
                        },
                        [theme.breakpoints.down('md')]: {
                            width: 300,
                            height: 400,
                        }
                    })}/>
                <Box sx={{ flex: 1, order: 2 }}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                            mb: 1,
                        }}>
                        {secondHalf}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                borderRadius: 1.5,
                                minWidth: 100,
                            }}>
                            Подробнее
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

export default Post;