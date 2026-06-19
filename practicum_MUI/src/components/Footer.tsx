import { Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box"

function Footer() {
    const theme = useTheme();

    return (
        <Box sx={{ background: theme.palette.text.secondary, marginTop: "2rem", padding: "1.5rem", borderRadius: "10px" }}>
            <Typography sx={{ color: "white" }}>Привалов Максим Б9123-09.03.04 / 2</Typography>
        </Box>
    )
}

export default Footer;