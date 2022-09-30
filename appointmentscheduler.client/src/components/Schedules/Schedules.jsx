import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';

// The additions
import { urls } from '../../urls';
import NavBar from '../../layouts/NavBar';


class Schedules extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            schedules: [],
            coaches: [],
            is_reload: false,
        };
    }

    async getList() {
        const res = await axios.get(urls.API + 'schedule/schedules-coaches');
        if (res.data.length > 0) {
             this.setState({
                 schedules: res.data[0],
                 coaches: res.data[1],
                 is_loading: false,
             });
         }
    }

    componentDidMount() {
        this.getList();
    }

    handleDeactivation = async (e, id) => {
        const currentClickedElement = e.currentTarget;
        currentClickedElement.innerText = "Deactivating...";

        swal.fire({
            title: 'Proceed with deactivation?',
            text: 'You wont be able to revert this.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!',
            confirmButtonColor: '#3085d6'
        }).then(async (result) => {

            if (result.isConfirmed) {
                const res = await axios.put(urls.API + `schedule/edit/${id}`);

                if (res.data.length > 0) {
                    let title = '';
                    let msg = '';
                    let icon = '';

                    if (res.status === 200) {
                        title = 'Deactivated!';
                        msg = 'Schedule successfuly deactivated!';
                        icon = 'success';
                    } else if (res.status === 400) {
                        title = 'Bad Request';
                        msg = 'Error encoutered upon processing yoru request.';
                        icon = 'error';
                    } else if (res.status === 404) {
                        title = 'Not Found';
                        msg = 'Schedule requested cannot be found.';
                        icon = 'warning';
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
                            is_reload: true,
                        });
                    });
                }

            } else {
                currentClickedElement.innerText = "Deactivate";
            }
        });
    }

    reformatDate = (date) => {
        let temp_date = new Date(date);
        return `${temp_date.getFullYear()}-${("0" + (temp_date.getMonth() + 1)).slice(-2)}-${temp_date.getDate()} ${temp_date.getHours()}:${temp_date.getMinutes()}`;
    }

    render() {
        let html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        let { is_loading } = this.state;

        if (is_loading) {
            html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        } else {
            let key = 0;
            let owner = '';

            html_elems = this.state.schedules.map((item) => {
                key++;

                for (let i = 0; i < this.state.coaches.length; i++) {
                    if (this.state.coaches[i].id === item.coachId) {
                        owner = this.state.coaches[i].name;
                        break;
                    }
                }

                return (
                    <tr key={key}>
                        <td>{item.id}</td>
                        <td>{owner}</td>
                        <td>{this.reformatDate(item.startAvailabilityDate)}</td>
                        <td>{this.reformatDate(item.endAvailabilityDate)}</td>
                        <td>{(item.active===1)?'Yes':'No'}</td>
                        <td><button onClick={(e) => this.handleDeactivation(e, item.id)} className="btn btn-danger btn-sm">Deactivate</button></td>
                    </tr>
                )
            });
        }

        return (
            <div>
                <NavBar />
                {this.state.is_reload && <Navigate to='/schedules' />}
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Coach Schedules
                                        <Link to="/create-schedule" className="btn btn-success btn-sm float-end">Add Coach Schedule</Link>
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-stripe">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Coach</th>
                                                <th>Availability Start Date</th>
                                                <th>Availability End Date</th>
                                                <th>Active</th>
                                                <th>Deactivation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {html_elems}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Schedules;