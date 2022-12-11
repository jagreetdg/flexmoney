import './App.css';
import MainForm from './containers/RegistrationForm';
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <div>
      <ReactNotifications/>
      <MainForm/>
    </div>
  );
}

export default App;
