import { Box, Typography, Divider } from '@mui/material'

function Footer() {
    return (
        <Box component="footer">
            <Divider />
            <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2">Максим Привалов</Typography>
                <Typography variant="body2">Группа: Б9123-09.03.04 / 2</Typography>
            </Box>
        </Box>
    )
}

export default Footer;