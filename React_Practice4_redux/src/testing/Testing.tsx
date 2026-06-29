import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Quiz from './features/Quiz'
import { navigation } from '../data'


function Testing() {
    return (
        <>
            <NavBar active="4" navigationPoints={ navigation } />
            <Quiz />
            <Footer />
        </>
    )
}

export default Testing;