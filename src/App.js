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
import EmailPage from './pages/EmailPage';
import ProfilePage from './pages/ProfilePage'
import DraftPage from './pages/DraftPage'
import SendPage from './pages/SendPage'
import ImportantPage from './pages/ImportantPage'
import StarredPage from './pages/StarredPage'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
          
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route exact path="/inbox" element={ <InboxPage/>} />
          <Route exact path="/email" element={ <EmailPage/>} />
          <Route exact path="/profile" element={ <ProfilePage/>} />
          <Route exact path="/starred" element={ <StarredPage/>} />
          <Route exact path="/important" element={ <ImportantPage/>} />
          <Route exact path="/draft" element={ <DraftPage/>} />
          <Route exact path="/sent" element={ <SendPage/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
