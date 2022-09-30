import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// The additions
import { urls } from '../../urls';
import { services } from '../../services';
import NavBar from '../../layouts/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Coaches extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            coaches: [],
            schedules: [],
            appointments: [],
            appointment_details: [],
            is_modal_on: false,
            is_modal_appointment_on: false,
            schedule_modal_elems: '',
            appointment_modal_elems: '',
        };
    }

    async getList() {

        const res = await axios.get(urls.API + 'coach/coaches');

        if (res.status === 200) {
            this.setState({
                coaches: res.data[0],
                schedules: res.data[1],
                appointments: res.data[2],
                appointment_details: res.data[3],
                is_loading: false,
            });
        } else {

        }
    }

    componentDidMount() {
        this.getList();
    }

    handleDelete = async (e, id) => {
        const currentClickedElement = e.currentTarget;
        currentClickedElement.innerText = "Deleting...";

        swal.fire({
            title: 'Proceed with deletion?',
            text: 'You wont be able to revert this.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6'
        }).then(async (result) => {

            if (result.isConfirmed) {
                const res = await axios.delete(urls.API + `coach/delete/${id}`);

                console.log(res);

                let title = '';
                let msg = '';
                let icon = '';

                if (res.status === 200) {
                    currentClickedElement.closest('tr').remove();
                    title = 'Deleted!';
                    msg = 'Schedule successfuly deleted!';
                    icon = 'success';
                    currentClickedElement.closest('tr').remove();
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
                        is_loading: false,
                    });
                });
            } else {
                currentClickedElement.innerText = "Delete";
            }
        });
    }

    showSchedulesModal = (e) => {
        let id = e.target.closest('tr').firstChild.innerText; // id here is the coach Id
        let owner = e.target.closest('tr').childNodes[1].innerText; // owner here is the coach's name
        var elems = <label className="btn btn-success btn-sm mt-1">...</label>;

        for (let i=0; i<this.state.coaches.length; i++) {
            if (this.state.coaches[i].id === parseInt(id)) {
                let key = 0;
                let temp_start_date, temp_end_date = null;

                elems = this.state.schedules.map((item) => {
                    if (item.coachId === this.state.coaches[i].id) {
                        key++;
                        temp_start_date = new Date(item.startAvailabilityDate);
                        temp_end_date = new Date(item.endAvailabilityDate);

                        return (
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>???</td>
                                <td>{`${temp_start_date.getFullYear()}-${("0" + (temp_start_date.getMonth() + 1)).slice(-2)}-${temp_start_date.getDate()}`}</td>
                                <td>{`${("0" + (temp_start_date.getHours() + 1)).slice(-2)}:${("0" + (temp_start_date.getMinutes() + 1)).slice(-2)}`}</td>
                                <td>{`${("0" + (temp_end_date.getHours() + 1)).slice(-2)}:${("0" + (temp_end_date.getMinutes() + 1)).slice(-2)}`}</td>
                                <td>{item.active}</td>
                            </tr>
                        );
                    }
                });
                break;
            }
        }

        this.setState({
            schedule_modal_elems: !this.state.schedule_modal_elems,
            schedule_elems_heading: owner+': Schedules',
            is_modal_on: true,
        }, () => {
            this.setState({ schedule_modal_elems: elems, });
        });
    }

    showAppointmentsModal = (e) => {
        let id = e.target.closest('tr').firstChild.innerText; // id here is the coach Id
        let owner = e.target.closest('tr').childNodes[1].innerText; // owner here is the coach's name
        var elems = <label className="btn btn-success btn-sm mt-1">...</label>;

        for (let i=0; i<this.state.coaches.length; i++) {
            if (this.state.coaches[i].id === parseInt(id)) {
                let key = 0;
                let start, end, date = '';
                let temp_start_date, temp_end_date = null;

                // appointments
                elems = this.state.appointments.map((item) => {
                    let app_details = this.state.appointment_details;
                    let app_details_app_id = null;
                    let app_details_coach_id = null;

                    for (let j=0; j<app_details.length; j++)
                    {
                        date = '';
                        start = '';
                        end = '';

                        // appointment details
                        if (item.id === app_details[j].appointmentId) {
                            app_details_app_id = app_details[j].appointmentId;
                            app_details_coach_id = app_details[j].coachId;
                            temp_start_date = new Date(app_details[j].startDate);
                            temp_end_date = new Date(app_details[j].endDate);

                            date = `${temp_start_date.getFullYear()}-${("0" + (temp_start_date.getMonth() + 1)).slice(-2)}-${temp_start_date.getDate()}`;
                            start = `${("0" + (temp_start_date.getHours() + 1)).slice(-2)}:${("0" + (temp_start_date.getMinutes() + 1)).slice(-2)}`;
                            end = `${("0" + (temp_end_date.getHours() + 1)).slice(-2)}:${("0" + (temp_end_date.getMinutes() + 1)).slice(-2)}`;
                            break;
                        }
                    }

                    if (item.id === app_details_app_id && this.state.coaches[i].id === app_details_coach_id) {
                        key++;
                        return (
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{date}</td>
                                <td>{start}</td>
                                <td>{end}</td>
                                <td>{item.active}</td>
                            </tr>
                        );
                    }
                });
                break;
            }
        }

        this.setState({
            appointment_modal_elems: elems,
            appointment_elems_heading: owner+': Appointments',
            is_modal_appointment_on: true,
        }, () => {
            this.setState({ schedule_modal_elems: elems, });
        });
    }

    handleModalClose = () => {
        this.setState({ is_modal_on: false, });
    }

    handleAppointmentModalClose = () => {
        this.setState({ is_modal_appointment_on: false, });
    }

    render() {
        let html_elems = <tr><td colSpan="8"><h3>Loading...</h3></td></tr>;
        let { is_loading, coaches } = this.state;
        let key = 0;

        if (is_loading) {
            html_elems = <tr><td colSpan="8"><h3>Loading...</h3></td></tr>;
        } else {
            html_elems = coaches.map((item) => {
                key++;
                return (
                    <tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.title}</td>
                        <td><span onClick={(e) => this.showSchedulesModal(e)} className="btn btn-info btn-sm">Schedules</span></td>
                        <td><span onClick={(e) => this.showAppointmentsModal(e)} className="btn btn-sm" style={{backgroundColor: 'pink'}}>Appointments</span></td>
                        <td>{(item.active===1)?'Yes':'No'}</td>
                        <td><Link to={`/edit-coach/${item.id}`} className="btn btn-primary btn-sm">Edit</Link></td>
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
                                    <h3>Coaches
                                        <Link to="/create-coach" className="btn btn-success btn-sm float-end">Register Coach</Link>
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <Modal show={this.state.is_modal_on} onHide={this.handleModalClose}>
                                        <Modal.Header style={{backgroundColor: "#0dcaf0"}} closeButton>
                                            <Modal.Title>{this.state.schedule_elems_heading}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div>
                                                <div>
                                                <table className="table table-bordered table-stripe">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Day</th>
                                                            <th>Date</th>
                                                            <th>Available From</th>
                                                            <th>Available Until</th>
                                                            <th>Active</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.schedule_modal_elems}
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleModalClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal show={this.state.is_modal_appointment_on} onHide={this.handleAppointmentModalClose}>
                                        <Modal.Header style={{backgroundColor:"pink"}} closeButton>
                                            <Modal.Title>{this.state.appointment_elems_heading}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div>
                                                <table className="table table-bordered table-stripe">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Title</th>
                                                            <th>Date</th>
                                                            <th>From</th>
                                                            <th>To</th>
                                                            <th>Active</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.appointment_modal_elems}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleAppointmentModalClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <table className="table table-bordered table-stripe">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Designation</th>
                                                <th>Schedules</th>
                                                <th>Appointments</th>
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

export default Coaches;