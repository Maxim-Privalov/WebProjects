import './css/App.css';
import buildings from './data.js';
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx';
import { useState } from 'react';

function App() {
  const [graphData, setGraphData] = useState(buildings);

  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={ graphData }/>
      <Table data={ buildings } changeGraphData= { setGraphData } amountRows="10"/>
    </div>
  )
}

export default App
