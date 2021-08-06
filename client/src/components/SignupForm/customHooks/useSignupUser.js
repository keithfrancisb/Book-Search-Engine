import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../../graphql/mutations/addUser';
import Auth from '../../../utils/auth';


export const useSignupUser = () => {
  const [mutationFunction, {data, loading, error}] = useMutation(ADD_USER, {
    onError: (error) => {
      console.log(`Error occurred while signing up user: ${error} ${error.stack}`);
    }
  });

  const signupUser = ({username, email, password}) => {
    mutationFunction({
      variables: {
        username, 
        email, 
        password
      }
    });
  }

  if (data) {
    console.log(data.user);
    Auth.login(data.token);
  }

  return [signupUser, {data, loading, error}];
}