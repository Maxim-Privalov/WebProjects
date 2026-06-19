import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react'


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

const getSelectedMenuItemStyle = (active : boolean): SxProps<Theme> => ({
    ...(active ? {
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
        } 
    } : {
        '&:hover': {
            backgroundColor: 'primary.light',
        } 
    }),
    padding: '1em'
});

interface ComponentProps {
    readonly active: string;
}


function NavBar({ active } : ComponentProps) {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                mt: '28px',
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                        Самые высокие здания и сооружения
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button variant={ (active == "1") ? "contained" : "text" } color="info" size="medium">
                            Главная
                        </Button>
                        <Button variant={ (active == "2") ? "contained" : "text" } color="info" size="medium">
                            Список зданий
                        </Button>
                        <Button variant={ (active == "3") ? "contained" : "text" } color="info" size="medium">
                            Контакты
                        </Button>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            anchor="top"
                            open={ open }
                            onClose={toggleDrawer(false)}
                        >
                            <Box>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                    <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuList sx={{ padding: 0 }}>
                                    <MenuItem sx={ getSelectedMenuItemStyle(active == "1") }>Главная</MenuItem>
                                    <MenuItem sx={ getSelectedMenuItemStyle(active == "2") }>Список зданий</MenuItem>
                                    <MenuItem sx={ getSelectedMenuItemStyle(active == "3") }>Контакты</MenuItem>
                                </MenuList>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;