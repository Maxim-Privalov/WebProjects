import Navbar from "../components/NavBar";
import Footer from "../components/Footer"
import BuildingsGrid from "./components/BuildingsGrid";
import { navigation } from "../data";

function List() {
    return (
        <div>
            <Navbar active="2" navigationPoints={ navigation }/>
            <BuildingsGrid/>
            <Footer/>
        </div>
    );
}

export default List;
