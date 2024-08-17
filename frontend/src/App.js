import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Categories from './pages/Categories';
import Models from './pages/Models';
import BoardParts from './pages/BoardParts';
import Components from './pages/Components';
import BoardPartComponents from './pages/BoardPartComponents';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Categories />} /> {/* Default route to Categories */}
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/models" element={<Models />} />
                    <Route path="/board-parts" element={<BoardParts />} />
                    <Route path="/components" element={<Components />} />
                    <Route path="/board-part-components" element={<BoardPartComponents />} />
                    <Route path="*" element={<h1>404: Page Not Found</h1>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
