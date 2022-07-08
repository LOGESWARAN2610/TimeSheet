import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import nodeurl from '../../../nodeServer.json'
import ViewTimeSheet from './ViewTimeSheet'
import TimeSheetGrid from '../../Sub-Component/TimeSheetGrid';
import NavBar from '../../Sub-Component/NavBar';
import Loader from '../../Sub-Component/Loader';
import setTheme from '../../Sub-Component/setTheme';

export default function EnterTimeSheet() {
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [isLoading, setIsLoading] = useState(true);

    const [EnterTimeSheet, setEnterTimeSheet] = useState([]);
    const [ProjectList, setProjectList] = useState([]);
    const [ModuleList, setModuleList] = useState([]);
    const [TasktList, setTasktList] = useState([]);
    const [StatusList, setStatusList] = useState([]);
    const [taskDate, setTaskDate] = useState((new Date().toLocaleDateString()).toString());
    const EnterTimeSheetColumn = [
        { field: 'Row', headerName: 'S No.', width: 100 },
        { field: 'ProjectId', headerName: 'Project', width: 100, editable: true, type: 'singleSelect', valueOptions: ProjectList },
        { field: 'ModuleId', headerName: 'Module', width: 100, type: 'singleSelect', editable: true, valueOptions: ModuleList },
        { field: 'TaskName', headerName: 'Task', width: 100, type: 'singleSelect', editable: true, valueOptions: TasktList },
        { field: 'TaskDescription', headerName: 'Description', width: 200, editable: true },
        { field: 'Issues', headerName: 'Issue', width: 100, type: 'input', editable: true },
        { field: 'Object', headerName: 'Object', width: 100, type: 'input', editable: true },
        { field: 'Status', headerName: 'Status', width: 100, type: 'singleSelect', editable: true, valueOptions: StatusList },
        { field: 'Hours', headerName: 'Hours', width: 100, type: 'number', editable: true },
        { field: 'Remove', headerName: 'Hours', width: 100, type: 'button' }
    ];
    useEffect(() => {
        setTheme();
        axios.post(nodeurl['nodeurl'], { query: 'AB_Inprogressgrid ' + EmpId + ',"' + taskDate + '"' }).then(result => {
            setEnterTimeSheet(result.data[0]);
            setIsLoading(false);
        });
        axios.post(nodeurl['nodeurl'], { query: 'AB_EmployeeProjectList ' + EmpId }).then(result => {
            setProjectList((result.data[0]).map(a => a['ProjectName']));
            setIsLoading(false);
        });
        axios.post(nodeurl['nodeurl'], { query: 'AB_ModuleList ' + 5 }).then(result => {
            setModuleList((result.data[0]).map(a => a['ModuleName']));
            setIsLoading(false);
        });
        axios.post(nodeurl['nodeurl'], { query: 'AB_TaskList 5,51,2,' + EmpId }).then(result => {
            setTasktList((result.data[0]).map(a => a['TaskName']));
            setIsLoading(false);
        });
        axios.post(nodeurl['nodeurl'], { query: 'AB_StatusList' }).then(result => {
            setStatusList((result.data[0]).map(a => a['TypeName']));
            setIsLoading(false);
        });
    }, []);
    function TabPanel(props) {

        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={"span"} variant={"body2"}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    function FullWidthTabs(props) {
        const [value, setValue] = useState(1);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };

        return (
            <Box sx={{ bgcolor: 'inherit' }}>
                <AppBar position="static" style={{ width: '305px', marginLeft: '25px', backgroundColor: '#fff' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ color: localStorage['BgColor'] }}
                    >
                        <Tab label="Enter TimeSheet" className='tab' {...a11yProps(0)} />
                        <Tab label="View TimeSheet" className='tab'  {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    //axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <TimeSheetGrid Columns={EnterTimeSheetColumn} Rows={EnterTimeSheet} Pagination={false} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewTimeSheet />
                    </TabPanel>

                </SwipeableViews >
            </Box >
        );
    }

    if (isLoading)
        return (<NavBar Component={<Loader />} />);
    else
        return (<NavBar Component={<FullWidthTabs val="2" />} />);
}
