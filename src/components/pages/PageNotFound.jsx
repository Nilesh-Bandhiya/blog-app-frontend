import { Box, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "66vh"
      }}
    >
      <Typography variant="h1" sx={{ fontWeight:'bold' }}>
        Page Not Found
      </Typography>
    </Box>
  )
}

export default PageNotFound