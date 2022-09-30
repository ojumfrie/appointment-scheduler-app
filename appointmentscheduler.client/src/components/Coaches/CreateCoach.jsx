import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Navigate, Link } from 'react-router-dom';
import { urls } from '../../urls';
import { services } from '../../services';


class CreateCoach extends Component {
    state = {
        name: '',
        title: '',
        active: true,

        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        schedules: [],
        schedules_basis: [],

        dates_error_list: {},
        schedules_elements: '',

        error_list: [],
        is_to_redirect_to_home: false,
    }

    handleChange = (e) => {
        let temp_value = e.target.value;

        if (e.target.name === 'active') {
            temp_value = !e.target.value;
        }

        this.setState({
            [e.target.name]: temp_value
        });
    }

    handleRegister = async (e) => {
        e.preventDefault();

        let temp_schedules = this.getConvertedScheds();

        const res = await axios.post(urls.API+'coach/create', {
            "name": this.state.name,
            "title": this.state.title,
            "active": (this.state.active===true)?1:0,
            "schedules": temp_schedules,
        });
    
        console.log(res);

        if (res.status === 200) {
            swal.fire({
                title: 'Registered!',
                text: 'New coach successfully registered!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(this.updateRedirectionState());

        } else if (res.status === 400) {
            swal.fire({
                title: 'Bad Request',
                text: 'Error encoutered upon processing yoru request.',
                icon: 'error',
                confirmButtonText: 'OK',
            }).then(this.updateRedirectionState());
        } else if (res.status === 500) {
            swal.fire({
                title: 'Internal Server Error',
                text: 'An invalid operation has been encountered.',
                icon: 'error',
                confirmButtonText: 'OK',
            }).then(this.updateRedirectionState());
        }
    }

    updateRedirectionState() {
        this.setState({
            is_to_redirect_to_home: true,
        });
    }

    handleAddSchedule = () => {
        this.setState({
            dates_error_list: {},
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

        if (services.is_object_empty(error_list)) {
            let temp_scheds_basis = this.state.schedules_basis;
            temp_scheds_basis.push({
                startDate: `${temp_start_date} ${temp_start_time}`,
                endDate: `${temp_end_date} ${temp_end_time}`,
            });

            this.generateScheduleElements(temp_scheds_basis);
        } else {
            this.setState({
                dates_error_list: error_list,
            });
        }
    }

    generateScheduleElements(scheds) {
        let key = 0;
        let temp_sched_elems = scheds.map((item) => {
            key++;
            return (
                <label key={key} className="btn btn-success btn-sm mt-1">{item.startDate}&nbsp;&nbsp;to&nbsp;&nbsp;{item.endDate}</label>
            );
        });

        this.setState({
            schedules_elements: temp_sched_elems,
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
        });
    }

    getConvertedScheds() {
        let temp_scheds = [];

        for (let i=0; i<this.state.schedules_basis.length; i++) {
            temp_scheds.push({
                coachId: 0,
                startAvailabilityDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].startDate),
                endAvailabilityDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].endDate),
                active: 1,
                // startDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].startDate),
                // endDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].endDate),
            });
        }

        return temp_scheds;
    }

    render() {
        return (
            <div>
                {this.state.is_to_redirect_to_home && <Navigate to="/" />}
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Register Coach
                                        <Link to="/" className="btn btn-success btn-sm float-end">Go to Home</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleRegister}>
                                        <div className="form-group mt-2">
                                            <label>Name</label>
                                            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Enter name" />
                                            <span className="text-danger small">{this.state.error_list.name}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Designation</label>
                                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Enter designation" />
                                            <span className="text-danger small">{this.state.error_list.title}</span>
                                        </div>
                                        <div className="form-group mt-2 form-check form-switch">
                                            <input name="active" defaultChecked={this.state.active} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Active</label>
                                            <span className="text-danger small">{this.state.error_list.active}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <label>Schedules</label>
                                            <div className="container" style={{backgroundColor:'beige',minHeight:50}}>{this.state.schedules_elements}</div>
                                        </div>
                                        <br />
                                        <div className="form-group mt-2">
                                            <div>
                                                <label>Available Start</label><br />
                                                <div>
                                                    <input name="start_date" onChange={this.handleChange} type="date" value={this.state.start_date} className="form-control" />
                                                    <span className="text-danger small">{this.state.dates_error_list.start_date}</span>
                                                </div>
                                                <div>
                                                    <input name="start_time" onChange={this.handleChange} type="time" value={this.state.start_time} className="form-control" />
                                                    <span className="text-danger small">{this.state.dates_error_list.start_time}</span>
                                                </div>
                                            </div>
                                            <br />
                                            <div>
                                                <label>Available End</label><br />
                                                <div>
                                                    <input name="end_date" onChange={this.handleChange} type="date" value={this.state.end_date} className="form-control" />
                                                    <span className="text-danger small">{this.state.dates_error_list.end_date}</span>
                                                </div>
                                                <div>
                                                    <input name="end_time" onChange={this.handleChange} type="time" value={this.state.end_time} className="form-control" />
                                                    <span className="text-danger small">{this.state.dates_error_list.end_time}</span>
                                                </div>
                                            </div>
                                            <br />
                                            <label onClick={this.handleAddSchedule} className="btn btn-secondary btn-sm">Add Schedule</label>
                                        </div>

                                        <br />

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

export default CreateCoach;