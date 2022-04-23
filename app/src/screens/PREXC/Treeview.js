import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import InserProjectButton from './Insert/insertProject';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

// function StyledTreeItem(props) {
//   const {
//     bgColor,
//     color,
//     labelIcon: LabelIcon,
//     labelInfo,
//     labelText,
//     ...other
//   } = props;

//   return (
//     <StyledTreeItemRoot
//       label={
//         <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
//           <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
//           <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </Box>
//       }
//       style={{
//         '--tree-view-color': color,
//         '--tree-view-bg-color': bgColor,
//       }}
//       {...other}
//     />
//   );
// }

export default function CustomizedTreeView(props) {
  const { handleRefresh } = props;
  const prexcState = useSelector((state) => state.prexc);
  const distinctProject = (array) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.id)) {
        // map.set(item.id, true);    // set any value to Map
        result.push({
          ...item
        });
      }
    }
    return result;
  }
  return (
    <TreeView
      aria-label="customized"
      // defaultExpanded={[1, 2, 3, 4, 5, 6]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{ height: 264, flexGrow: 1, overflowY: 'auto' }}
    >
      {
        prexcState.orgOutcome.map((oo) => {
          return (
            <StyledTreeItem nodeId={`oo-${oo.OrganizationalOutcomeId}`} label={<div><span className='text-muted'>Organizational Outcome:</span> {oo.OrganizationalOutcomeTitle} <InserProjectButton orgOutcomeId={oo.OrganizationalOutcomeId} handleRefresh={() => handleRefresh()} /></div>} >
              {prexcState.projectIndicators.filter(i => i.OrgOutcomeId === oo.OrganizationalOutcomeId).map(i => {
                return <StyledTreeItem nodeId={`project-${i.ProgramId}`} label={
                  <div><span className='text-muted'>Project:</span> {i.ProgramTitle} <PlusSquare onClick={() => null} /></div>}>
                </StyledTreeItem>
              })}
              {/* <StyledTreeItem nodeId="2" label={<div><span className='text-muted'>Project:</span> Number of education researches completed <PlusSquare onClick={() => null} /></div>}>
                <StyledTreeItem nodeId="4" label="Basic Education Inputs" />
              </StyledTreeItem>
              <StyledTreeItem nodeId="3" label="Inclusive Education">
                <StyledTreeItem nodeId="4" label="Support to Schools and Learners" />
              </StyledTreeItem>
              <StyledTreeItem nodeId="5" label="Support to Schools and Learners">
              </StyledTreeItem>
              <StyledTreeItem nodeId="6" label="Education Human Resource Development" /> */}
            </StyledTreeItem>)
        })
      }
    </TreeView >
  );
}