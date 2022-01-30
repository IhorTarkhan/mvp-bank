import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const Home = () => <h1>Home Page</h1>;
export const Foo = () => <h1>Foo Page</h1>;
export const Bar = () => <h1>Bar Page</h1>;

function App() {
  console.log(process.env);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/foo">Foo</Link>
        <Link to="/bar">Bar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foo" element={<Foo />} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
