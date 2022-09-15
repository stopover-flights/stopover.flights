import './App.css';
import Home from './Home.js'
import awsExports from "./aws-exports";
import { Amplify} from 'aws-amplify';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
