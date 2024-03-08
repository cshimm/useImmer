import './App.css';
import {UserProfileWithImmer} from "./UserProfileWithImmer";
import {ShoppingListWithImmer} from "./ShoppingListWithImmer";

function App() {
    return (
        <div className="App">
            <UserProfileWithImmer/>
            <hr/>
            <ShoppingListWithImmer/>
        </div>
    );
}

export default App;
