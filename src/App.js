import logo from './logo.svg';
import './App.css';

const  App = () => {
  const handleClick = () => console.log("clicked")
  return (
<>
<h2>it's me</h2>

  <button onClick={handleClick}>
    Click me
  </button>

  <p>Fix</p>

</>
  );
}

export default App;
