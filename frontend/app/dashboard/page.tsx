import Image from "next/image";
import Drawer from "@/components/drawer";
import { Box, Typography, LinearProgress } from '@mui/material'

export default function Home() {
  const progress = 423;
  const goal =1000;
  return (
    <main className="min-h-screen bg-dark-bg-gr-to-purple flex" style ={{backgroundColor: '#1D1625'}}>
      <Drawer/>
      <Box
    sx={{
      width: 309,
      height: 209,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      border: '1px solid #1D1625', 
      borderRadius: '10px',
      backgroundImage: 'linear-gradient(90deg, rgba(20, 20, 20, 0.5) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(20, 20, 20, 0.5) 100%)',
      backdropFilter: 'blur(20px)',
      p: 2,
      pt: 4
    }}
  >
    <Typography variant="h5" sx={{ color: 'lightgrey', textAlign: 'left', mb: 2, fontSize: '1.2rem' }}>Net Savings</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        pb: 2
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', fontSize: '1.2rem', textAlign: 'left' }}>R<span style={{ fontSize: '0.8rem', color: 'white' }}>S</span></Typography>
      <Typography variant="h3" sx={{ color: 'white', fontSize: '2rem', ml: 1, fontWeight: 'bold' }}>423</Typography>
    </Box>
    <Typography variant="h6" sx={{ color: 'yellow', fontSize: '1rem', textAlign: 'left', mb: 2 }}>Saving Goals: Rs {goal}</Typography>
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress
        variant="determinate"
        value={(progress / goal) * 100}
        sx={{
          width: '100%',
          height:'20px',
          borderRadius: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: '5px',
            backgroundColor: 'yellow',
            height:'20px'
          }
        }}
      />
    </Box>
  </Box>
    </main>
  );
}