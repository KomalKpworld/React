import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({

    image: {
        objectFit:  'cover',
        borderRadius: '20px',
        boxShadow: '0.5em 1em 1em rgb(64,64,70)',
        width: "80%",
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '50%',
            height: '350px',
            display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            marginBottom: '30px',
            display: 'flex'
    
        },
    
    },
}))