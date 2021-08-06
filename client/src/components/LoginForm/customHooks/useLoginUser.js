import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../graphql/mutations/loginUser';
import Auth from '../../../utils/auth';

export const useLoginUser = () => {
  const [mutationFunction, {data, loading, error}] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.log(`Error occurred while logging in user: ${error} ${error.stack}`);
    }
  });

  const loginUser = ({email, password}) => {
    mutationFunction({
      variables: {
        email,
        password
      }
    });
  }

  if (data) {
    const {user, token} = data.loginUser;
    console.log(user);
    Auth.login(token);
  }

  return [loginUser, {data, loading, error}];
};
