import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Review from "./pages/Review";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/review" element={<Review />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
