import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {NewConversationsModal} from "./NewConversationsModal";
import {NewContactsModal} from "./NewContactsModal";
import {ModalContainer} from "./ModalContainer";
import {Contacts} from "./Contacts";
import {Conversations} from "./Converstions";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        height: '100vh',
        overflow: 'hidden',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    windowSidebar: {
        overflowY: 'auto',
        // height: 'calc(100vh - 135px)'
    },
    id: {
        padding: '10px',
        borderTop: '1px solid #ccc'
    },
    button: {
        marginBottom: '10px',
        width: '100%'
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const CONVERSATIONS_KEY = 0;
const CONTACTS_KEY = 1;

export function Sidebar({id}) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeKey, setActiveKey] = React.useState(CONVERSATIONS_KEY);

    const conversationsOpen = activeKey === CONVERSATIONS_KEY

    const handleChange = (event, newValue) => {
        setActiveKey(newValue);
    };

    const handleChangeIndex = (index) => {
        setActiveKey(index);
    };

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.windowSidebar}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={activeKey}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Conversations" {...a11yProps(CONVERSATIONS_KEY)} />
                        <Tab label="Contacts" {...a11yProps(CONTACTS_KEY)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeKey}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={activeKey} index={CONVERSATIONS_KEY}
                              dir={theme.direction}>
                            <Conversations />

                    </TabPanel>
                    <TabPanel value={activeKey} index={CONTACTS_KEY}
                              dir={theme.direction}>
                        <Contacts />
                    </TabPanel>
                </SwipeableViews>
            </div>
            <div className={classes.id}>

                <Typography variant="body1" gutterBottom>
                    Your ID: {id}
                </Typography>
                <Button variant="contained" onClick={handleOpen} color="primary" className={classes.button}>
                    {conversationsOpen ? 'Conversations' : 'Contact'}
                </Button>
            </div>
            <ModalContainer openModal={openModal}
                            handleClose={handleClose}
                            conversationsOpen={conversationsOpen}
            />
        </div>
    );
}