import { AppBar, Toolbar } from '@mui/material';

const Header = () => {
    const logo = "https://dashboard.getinvoice.co/dboard/img/logo.png";

    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <img 
                    src={logo} 
                    alt="Invoice Processing System Logo" 
                    style={{ width: 120, height: 'auto' }} 
                    loading="lazy" 
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
