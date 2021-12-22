import React from 'react';
import { Pagination } from '@material-ui/lab';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
  select: {
    paddingLeft: 8,
  },
}));

const CustomPagination = ({ perPage, total, paginate, currentPage }) => {
  const classes = useStyles();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.root}>
      <Box display='flex' justifyContent='flex-end'>
        <Pagination
          size='small'
          count={pageNumbers.length}
          variant='outlined'
          shape='rounded'
          onChange={paginate}
          showFirstButton
          showLastButton
          page={currentPage}
        />
      </Box>
    </div>
  );
};

export default CustomPagination;
