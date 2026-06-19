import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "justify",
    marginTop: "1.5em"

}))

interface ComponentProps {
    readonly index : number
    readonly building: {
        img: string,
        title: string,
        description: string[],
    };
}

function BuildCard({ building, index } : ComponentProps) {
    return (
        <Card sx={{ 
            display: 'flex', 
            flexDirection: {
                xs: 'column',
                sm: index % 2 == 0 ? 'row-reverse' : 'row'
            }
        }}>
            <CardMedia
                component="img"
                alt={ building.title }
                image={ building.img }
            />
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        { building.title }
                    </Typography>
                    { building.description.map((item, index) => (
                        <StyledTypography key={index} variant="body2">
                            { item }
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{
                    justifyContent: {
                        xs: 'end',
                        sm: index % 2 == 0 ? 'start' : 'end' 
                    }
                }}>
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default BuildCard;