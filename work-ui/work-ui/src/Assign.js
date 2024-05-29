import React from 'react';
import { getWork } from "./api/report";
import {
    Paper,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormControl,
    Grid,
    Button
} from "@material-ui/core"

export default class Assign extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            workOrder: props.location.state.workOrder,
            schedule: props.location.state.schedule,
            technicians: props.location.state.technicians,
            techAssign: ""
        };
    }

    handleChange = async (event) => {
        this.setState({techAssign : event.target.value})
    }

    renderTechnician(tech, equipment) {
        if (tech.equipment.includes(equipment.toLowerCase())) {
            return (
                <MenuItem value={tech.name}>{tech.name}</MenuItem>
            );
        }
    }
    
    handleClick = async (event) => {
        var {schedule, workOrder, technicians} = this.state
        var techIndex;
        technicians.map(tech => tech.name == this.state.techAssign ? 
            techIndex = technicians.indexOf(tech) : null);
        if (technicians[techIndex].hourStart + schedule[workOrder].timeComplete <= technicians[techIndex].hourEnd) {
            technicians[techIndex].hourStart += schedule[workOrder].timeComplete
            schedule[workOrder].technician = this.state.techAssign
            schedule[workOrder].status = "on going"
            this.setState({schedule, technicians}) 
            this.props.history.push({
                pathname: "/workerPage",
                state: {
                    schedule: schedule,
                    technician: schedule[workOrder].technician,
                    technicians: technicians
                },
            });
        } else {
            this.props.history.push({
                pathname: "/",
                state: {
                    schedule: schedule,
                    technicians: technicians
                },
            });   
        }
        
    }
    
    render() {
        const {workOrder, schedule} = this.state;
        return (
            <Paper>
            <Grid>
            <FormControl variant="filled">  
            <InputLabel>Technicians</InputLabel>
            <Select
                id="select-technician"
                value={this.state.techAssign}
                onChange={this.handleChange}
                style={{marginLeft:"10px", height:"20px"}}
                >
                {this.state.technicians.map(tech => this.renderTechnician(tech, schedule[workOrder].equipment))}
            </Select>
            </FormControl>
            </Grid>
            <Button onClick={this.handleClick}>
                Submit
            </Button>
            </Paper>
        );
    }
}