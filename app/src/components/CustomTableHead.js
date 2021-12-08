import React, { useCallback } from 'react';
import classNames from 'classname';
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  tableSortLable: {
    cursor: 'text',
    userSelect: 'auto',
    color: 'inherit !important',
  },
  noIcon: {
    '& path': {
      display: 'none !important',
    },
  },
  paddingFix: {
    paddingLeft: theme.spacing(3),
  },
});

const header = [
  {
    id: 'bu',
    numeric: false,
    label: 'BU',
  },
  {
    id: 'bapi_name',
    numeric: false,
    label: 'Bapi Name',
  },
  {
    id: 'bapi_parameter',
    numeric: false,
    label: 'Bapi Parameter',
  },
  {
    id: 'value',
    numeric: false,
    label: 'Value',
  },
  {
    id: 'data_type',
    numeric: false,
    label: 'Data Type',
  },
  {
    id: 'sqlite_table',
    numeric: false,
    label: 'Sqlite Table',
  },
  {
    id: 'created_date',
    numeric: false,
    label: 'Created Date',
  },
  {
    id: 'update_date',
    numeric: false,
    label: 'Update Date',
  },
];

const CustomTableHead = ({ order, orderBy, onRequestSort, classes }) => {
  const createSortHandler = useCallback(
    (property) => (event) => {
      onRequestSort(event, property);
    },
    [onRequestSort]
  );

  return (
    <TableHead>
      <TableRow>
        {header.map((row, index) => (
          <TableCell
            key={index}
            align={row.numeric ? 'right' : 'inherit'}
            padding='default'
            sortDirection={orderBy === row.name ? order : false}
            className={index === 0 && classes.paddingFix}
          >
            {onRequestSort ? (
              <Tooltip
                title='sort'
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  <Typography variant='body2'>{row.label}</Typography>
                </TableSortLabel>
              </Tooltip>
            ) : (
              <TableSortLabel
                className={classNames(classes.TableSortLabel, classes.noIcon)}
              >
                <Typography variant='body2' className={classes.lable}>
                  {row.label}
                </Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
