import UserInterface from './userInterface';

interface LoginInterface extends Pick<UserInterface, 'email' | 'password'> {}

export default LoginInterface;