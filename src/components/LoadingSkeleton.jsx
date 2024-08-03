// import React from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import Box from '@mui/material/Box';

// const LoadingSkeleton = (width) => {
//   return (
//     <Box sx={{ width: 300 }}>
//       <Skeleton variant="rectangular" width={300} height={200} />
//       <Skeleton width="60%" />
//       <Skeleton width="80%" />
//       <Skeleton width="40%" />
//     </Box>
//   );
// };

// export default LoadingSkeleton;

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const LoadingSkeleton = ({ width, height }) => {
  return (
    <div className='flex justify-center align-center w-[90%]'>
      <Box sx={{ width: width || '100%', height: height || '100%' }}>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton width="60%" />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </Box>
    </div>
    
  );
};

export default LoadingSkeleton;

