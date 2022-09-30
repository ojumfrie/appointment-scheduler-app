import './App.css';
import './styles/Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Appointments from './components/Appointments/Appointments';
import CreateAppointment from './components/Appointments/CreateAppointment';
import EditAppointment from './components/Appointments/EditAppointment';
import Coaches from './components/Coaches/Coaches';
import CreateCoach from './components/Coaches/CreateCoach';
import EditCoach from './components/Coaches/EditCoach';
import CreateSchedule from './components/Schedules/CreateSchedule';
import Schedules from './components/Schedules/Schedules';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Coaches />} />
                <Route path="/create-coach" element={<CreateCoach />} />
                <Route path="/edit-coach/:id" element={<EditCoach />} />

                <Route path="/appointments" element={<Appointments />} />
                <Route path="/create-appointment" element={<CreateAppointment />} />
                <Route path="/edit-appointment/:id" element={<EditAppointment />} />

                <Route path="/schedules" element={<Schedules />} />
                <Route path="/create-schedule" element={<CreateSchedule />} />
            </Routes>
        </Router>
    );
}

export default App;
