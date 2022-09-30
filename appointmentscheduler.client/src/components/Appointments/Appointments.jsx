import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Additions
import { urls } from '../../urls';
import NavBar from '../../layouts/NavBar';
import { services } from '../../services';


class Appointments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            appointments: [],
            appointment_details: [],
        };
    }

    async getList() {
        const res = await axios.get(urls.API + 'appointment/appointments-schedules');
        if (res.status === 200) {
            if (res.data.length > 0) {
                this.setState({
                   appointments: res.data[0],
                   appointment_details: res.data[1],
                   is_loading: false,
               });
            }
        }
    }

    componentDidMount() {
        this.getList();
    }

    handleDelete = async (e, id) => {
        const currentClickedElement = e.currentTarget;
        currentClickedElement.innerText = "Deleting...";

        swal.fire({
            title: 'Are you sure?',
            text: 'You wont be able to revert this.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6'
        }).then(async (result) => {

            if (result.isConfirmed) {
                await axios.delete(urls.API + `appointment/delete/${id}`).then((val) => {
                    console.log(val);

                    if (val.status === 200) {
                        currentClickedElement.closest('tr').remove();
                        swal.fire({
                            title: 'Deleted!',
                            text: 'Appointment successfully deleted!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            this.setState({
                                is_loading: false,
                            });
                        });
                    }
                }).catch((error) => {
                    swal.fire({
                        title: 'Error',
                        text: error.response.data.title,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        this.setState({
                            is_loading: false,
                        });
                    });
                });
            } else {
                currentClickedElement.innerText = "Delete";
            }
        });
    }

    returnDetails(appointment_id) {
        let dates = {};
        let details = this.state.appointment_details;
        for (let i = 0; i < details.length; i++) {
            if (details[i].appointmentId === appointment_id) {
                dates = {
                    start_date: details[i].startDate,
                    end_date: details[i].endDate,
                };
            }
        }

        return dates;
    }

    render() {
        let html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        let { is_loading, appointments } = this.state;

        if (is_loading) {
            html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        } else {
            let key = 0;
            html_elems = appointments.map((item) => {
                let details = this.returnDetails(item.id);
                key++;
                return (
                    <tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{services.reformatDate(details.start_date)}</td>
                        <td>{services.reformatDate(details.end_date)}</td>
                        <td>{(item.active===1)?'Yes':'No'}</td>
                        <td><Link to={`/edit-appointment/${item.id}`} className="btn btn-primary btn-sm">Edit</Link></td>
                        <td><button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                )
            });
        }

        return (
            <div>
                <NavBar />
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Appointments
                                        <Link to="/create-appointment" className="btn btn-success btn-sm float-end">Set Appointment</Link>
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-stripe">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Active</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
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

export default Appointments;