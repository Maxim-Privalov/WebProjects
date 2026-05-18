import './css/App.css';
import { books } from './data.js';
import Table from './components/Table.jsx';

function App() {
  return (
    <div className="App">
      <h3>Популярные книги</h3>
      <Table data={ books } amountRows="10"/>
    </div>
  )
}

export default App
