import { Card, CardMedia, Typography, Button, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

interface ArticleCardProps {
    readonly key: number;
    readonly title: string;
    readonly description: string;
    readonly thumbnail: string;
}

function ArticleCard({ key, title, description, thumbnail }: ArticleCardProps) {
    return (
        <Card 
            key={key}
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: grey[200],
                borderRadius: 2,
                padding: 2,
                marginBottom: 5,
                gap: 2,
                boxShadow: 1,
                '&:hover': {
                    boxShadow: 3,
                }
            }}
        >
            <Typography 
                variant="h6" 
                component="h4" 
                sx={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                }}
            >
                {title}
            </Typography>
            
            <CardMedia
                component="img"
                image={thumbnail}
                alt={title}
                sx={{
                    width: '100%',
                    height: 180,
                    borderRadius: 1.5,
                    objectFit: 'cover',
                }}
            />
            
            <Box sx={{
                height: 80,
                overflow: 'hidden',
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 30,
                    background: `linear-gradient(to bottom, transparent, ${grey[200]})`,
                }
            }}>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        textAlign: 'justify',
                        fontSize: '0.8rem',
                        lineHeight: 1.4,
                    }}
                >
                    {description}
                </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1.5,
                        width: 'auto',
                        minWidth: 100,
                    }}
                >
                    Подробнее
                </Button>
            </Box>
        </Card>
    );
}

export default ArticleCard;