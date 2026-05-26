import './css/App.css';
import { books } from './data.js';
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx'
import { useState } from 'react'

function App() {
  const [graphData, setGraphData] = useState(books);

  return (
    <div className="App">
      <h3>Популярные книги</h3>
      <div class="chartContainer">
        <Chart data={ graphData }/>
      </div>
      <Table data={ books } changeGraphData={ setGraphData } amountRows="10"/>
    </div>
  )
}

export default App
