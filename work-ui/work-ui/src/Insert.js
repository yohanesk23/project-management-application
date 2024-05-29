import React from 'react'
import { Grid, Paper, TextField, InputLabel } from "@material-ui/core";
import moment from "moment"

export default class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            schedule: props.location.state.schedule,
            facility:"",
            equipment:"",
            equipmentId:"",
            priority:0,
            timeComplete:0,
            technicians : props.location.state.technicians
        };
    }

    handleChange = (name) => (event) => {
        this.setState({[name] : event.target.value})
    }

    handleSubmit = async (event) => {
        var {facility, equipmentId, priority, timeComplete, schedule, equipment} = this.state;
        let newWork = {
            workOrder : schedule.length,
            facility : facility,
            equipment : equipment,
            equipmentId : equipmentId,
            priority : priority,
            submission : moment().format("YYYY-MM-DD"),
            timeComplete : timeComplete,
            status : "open",
        }
        schedule.push(newWork);
        this.props.history.push({
            pathname: "/",
            state: {
                schedule: schedule,
                technicians: this.state.technicians
            },
        });
    }

    render() {
        return (
            <Paper >
                <Grid>
                    <InputLabel style={{fontSize:"150%"}}>Facility</InputLabel>
                    <TextField
                    required
                    id="facility"
                    InputProps={{ disableUnderline: false }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange("facility")}
                    />
                </Grid>
                <Grid>
                    <InputLabel style={{fontSize:"150%"}}>Equipment</InputLabel>
                    <TextField
                    required
                    id="equipment"
                    InputProps={{ disableUnderline: false }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange("equipment")}
                    />
                </Grid>
                <Grid>
                    <InputLabel style={{fontSize:"150%"}}>Equipment Id</InputLabel>
                    <TextField
                    required
                    id="EquipmentId"
                    InputProps={{ disableUnderline: false }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange("equipmentId")}
                    />
                </Grid>
                <Grid>
                    <InputLabel style={{fontSize:"150%"}}>Priority</InputLabel>
                    <TextField
                    required
                    id="priority"
                    InputProps={{ disableUnderline: false }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange("priority")}
                    />
                </Grid>
                <Grid>
                    <InputLabel style={{fontSize:"150%"}}>Time to Complete</InputLabel>
                    <TextField
                    required
                    id="timeComplete"
                    InputProps={{ disableUnderline: false }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange("timeComplete")}
                    />
                </Grid>
                <div>
                    <input
                    id="submitButton"
                    type="button"
                    value="Submit"
                    onClick={this.handleSubmit}
                    />
                </div>
            </Paper>
        );
    }
}