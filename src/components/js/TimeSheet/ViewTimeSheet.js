import React, { useState, useEffect, } from 'react';
// import Sidebar from './Sidebar'
import axios from 'axios';
import nodeurl from '../../../nodeServer.json'
import '../../css/style.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomGrid from '../../Sub-Component/CustomeGrid';
import Loader from '../../Sub-Component/Loader';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [rowData, setRowData] = useState([]);
    const [columns, setColumns] = useState([
        { id: 'Client', label: 'Client', minWidth: 70 },
        { id: 'Assigned By', label: 'Assigned By', minWidth: 70 },
        { id: 'Assigned To', label: 'Assigned To', minWidth: 70 },
        { id: 'Project', label: 'Project', minWidth: 70 },
        { id: 'Module', label: 'Module', minWidth: 70 },
        { id: 'Task', label: 'Task', minWidth: 70 },
        { id: 'Priority', label: 'Priority', minWidth: 80 },
        { id: 'Status', label: 'Status', minWidth: 120 },
        { id: 'Expected Completed Date', label: 'Expected Completed Date', minWidth: 120 },
        { id: 'FTR', label: 'FTR', minWidth: 70 },
        { id: 'OTD', label: 'OTD', minWidth: 70 },
        { id: 'Create Sub-Task', label: 'Create Sub-Task', minWidth: 70, button: 'Re-Work', onclick: 'onclick("alert()")' }
    ]);
    // useEffect(() => {
    //     axios.post(nodeurl['nodeurl'], { query: 'AB_Employee_Tasksummary ' + EmpId + ',1' }).then(result => {
    //         setRowData(result.data[0]);
    //         setTimeout(() => { setIsLoading(false); }, 800);
    //     });
    // }, []);

    const ViewPanel = () => {
        const [value, setValue] = useState(0);
        const handleChange = (e) => {
            setValue(e.target.value)
            console.log((value))
        }
        return (
            <>
                <div className='viewPanel'>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        // defaultValue="0"
                        >
                            <FormControlLabel value="0" control={<Radio />} onClick={handleChange} label="Date" />
                            <FormControlLabel value="1" control={<Radio />} onClick={handleChange} label="Range" />
                            <FormControlLabel value="2" control={<Radio />} onClick={handleChange} label="Month" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {value === 0 && <>hi</>}
                {value === 1 && <>hsi</>}
                {value === 2 && <>hdi</>}
            </>
        );
    }

    // if (isLoading) return (<Loader />);
    return (<ViewPanel />);
}
