import { useState } from 'react';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hook';
import { verifyToken } from '../../utils/verifyToken';
import { setUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // User info object to be sent to the server
        const userInfo = {
            email,
            password,
        };

        console.log('[LOG] User info: ', userInfo);

        const toastId = toast.loading('Logging in...', { duration: 2000 });

        try {
            // Send login request to the server
            const res = await login(userInfo).unwrap();
            console.log('[LOG] Res: ', res);

            const token = res.data.accessToken;
            // Verify the token and get the user info
            const user = verifyToken(token);
            console.log('[LOG] User : ', user);

            // Set the user info and token in the redux store
            dispatch(setUser({ user, token }));

            toast.success('Login successful.', { id: toastId, duration: 2000 });
        } catch (error) {
            toast.error('Login failed.', { id: toastId, duration: 2000 });
            console.error('[ERROR] Login failed: ', error);
        }
    };
    return (
        <div className="w-full flex justify-center items-center h-full bg-[#efefef]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-[400px] gap-6 border-2 bg-white border-[#1765C0] p-8 rounded-md mx-8 shadow-md"
            >
                <h2 className="text-center text-2xl">Kotha Britto</h2>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    size="small"
                />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                />
                <Button type="submit" variant="contained" size="medium">
                    Login
                </Button>
                <div>
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
