import { Header } from '../Header.js';
import { UsesState } from '../UsesState/UsesState.js';
import { ClassState } from '../ClassState.js';
import { UseReducer } from '../UseReducer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <UsesState />
      <ClassState />
      <UseReducer  name = 'Use Reducer'/>
    </div>
  );
}

export default App;
