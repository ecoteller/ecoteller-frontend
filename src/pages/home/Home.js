import { useRef } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { CgShapeCircle } from 'react-icons/cg';
import Logo from '../../components/Logo';
import Menu from '../../components/menu/Menu';
import Scene from '../../components/3d/Scene';

function Home() {
  const containerScene = useRef(null);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <Container maxWidth="lg">
        <Box className="h-screen pt-8">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <Box className="flex items-center">
                <Logo size="lg" />
              </Box>
            </Grid>
            <Grid item xs={6} ref={containerScene}>
              <Menu containerRef={containerScene} />
            </Grid>
            <Grid item xs={6}>
              <Scene />
            </Grid>
            <Grid item xs={6}>
              <Box className="flex flex-col gap-y-4 text-white">
                <Typography variant="h1">Ecoteller</Typography>
                <Typography variant="h2">Use your plate and plant it !</Typography>
                <Typography variant="body1" className="mt-2">
                  Biodegradable disposable plates made from recycling paper, organic wastes and
                  seeds. A plate to be planted after being used
                </Typography>
              </Box>
              <Box className="mt-4">
                <Button variant="contained" color="primary" endIcon={<CgShapeCircle />}>
                  Get more info
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="h-screen">{/* Content */}</Box>
      </Container>
    </div>
  );
}

export default Home;
