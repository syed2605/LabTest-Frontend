import axios from 'axios';
import { BASE_URL } from '../constants/URL';
import { SIGN_IN_MODEL } from '../component/FormModel/login.model';
import { useNavigate } from 'react-router-dom';
import API from '../axios/axios';
import Forms from '../component/Form';

const Login = () => {
  const router = useNavigate();

  const onSubmitFn = async (
    values: object,

    actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/validate`, values);
      console.log(res);
      // const res = { message: 'Success login' };

      // <Toast message={res?.message} isSuccess={true} />;
      // renderToast(res?.message, true);
      const accessToken = res?.data?.data?.accessToken;
      localStorage.setItem('accessToken', accessToken);
      const refreshToken = res?.data?.data?.refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
      const userId =res?.data?.data?.userId;
      console.log('ususu',res?.data?.userId,res?.data?.data?.userId)
      localStorage.setItem('userId', userId);

      const userDetails = await API.get(
        `${BASE_URL}/api/users/getUserById/${userId}`
      );
      console.log(userDetails);
      const userDetail = userDetails?.data?.data;
      localStorage.setItem('userDetail', JSON.stringify(userDetail));

      // console.log('res from login', res);
      actions.setSubmitting(true);
      actions.resetForm();
      router('/samples');
    } catch (error: unknown) {
      // renderToast(res?.message, false);
      console.log('error', error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
      <div className="max-w-md w-full px-4 py-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center w-full">Login</h1>
        </div>
        <Forms fields={SIGN_IN_MODEL} onSubmitFn={onSubmitFn} />
      </div>
    </div>
  );
};

export default Login;
