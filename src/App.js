import './App.css';
import IhorPage from "./pages/ihor/IhorPage";

const App = () => {
    const handleClick = () => console.log("clicked")
    return (
        <>
            <h1>Main</h1>
            <div>
                <button>Click</button>
            </div>

            <h2>it's me</h2>

            <button onClick={handleClick}>
                Click me
            </button>

          <IhorPage />
        </>
    );
}

export default App;
