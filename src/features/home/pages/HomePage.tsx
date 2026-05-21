import { Fragment } from 'react'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import QuizIcon from '@mui/icons-material/Quiz'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../../app/routes/paths'

const FEATURES = [
  { color: '#e8f5f1', icon: <QuizIcon sx={{ fontSize: 28 }} />, title: 'Cuestionarios de programación', desc: 'Crea cuestionarios personalizados incluyendo ejercicios de programación y/o preguntas tipo test.' },
  { color: '#faecea', icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />, title: 'Creación de cuestionarios con IA', desc: 'Genera cuestionarios adaptados a tus necesidades de forma automática usando inteligencia artificial.' },
  { color: '#f3f0fb', icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />, title: 'Evaluación automática con IA', desc: 'Comparte tus cuestionarios y la inteligencia artificial evaluará las respuestas de forma automática.' },
]

const STEPS = [
  { num: '01', color: '#f2dbd7', title: 'Regístrate', desc: 'Crea tu cuenta en segundos' },
  { num: '02', color: '#d4e8e3', title: 'Crea un cuestionario', desc: 'Añade preguntas de texto o código' },
  { num: '03', color: '#ece7f3', title: 'Compártelo', desc: 'Invita a otros con un enlace directo' },
  { num: '04', color: '#fdf3d7', title: 'Evalúa las respuestas', desc: 'La IA revisa automáticamente' },
]

const HomePage = () => {

  return (

    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py:10, gap: { xs: 8, lg: 15, xl:18}, background: 'linear-gradient(to bottom, #faf5f3 0%, #faf5f3 26%, #f3faf8 46%, #f3faf8 58%, #f7f5fd 78%, #f7f5fd 100%)' }}>
      
      <Container maxWidth="lg">

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4 }}>

          <Typography variant="h1" fontWeight={700} color="primary.main" sx={{ fontSize: { xs: '2rem', md: '2rem' } }}>
            Crea cuestionarios de programación
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 2, maxWidth: 500 }}>
            Diseña cuestionarios que combinen preguntas tipo test con ejercicios de programación. Compártelos y revisa los resultados fácilmente.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, px: 3.5 }}>
            <Button component={RouterLink} to={PATHS.auth.login} variant="contained" size="large" startIcon={<LoginIcon />} sx={{ borderRadius: 1, fontWeight: 600, '& .MuiButton-startIcon': { display: { xs: 'none', sm: 'flex' } } }}>
              Iniciar sesión
            </Button>
            <Button component={RouterLink} to={PATHS.user.register} variant="outlined" size="large" startIcon={<PersonAddIcon />} sx={{ borderRadius: 1, fontWeight: 600, '& .MuiButton-startIcon': { display: { xs: 'none', sm: 'flex' } } }}>
              Crear cuenta
            </Button>
          </Box>

        </Box>

      </Container>


      <Container maxWidth="xl">

        <Grid container spacing={{ xs: 2, lg: 4 }} alignItems="stretch" justifyContent="center">

          {FEATURES.map(({ color, icon, title, desc }) => (

            <Grid key={title} size={{ xs: 12, sm: 10, md: 8, lg: 4 }} sx={{ display: 'flex' }}>

              <Paper sx={{ borderRadius: 2, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: { xs: 'none', lg: 200 } }}>
                
                <Box sx={{ bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, px: 4, py: 3, color: 'text.secondary' }}>
                  {icon} <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
                </Box>

                <Box sx={{ p: 4, flex: 1, textAlign: 'center' }}>
                  <Typography color="text.secondary" variant="body2" lineHeight={1.8}>{desc}</Typography>
                </Box>

              </Paper>

            </Grid>

          ))}
          
        </Grid>

      </Container>


      <Container maxWidth="xl">

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Typography variant="overline" color="primary.main" fontSize="14px" fontWeight={700} letterSpacing={2} textAlign="center">Cómo funciona</Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: { xs: 3, sm: 0 } }}>

            {STEPS.map(({ num, color, title, desc }, i) => (

              <Fragment key={num}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0.8, flex: 1 }}>

                  <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 2px rgba(0,0,0,0.30)' }}>
                    <Typography fontWeight={800} color="text.primary" fontSize="0.75rem">{num}</Typography>
                  </Box>

                  <Typography variant="body2" fontWeight={700} color="text.secondary">{title}</Typography>

                  <Typography variant="caption" color="text.secondary" lineHeight={1.5}>{desc}</Typography>

                </Box>

                { (i < STEPS.length - 1) && 
                <Box sx={{ height: 1.5, width: 40, bgcolor: 'text.disabled', opacity: 0.3, flexShrink: 0, mt: 2.5, display: { xs: 'none', sm: 'block' } }} />
                }
              
              </Fragment>

            ))}

          </Box>

        </Box>

      </Container>

    </Box>
  )
}

export default HomePage
