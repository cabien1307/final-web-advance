import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import { useSelector } from 'react-redux';

function App() {
    const { isLoggedIn } = useSelector(state => state.auth)
    return (
        <Router>
            <div className="2xl:container xl:container grid grid-cols-12 gap-1 py-2 min-h-screen">
                {
                    isLoggedIn && <SideBar />
                }
                <Body />
            </div>
        </Router>

    );
}

export default App;

