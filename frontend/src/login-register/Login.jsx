import React from 'react'

export const Login = () => {
    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
  return (
    <form>
        <label for="email">email</label>
        <input type="email" placeholder='your email' id='email' name='email' />
        <label for="password">password</label>
        <input type="password" placeholder='password' id='password' name='password' />
        <button>Log In</button>
    </form>
  )
}

// export default Login