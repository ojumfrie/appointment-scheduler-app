import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Navigate, Link } from 'react-router-dom';
import { urls } from '../../urls';
import { services } from '../../services';

class CreateSchedule extends Component {
    state = {
        coach_id: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        active: 1,

        coaches: {},
        dates_error_list: {},
        error_list: [],
        is_to_redirect_to_home: false,
    }

    componentDidMount() {
        const res = axios.get(urls.API+'schedule/coaches');
        this.generateCoachesElements(res.data);

        if (res.data.length > 0) {
            this.setState({
                coaches: res.data
            });
        }
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

    handleCreate = async (e) => {
        e.preventDefault();

        if (this.validateDateValues()) {
            const res = await axios.post(urls.API+'schedule/create', {
                "coachId": this.state.coach_id,
                "startAvailabilityDate": this.calculateInputDate(this.state.start_date, this.state.start_time),
                "endAvailabilityDate": this.calculateInputDate(this.state.end_date, this.state.end_time),
                "active": (this.state.active===true)?1:0,
            });

            if (res.data.length > 0) {
                let title = '';
                let msg = '';
                let icon = '';

                if (res.status === 200) {
                    title = 'Registered!';
                    msg = 'Coach successfuly registered!';
                    icon = 'success';
                } else if (res.status === 400) {
                    title = 'Bad Request';
                    msg = 'Error encoutered upon processing yoru request.';
                    icon = 'error';
                } else if (res.status === 500) {
                    title = 'Internal Server Error';
                    msg = 'An invalid operation has been encountered.';
                    icon = 'error';
                }

                swal.fire({
                    title: title,
                    text: msg,
                    icon: icon,
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.setState({
                        is_loading: false,
                    });
                });
            }            
        }
    }

    calculateInputDate(input_date, input_time) {
        let temp_date = new Date(`${input_date} ${input_time}`);
        let timezone_offset_revert = (-(temp_date.getTimezoneOffset() / 60));
        let tempMilliseconds = temp_date.setTime(temp_date.getTime() + timezone_offset_revert * 60 * 60 * 1000);
        return new Date(tempMilliseconds).toISOString();
    }

    validateDateValues() {
        let temp_list = {};
        let is_empty = true;

        if (this.state.start_date == '') temp_list.start_date = 'Start date is required.';
        if (this.state.start_time == '') temp_list.start_time = 'Start time is required.';
        if (this.state.end_date == '') temp_list.end_date = 'End date is required.';
        if (this.state.end_time == '') temp_list.end_time = 'End time is required.';

        for (var key in temp_list) {
            if (temp_list.hasOwnProperty(key)) {
                is_empty = false;
            }
        }

        if (is_empty) {
            let temp_start_date = (new Date(this.state.start_date)).getTime();
            let temp_end_date = (new Date(this.state.end_date)).getTime();

            let temp_start_time = (new Date(`${this.state.start_date} ${this.state.start_time}`)).getTime();
            let temp_end_time = (new Date(`${this.state.start_date} ${this.state.end_time}`)).getTime();

            if (temp_start_date > temp_end_date)
                temp_list.end_date = 'End date must be greater or equal to start date.';
            else {
                if (temp_start_date == temp_end_date) {
                    if (temp_end_time <= temp_start_time) temp_list.end_time = 'End time must be greater to start time.';
                }
            }
        }

        this.setState({dates_error_list: !this.state.dates_error_list}, () => {
            this.setState({
                dates_error_list: temp_list
            });
        });

        return is_empty;
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

    render() {
        return (
            <div>
                {this.state.is_to_redirect_to_home && <Navigate to="/" />}
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h2>New Schedule
                                        <Link to="/schedules" className="btn btn-success btn-sm float-end">Go to List</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleCreate}>
                                        <div className="form-group mt-2">
                                            <label>Coach</label> <Link to="/create-coach" className="small float-end">Add Coach</Link>
                                            <select name="coach_id" value={this.state.coach_id} onChange={this.handleChange} className="form-control">
                                                {this.state.coaches_elems}
                                            </select>
                                            <span className="text-danger small">{this.state.error_list.coach_id}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Available Start</label><br />
                                            <div>
                                                <input name="start_date" onChange={this.handleChange} type="date" className="" />
                                                <span className="text-danger small">{this.state.dates_error_list.start_date}</span>
                                            </div>
                                            <div>
                                                <input name="start_time" onChange={this.handleChange} type="time" className="" />
                                                <span className="text-danger small">{this.state.dates_error_list.start_time}</span>
                                            </div>
                                            <span className="text-danger small">{this.state.error_list.start_date}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Available End</label><br />
                                            <div>
                                                <input name="end_date" onChange={this.handleChange} type="date" className="" />
                                                <span className="text-danger small">{this.state.dates_error_list.end_date}</span>
                                            </div>
                                            <div>
                                                <input name="end_time" onChange={this.handleChange} type="time" className="" />
                                                <span className="text-danger small">{this.state.dates_error_list.end_time}</span>
                                            </div>
                                            <span className="text-danger small">{this.state.error_list.end_date}</span>
                                        </div>
                                        <div className="form-group mt-2 form-check form-switch">
                                            <input name="active" defaultChecked={this.state.active} onChange={this.handleChange} className="form-check-input" type="checkbox" id="switch-type-check" />
                                            <label className="form-check-label" htmlFor="switch-type-check">Active</label>
                                            <span className="text-danger small">{this.state.error_list.active}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <button type="submit" className="btn btn-primary float-end">Add</button>
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

export default CreateSchedule;