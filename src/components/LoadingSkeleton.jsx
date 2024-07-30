import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton variant="rectangular" width={300} height={200} />
      <Skeleton width="60%" />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </Box>
  );
};

export default LoadingSkeleton;
