import './App.css';
import DndComponent from './DNDComponent';

function App() {
  return (
    <div className="App">
      <table className='tableDND'>
        <tbody>
        <tr><td><DndComponent name="Red" /></td>
        <td><DndComponent name="Blue" /></td>
        <td><DndComponent name="Green" /></td>
        <td><DndComponent name="Black" /></td></tr>
        </tbody>
      </table>      
    </div>
  );
}

export default App;