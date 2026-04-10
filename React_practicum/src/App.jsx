import './css/App.css';
import buildings from './data.js';
import Table from './components/Table.jsx';

function App() {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Table data={ buildings } amountRows="10" nopagination/>
    </div>
  )
}

export default App
