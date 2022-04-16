import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import './css/Dao.scss';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const connectWallet = {
    marginLeft: 'auto'
}

const fillSpace = {
    height: '45vh'
};

export default function DAO() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            DAO
          </Typography>
          <Button variant="contained" style={connectWallet} >Connect Wallet</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
            >
              DAO
            </Typography>
            <Typography
              variant="h5"
              align="center"
              paragraph
            >
                <Stack>
                10 minutes to contribute. 10 minutes to vote. 
                <br/>infinite possibilites.
                </Stack>
            </Typography>
            {/*stack for one-dimensional column layout */}
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
              <Button variant="contained">Contribute</Button>
              {/*if contributed show redeem shares else show nothing*/}
              <Button variant="outlined">Redeem Shares</Button>
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/** Content body
            * before 10 minutes are up, this will display a countdown component
            * investors create proposals, cards output each proposal
            * 
          */}
          <Grid container spacing={4}>

              <div style={fillSpace}></div>
            {/* {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card style={cardStyle}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Governance Token
                    </Typography>
                    <Typography>
                      Proposal info...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          DAO
        </Typography>
        <Typography variant="subtitle1" align="center">
          All investors will be accredited by shares proportional to the amount contributed
        </Typography>
      </Box>
      {/* End footer */}
    </>
  );
}

