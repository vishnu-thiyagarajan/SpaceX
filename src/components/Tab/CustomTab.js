import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TableHistory from '../Table/TableHistory';
import TablePayload from '../Table/TablePayload';
// import Paper from '@material-ui/core/Paper';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`scrollable-prevent-tabpanel-${index}`}
//         aria-labelledby={`scrollable-prevent-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//             <Paper>
//             {children}
//             </Paper>
//         )}
//       </div>
//     );
//   }

export default function CustomTab(props) {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "history",
    1: "payload"
  };

  const indexToTabName = {
    history: 0,
    payload: 1
  };
  const [value, setValue] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="History" />
          <AntTab label="Payload" />
        </AntTabs>
        {value === 0 && <TableHistory />}
        {value === 1 && <TablePayload />}
        {/* <TabPanel value={value} index={0}>
              <TableHistory />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TablePayload />
        </TabPanel> */}
        <Typography className={classes.padding} />
      </div>
    </div>
  );
}
