import {
  IconButton,
  Container,
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'

const ucla = createTheme({
  typography: {
    fontFamily: ['Book Antiqua'].join(','),
    button: { fontWeight: 'bolder' },
  },
  palette: {
    uclablue: {
      main: '#a7becf',
      contrastText: '#000000',
    },
    uclayellow: {
      main: '#f5c238',
      contrastText: '#000000',
    },
    fadeyellow: {
      main: '#fcd260',
      contrastText: '#000000',
    },
  },
})

const Navbar = () => {
  const userPages = [
    'Recommendations',
    'Generate Schedules',
    'Personal Information',
    'Quarter Course Log',
  ]
  const userPageLinks = {
    Recommendations: 'recommendations',
    Generate_Schedules: 'generate',
    Personal_Information: 'personal',
    Quarter_Course_Log: 'log',
  }
  const guestPages = ['Register', 'Login']
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <ThemeProvider theme={ucla}>
      <AppBar
        position='static'
        sx={{
          bgcolor: 'black',
          borderBottom: 5,
          borderColor: '#c99906',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box
              component='img'
              sx={{
                height: 40,
                width: 40,
              }}
              src='https://postfiles.pstatic.net/MjAyMjA2MDJfMjUg/MDAxNjU0MTIyMzk5OTE4.8OqxEH2E7RcVc9cqLofMmmtLGC6cbJye5P4Omomjkkog.jQnXa5TCK-s_mxNl5wlFtyyh4Omj2QxX4KlQzCJP138g.PNG.hatbi2000/image.png?type=w773'
            />
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 33,
                ml: 2,
                mb: -0.5,
              }}
            >
              <Link href='/'>CLASSify</Link>
            </Typography>
            {user && (
              <Box sx={{ mr: '0', ml: 'auto' }}>
                {userPages.map((page) => (
                  <Button
                    sx={{ mr: '5px', display: 'inline-block' }}
                    key={page}
                    variant='contained'
                    color='fadeyellow'
                    href={`/${userPageLinks[page.replaceAll(' ', '_')]}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  sx={{ mr: '5px', display: 'inline-block' }}
                  key='logout'
                  variant='contained'
                  color='uclablue'
                  onClick={handleLogout}
                >
                  LOG OUT
                </Button>
              </Box>
            )}
            {!user && (
              <Box sx={{ mr: '0', ml: 'auto' }}>
                {guestPages.map((page) => (
                  <Button
                    sx={{ mr: '5px', display: 'inline-block' }}
                    key={page}
                    variant='contained'
                    color='fadeyellow'
                    href={`${page.toLowerCase()}`}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            )}
            <Typography>{user?.username ?? 'Guest Bruin'}</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
