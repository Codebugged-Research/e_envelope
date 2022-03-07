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
import OutboxPage from './pages/OutboxPage'
import StarredPage from './pages/StarredPage'
import TrashPage from './pages/TrashPage'
import SpamPage from './pages/SpamPage'
import SentEmailPage from './pages/SentEmailPage'
import DraftEmailPage from './pages/DraftEmailPage'
import ForgetPassword from './pages/ForgetPassword'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useLocation, Navigate, Outlet} from 'react-router-dom'

function App() {

  const CallAuth=()=> {
    let location = useLocation();
    const token = sessionStorage.getItem("token");
    if(!token){
      return <Navigate to={'/'} state={{from :location}}/>
    }
    return <Outlet />;
}

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route exact path="/forget" element={<ForgetPassword/>} />
          <Route element={<CallAuth/>}>
            <Route exact path="/inbox" element={ <InboxPage/>} />
            <Route exact path="/email/:id" element={ <EmailPage />} />
            <Route exact path="/sent/:id" element={ <SentEmailPage />} />
            <Route exact path="/draft/:id" element={ <DraftEmailPage />} />
            <Route exact path="/profile" element={ <ProfilePage/>} />
            <Route exact path="/starred" element={ <StarredPage/>} />
            <Route exact path="/outbox" element={ <OutboxPage/>} />
            <Route exact path="/spam" element={ <SpamPage/>} />
            <Route exact path="/trash" element={ <TrashPage/>} />
            <Route exact path="/draft" element={ <DraftPage/>} />
            <Route exact path="/sent" element={ <SendPage/>} />
          </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
