import { Skeleton } from '@mui/material';
import React from 'react';

export default () => {
    return (
        <div>
            <Skeleton variant="rectangular" height={300} />
            <br/>
            <Skeleton variant="rectangular" height={300} />
        </div>
    )
}