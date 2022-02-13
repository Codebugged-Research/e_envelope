import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Header from  './components/Header'
import InboxPage from './pages/InboxPage';
import LoginPage from './pages/LoginPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
          
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/" element={ <InboxPage/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
