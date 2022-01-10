import './App.css';
// components
import { AdminDash, AdminExercise, Exercise, HomePage, SignUp } from './pages';
import { Route, Routes } from 'react-router-dom';
// layout
import LayOut from './LayOut';
// error msgs
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <LayOut>
        <Routes>
          <Route path={'/'} exact element={<HomePage />} />
          <Route path={'/admin'} exact element={<AdminDash />} />
          <Route path={'/admin/exercise/:id'} element={<AdminExercise />} />
          <Route path={'/signUp'} exact element={<SignUp />} />
          <Route path={'/exercise/:id'} element={<Exercise />} />
        </Routes>
        <ToastContainer position="bottom-left" />
      </LayOut>
    </div>
  );
}

export default App;
