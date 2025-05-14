import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { Layout } from './component/Layout/Layout';
import Login from './page/Login';
import Progress from './component/Progress';
import MyTask from './page/MyTask';
import SampleDetails from './page/SampleDetails';
import Signoff from './page/Signoff';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/my-task" element={<MyTask />} />
          <Route path="/details/:id" element={<SampleDetails />} />
          <Route path="/signoff" element={<Signoff />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
