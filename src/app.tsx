import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { Layout } from './component/Layout/Layout';
import Login from './page/Login';
import Progress from './component/Progress';
import MyTask from './page/MyTask';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/my-task" element={<MyTask />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
