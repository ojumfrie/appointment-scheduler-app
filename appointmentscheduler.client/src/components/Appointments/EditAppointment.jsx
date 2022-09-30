import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {Navigate, Link} from 'react-router-dom';
import { urls } from '../../urls';

// Addition
import { services } from '../../services';


class EditAppointment extends Component {
    state = {
        id: 0,
        title: '',
        description: '',
        active: true,

        coach: 0,
        schedule: 0,
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',

        coaches: [],
        coaches_elems: '',
        schedules: [],
        schedules_elems: '',

        dates_error_list: {},
        coach_schedule_error_list: {},
        error_list: [],
        is_to_redirect_to_list: false,
    }

    captureId() {
        let location = window.location.href.split("/");
        return location[location.length - 1];
    }

    async componentDidMount() {
        let id = this.captureId();
        let url = urls.API +`appointment/coaches-schedules/${id}`;
        const res = await axios.get(url);

        console.log(res);

        if (res.status === 200) {
            this.updateMainStates(res.data[0][0], res.data[1][0]);
            this.updateDropdownStates(res.data[2], res.data[3]);
            this.generateCoachesElements(res.data[2]);
            this.generateSchedulesElements(res.data[3]);
            this.extractDatesToState(res.data[1][0]);
        } else {
            swal.fire({
            title: 'Not Found.',
            text: "Appointment cannot be found.",
            icon: 'warning',
            confirmButtonText: 'OK',
            }).then(() => {
                this.setState({
                    is_to_redirect_to_list: true,
                });
            });
        }
    }

    handleChange = (e) => {
        let temp_value = e.target.value;

        if (e.target.name === 'active') {
            temp_value = !e.target.value;
        } else if (e.target.name === 'coach') {
            this.generateSchedulesElements(parseInt(temp_value));
        }

        this.setState({
            [e.target.name]: temp_value
        });
    }

    handleSave = async (e) => {
        e.preventDefault();

        this.setState({
            dates_error_list: {},
            coach_schedule_error_list: {},
        });

        let temp_start_date = this.state.start_date;
        let temp_start_time = this.state.start_time;
        let temp_end_date = this.state.end_date;
        let temp_end_time = this.state.end_time;

        let error_list = services.validate_date_values({
            start_date: temp_start_date,
            start_time: temp_start_time,
            end_date: temp_end_date,
            end_time: temp_end_time,
        });

        let error_list_coach_schedule = services.validate_non_date_values({
            coach: this.state.coach,
            schedule: this.state.schedule,
        });

        if (services.is_object_empty(error_list) && services.is_object_empty(error_list_coach_schedule)) {
            const id = this.captureId();
                await axios.put(urls.API+`appointment/edit/${id}`, {
                    "title": this.state.title,
                    "description": this.state.description,
                    "active": (this.state.active)?1:0,
                    "details": {
                        "appointmentId": 0,
                        "coachId": parseInt(this.state.coach),
                        "coachScheduleId": this.state.schedule,
                        "startDate": this.calculateInputDate(this.state.start_date, this.state.start_time),
                        "endDate": this.calculateInputDate(this.state.end_date, this.state.end_time),
                        "active": 1,
                    }
                }).then((val) => {
                    // console.log(val);
                    swal.fire({
                        title: 'Updated!',
                        text: 'Appointment successfully updated!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        this.setState({
                            is_to_redirect_to_list: true,
                        });
                    });
                }).catch((error) => {
                    // console.log(error);

                    if (error.response.status === 400) {
                        swal.fire({
                            title: error.response.data.title,
                            text: error.response.data.errors.appointment[0],
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            this.setState({
                                is_to_redirect_to_list: true,
                            });
                        });
                    } else {
                        swal.fire({
                            title: error.code,
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            this.setState({
                                is_to_redirect_to_list: true,
                            });
                        });
                    }
                });

                // console.log(res);

                // if (res.status === 200) {
                //     // if (res.data.length > 0) {
                //         swal.fire({
                //             title: 'Updated!',
                //             text: 'Appointment successfully updated!',
                //             icon: 'success',
                //             confirmButtonText: 'OK',
                //         }).then(() => {
                //             this.setState({
                //                 is_to_redirect_to_list: true,
                //             });
                //         });
                //     // }
                // } else {
                //     swal.fire({
                //         title: 'Bad Request',
                //         text: 'Saving appointment failed.',
                //         icon: 'error',
                //         confirmButtonText: 'OK',
                //     }).then(() => {
                //         // this.setState({
                //         //     is_to_redirect_to_list: true,
                //         // });
                //     });
                // }

        } else {
            this.setState({
                dates_error_list: error_list,
                coach_schedule_error_list: error_list_coach_schedule,
            });
        }
    }

    extractDatesToState(data) {
        let temp_start_ate = new Date(data.startDate);
        let temp_end_date = new Date(data.endDate);

        let start_date = `${temp_start_ate.getFullYear()}-${("0" + (temp_start_ate.getMonth() + 1)).slice(-2)}-${temp_start_ate.getDate()}`;
        let start_time = `${("0" + (temp_start_ate.getHours() + 1)).slice(-2)}:${("0" + (temp_start_ate.getMinutes() + 1)).slice(-2)}`;
        let end_date = `${temp_end_date.getFullYear()}-${("0" + (temp_end_date.getMonth() + 1)).slice(-2)}-${temp_end_date.getDate()}`;
        let end_time = `${("0" + (temp_end_date.getHours() + 1)).slice(-2)}:${("0" + (temp_end_date.getMinutes() + 1)).slice(-2)}`;

        this.setState({ start_date, start_time, end_date, end_time });
    }

    calculateInputDate(input_date, input_time) {
        let temp_date = new Date(`${input_date} ${input_time}`);
        let timezone_offset_revert = (-(temp_date.getTimezoneOffset() / 60));
        let tempMilliseconds = temp_date.setTime(temp_date.getTime() + timezone_offset_revert * 60 * 60 * 1000);
        return new Date(tempMilliseconds).toISOString();
    }

    generateCoachesElements(data) {
        let key = 1;
        let selected = '';
        let temp_elems = data.map((item) => {
            key++;

            if (item.id === this.state.coach) selected = 'selected'

            return(
                <option key={key} value={item.id}>{item.name}</option>
            );
        });

        temp_elems.unshift(<option key="1"> --- </option>);

        this.setState({coaches_elems: !this.state.coaches_elems}, () => {
            this.setState({
                coaches_elems: temp_elems
            });
        });
    }

    generateSchedulesElements(coach_id = 0) {
        let temp_scheds = [];
        let temp_elems = <option> --- </option>;
        let scheds = this.state.schedules;

        if (coach_id > 0) {
            // CoachId here is based on the user selection upong selecting from the Coach select options

            for (let i=0; i<scheds.length; i++) {
                if (scheds[i].coachId === coach_id) {
                    temp_scheds.push(scheds[i]);
                }
            }
        } else {
            // CoachId here is based on the original value of the record prior to updating
            for (let i=0; i<scheds.length; i++) {
                if (scheds[i].coachId === this.state.coach) {
                    temp_scheds.push(scheds[i]);
                }
            }
        }

        if (temp_scheds.length > 0) {
            let key = 0;

            temp_elems = temp_scheds.map((item) => {
                key++;
                return(
                    <option key={key} value={item.id}>{services.reformatDate(item.startAvailabilityDate)}&nbsp;&nbsp;to&nbsp;&nbsp;{services.reformatDate(item.endAvailabilityDate)}</option>
                )
            });
        }

        this.setState({
            schedules_elems: temp_elems,
        });
    }

    updateDropdownStates(coaches, schedules) {
        this.setState({
            coaches: coaches,
            schedules: schedules,
        });
    }

    updateMainStates(apps, app_details) {
        let s_date = services.split_into_date_and_time(app_details.startDate);
        let e_date = services.split_into_date_and_time(app_details.endDate);

        this.setState({
            id: apps.id,
            title: apps.title,
            description: apps.description,
            active: (apps.active===1)?true:false,

            coach: app_details.coachId,
            schedule: app_details.coachScheduleId,
            start_date: s_date.date,
            start_time: s_date.time,
            end_date: e_date.date,
            end_time: e_date.time,
        });
    }
    

    render() {
        return (
            <div>
                {this.state.is_to_redirect_to_list && <Navigate to="/appointments" />}
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Edit Appointment
                                        <Link to="/appointments" className="btn btn-success btn-sm float-end">Go to List</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSave}>
                                    <div className="form-group mt-2">
                                            <label>Title</label>
                                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Enter title" />
                                            <span className="text-danger small">{this.state.error_list.title}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Description</label>
                                            <input name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control" placeholder="Enter description" />
                                            <span className="text-danger small">{this.state.error_list.description}</span>
                                        </div>
                                        <div className="form-group mt-2 form-check form-switch">
                                            <input name="active" defaultChecked={this.state.active} onChange={this.handleChange} className="form-check-input" type="checkbox" id="switch-type-check" />
                                            <label className="form-check-label" htmlFor="switch-type-check">Active</label>
                                            <span className="text-danger small">{this.state.error_list.active}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Coach</label> <Link to="/create-coach" className="small float-end">Add Coach</Link>
                                            <select name="coach" value={this.state.coach} onChange={this.handleChange} className="form-control">
                                                {this.state.coaches_elems}
                                            </select>

                                            <span className="text-danger small">{this.state.coach_schedule_error_list.coach}</span>
                                            
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Coach Availability</label>
                                            <select name="schedule" value={this.state.schedule} onChange={this.handleChange} className="form-control">
                                                {this.state.schedules_elems}
                                            </select>

                                            <span className="text-danger small">{this.state.coach_schedule_error_list.schedule}</span>

                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Set start date</label>
                                            <input name="start_date" value={this.state.start_date} onChange={this.handleChange} type="date" className="form-control" />
                                            <span className="text-danger small">{this.state.dates_error_list.start_date}</span>
                                            <input name="start_time" value={this.state.start_time} onChange={this.handleChange} type="time" className="form-control" />
                                            <span className="text-danger small">{this.state.dates_error_list.start_time}</span>

                                            <span className="text-danger small">{this.state.error_list.start_date}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Set end date</label>
                                            <input name="end_date" value={this.state.end_date} onChange={this.handleChange} type="date" className="form-control" />
                                            <span className="text-danger small">{this.state.dates_error_list.end_date}</span>
                                            <input name="end_time" value={this.state.end_time} onChange={this.handleChange} type="time" className="form-control" />
                                            <span className="text-danger small">{this.state.dates_error_list.end_time}</span>

                                            <span className="text-danger small">{this.state.error_list.end_date}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <button type="submit" className="btn btn-primary float-end">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditAppointment;