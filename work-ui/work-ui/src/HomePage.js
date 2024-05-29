import React from 'react';
import { getWork } from "./api/report";
import {
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Select,
    MenuItem,
    TextField,
    FormControl
} from "@material-ui/core"

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            schedule: !props.location.state ? [
                {
                workOrder : 0,
                facility : "Fac1",
                equipment: "Pump",
                equipmentId : "P000",
                priority : 1,
                submission : "2020-11-21",
                timeComplete : 4,
                status : "open",
                },
                {
                workOrder : 1,
                facility : "Fac1",
                equipment : "Conveyor",
                equipmentId : "P000",
                priority : 1,
                submission : "2020-11-21",
                timeComplete : 4,
                status : "open",
                },
                {
                workOrder : 2,
                facility : "Fac2",
                equipment : "Seperator",
                equipmentId : "Sep028",
                priority : 2,
                submission : "2020-13-9",
                timeComplete : 3,
                status : "open",
                },
                {
                    workOrder : 3,
                    facility : "Fac5",
                    equipment : "Sensor",
                    equipmentId : "Sep826",
                    priority : 4,
                    submission : "2020-13-9",
                    timeComplete : 2,
                    status : "open",
                },
                {
                    workOrder : 4,
                    facility : "Fac1",
                    equipment : "Security",
                    equipmentId : "Sep032",
                    priority : 1,
                    submission : "2020-13-9",
                    timeComplete : 2,
                    status : "open",
                },
                {
                    workOrder : 5,
                    facility : "Fac5",
                    equipment : "Electricity",
                    equipmentId : "El087",
                    priority : 3,
                    submission : "2020-14-9",
                    timeComplete : 2,
                    status : "open",
                },
                {
                    workOrder : 6,
                    facility : "Fac1",
                    equipment : "Networking",
                    equipmentId : "Sep012",
                    priority : 3,
                    submission : "2020-19-9",
                    timeComplete : 2,
                    status : "open",
                },
            ] : props.location.state.schedule,
            technicians : !props.location.state ? [
                {
                    name : "Bob",
                    equipment :["sensor","security","pump"],
                    hourStart: 9,
                    hourEnd: 16
                },
                {
                    name : "Sally",
                    equipment : ["pump","hvac"],
                    hourStart: 3,
                    hourEnd: 13
                },
                {
                    name : "Marcus",
                    equipment : ["vehicle"],
                    hourStart: 6,
                    hourEnd: 19
                },
                {
                    name : "Jackie",
                    equipment : ["conveyor","seperator"],
                    hourStart: 8,
                    hourEnd: 11
                },
                {
                    name : "Jacob",
                    equipment : ["compressor","electricity"],
                    hourStart: 2,
                    hourEnd: 9
                },
                {
                    name : "Lilly",
                    equipment : ["sensor","security","networking"],
                    hourStart: 10,
                    hourEnd: 14
                },
                {
                    name : "Mohammed",
                    equipment : ["pump","hvac"],
                    hourStart: 7,
                    hourEnd: 12
                },
                {
                    name : "Celeste",
                    equipment : ["vehicle"],
                    hourStart: 11,
                    hourEnd: 16
                },
                {
                    name : "Andrew",
                    equipment : ["conveyor","seperator"],
                    hourStart: 11,
                    hourEnd: 19
                },
                {
                    name : "Anh",
                    equipment : ["compressor","electricity"],
                    hourStart: 7,
                    hourEnd: 13
                },
            ] :props.location.state.technicians
        } 
    }

    renderSchedule() {
        const {schedule} = this.state
        if (schedule) {
            return (
                schedule.map(work => this.renderWork(work))
            );
        }
    }

    renderWork(work) {
        return (
            <TableRow>
                <TableCell > {work.workOrder}</TableCell>
                <TableCell align="right"> {work.facility}</TableCell>
                <TableCell align="right"> {work.equipment} </TableCell>
                <TableCell align="right"> {work.equipmentId}</TableCell>
                <TableCell align="right"> {work.priority}</TableCell>
                <TableCell align="right"> {work.timeComplete} </TableCell>
                <TableCell align="right"> {work.submission} </TableCell>
                <TableCell align="right"> {work.technician ? 
                <Button onClick={this.handleClickWorker(work.workOrder)}> 
                    {work.technician}
                </Button> :
                    <Button onClick={this.handleClickAssign(work.workOrder)}>
                        Assign
                    </Button>
                }
                </TableCell>
                <TableCell align="right"> {work.status}</TableCell>
            </TableRow>
        )
    }

    handleClickWorker = (workOrder) => async (event) => {
        this.props.history.push({
            pathname: "/workerPage",
            state: {
                schedule: this.state.schedule,
                technician: this.state.schedule[workOrder].technician,
                technicians: this.state.technicians
            },
        });
    }

    handleClickAssign = (workOrder) => (event) => {
        const {technicians, schedule} = this.state
        this.props.history.push({
            pathname: "/assign",
            state: {
                workOrder : workOrder,
                schedule: schedule,
                technicians: technicians 
            },
        });
    }


    handleClick = async (event) => {
        this.props.history.push({
            pathname: "/insert",
            state: {
                schedule: this.state.schedule,
                technicians: this.state.technicians
            },
        });
    }

    render() {
        return (
            <form className="homePage" style={{backgroundColor:"white"}}>
                <h1 style={{marginLeft: "45%"}}> Home Page </h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Work Order </TableCell>
                            <TableCell align="right"> Facility </TableCell>
                            <TableCell align="right"> Equipment Type </TableCell>
                            <TableCell align="right"> Equipment Id </TableCell>
                            <TableCell align="right"> Priority </TableCell>
                            <TableCell align="right"> Time to Complete </TableCell>
                            <TableCell align="right"> Submission Timestamp </TableCell>
                            <TableCell align="right"> Technician</TableCell>
                            <TableCell align="right"> Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderSchedule()}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={this.handleClick} style={{marginLeft: "2%", fontSize: "150%"}}>
                Add
            </Button>
            </form>
        );
    }

}
