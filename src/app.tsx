import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sample } from './page/Samples';
import { Layout } from './component/Layout/Layout';
import Login from './page/Login';
import MyTask from './page/MyTask';
import SampleDetails from './page/SampleDetails';
import Signoff from './page/Signoff';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/samples" element={<Sample />} />
          <Route path="/my-task" element={<MyTask />} />
          <Route path="/details/:id" element={<SampleDetails />} />
          <Route path="/signoff" element={<Signoff />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
