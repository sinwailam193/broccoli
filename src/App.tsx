import { Header, Footer, Content } from "./components";

function App() {
    return (
        <div className="h-full flex flex-col justify-between">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
