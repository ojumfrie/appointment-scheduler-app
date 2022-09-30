import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Navigate, Link } from 'react-router-dom';
import { urls } from '../../urls';
import { services } from '../../services';

class EditCoach extends Component {
    state = {
        id: 0,
        name: '',
        title: '',
        active: false,

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

    captureId() {
        let location = window.location.href.split("/");
        return location[location.length - 1];
    }

    async componentDidMount() {
        let id = this.captureId();
        
        let url = urls.API+`coach/${id}`;
        const res = await axios.get(url);

        if (res.status === 200) {
            if (res.data.length > 0) {
                this.setState({
                    name: res.data.name,
                    title: res.data.title,
                    active: (res.data.active===1)?true:false,
                    schedules: res.data.schedules,
                });

                if (res.data[0][0].active === 1) {
                    document.getElementsByName('active')[0].checked = true;
                }

                // Updates the "schedules" state. This data later on be used for updating the CoachSchedules records.
                let temp_schedules = [];
                for (let i=0; i<res.data[1].length; i++) {
                    temp_schedules.push({
                        id: res.data[1][i].id,
                        startAvailabilityDate: res.data[1][i].startAvailabilityDate,
                        endAvailabilityDate: res.data[1][i].endAvailabilityDate,
                    });
                }
        
                // Updates the "schedules_basis" state.
                // This provides as the basis of schedules for displaying on the page.
                // This will serve as storage for newly added schedule(s).
                let temp_schedules_basis = [];
                for (let i=0; i<temp_schedules.length; i++) {
                    temp_schedules_basis.push({
                        id: temp_schedules[i].id,
                        start_date: services.reformatDate(temp_schedules[i].startAvailabilityDate),
                        end_date: services.reformatDate(temp_schedules[i].endAvailabilityDate),
                    });
                }
        
                this.setState({
                    schedules: temp_schedules,
                    schedules_basis: temp_schedules_basis,
                });
        
                this.renderCoachElements({
                    id: res.data[0][0].id,
                    name: res.data[0][0].name,
                    title: res.data[0][0].title,
                    active: res.data[0][0].active,
                });
                this.renderScheduleElements(temp_schedules_basis);

            } else if (res.status === 404) {
                swal.fire({
                    title: 'Not Found',
                    text: 'Coach requested cannot be found.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                }).then(this.updateRedirectionState());
            }
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

    handleChange = (e) => {
        let temp_value = e.target.value;

        if (e.target.name === 'active') {
            temp_value = !e.target.value;
        }

        this.setState({
            [e.target.name]: temp_value
        });
    }

    handleSave = async (e) => {
        e.preventDefault();

        const id = this.captureId();
        let temp_schedules = this.getFinalScheds();
        let pay_load = {
            "name": this.state.name,
            "title": this.state.title,
            "active": (this.state.active===true)?1:0,
            "schedules": temp_schedules,
        };

        const res = await axios.put(urls.API+`coach/edit/${id}`, pay_load);

        console.log(res);

        if (res.status === 200) {
            swal.fire({
                title: 'Updated!',
                text: 'Coach successfully updated!',
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
                schedule_id: 0,
                start_date: `${temp_start_date} ${temp_start_time}`,
                end_date: `${temp_end_date} ${temp_end_time}`,
            });

            this.renderScheduleElements(temp_scheds_basis);
        } else {
            this.setState({
                dates_error_list: error_list,
            });
        }
    }

    renderCoachElements(obj)
    {
        this.setState({
            id: obj.id,
            name: obj.name,
            title: obj.title,
            active: (obj.active===1)?true:false,
        });
    }

    renderScheduleElements(scheds) {
        let key = 0;
        let temp_sched_elems = scheds.map((item) => {
            key++;
            return (
                <label key={key} className="btn btn-success btn-sm">{item.start_date}&nbsp;&nbsp;to&nbsp;&nbsp;{item.end_date}</label>
            );
        });

        this.setState({
            schedules_elements: temp_sched_elems,
            schedules_basis: scheds,
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
        });
    }

    getFinalScheds() {
        let temp_scheds = this.state.schedules;

        // Those with IDs of zeros in the "schedules_basis" collection are the ones get added to the final collection.
        for (let i=0; i<this.state.schedules_basis.length; i++) {
            if (this.state.schedules_basis[i].schedule_id === 0) { // 0 means yet to be added to the records
                temp_scheds.push({
                    id: 0,
                    StartAvailabilityDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].start_date),
                    EndAvailabilityDate: services.convert_date_to_iso_v2(this.state.schedules_basis[i].end_date),
                });
            }
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
                                    <h2>Edit Coach
                                        <Link to="/" className="btn btn-success btn-sm float-end">Go to Home</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSave}>
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
                                                <label>Available Start Date</label><br />
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
                                                <label>Available End Date</label><br />
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

export default EditCoach;