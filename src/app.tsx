import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sample } from './page/Samples';
import { Layout } from './component/Layout/Layout';
import Login from './page/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/samples" element={<Sample />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
