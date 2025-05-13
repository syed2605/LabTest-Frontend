import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { Layout } from './component/Layout/Layout';
import Login from './page/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
