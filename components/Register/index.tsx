import { useMutation } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import Link from 'next/link'
import { FormEvent, useContext, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { Context } from "../../context/contextProvider"
import { REGISTER_USER } from "../../graphql/mutations/user"
import { IRegister } from "../../interfaces"
import styles from './Register.module.css'

const Register: React.FC = () => {

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const auth = useContext(Context);

    const router = useRouter();
    const [ errors, setErrors ] = useState('');
    const [ values, setValues ] = useState<IRegister>(initialState);


    const [registerUser, {loading}] = useMutation(REGISTER_USER, {
        async update(_, data){
            await auth.login(data.data.register)
            router.push('/')
        },
        onError(err){
            err.message === "Error" ? setErrors(err.graphQLErrors[0].extensions?.errors.message) :
            setErrors(err.message)
        },
        variables : {registerInput: values}
    })

    const handleChange: any = (event: any) => {
        setValues({...values, [event.target.name]: event.target.value})
        setErrors('')
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        registerUser();
    }

    return (
        <div className={styles.register_form_container}>
            <h1>Register User</h1>
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Field>
                    <Form.Input
                        fluid
                        type="text"
                        name="username"
                        label="Username"
                        placeholder='Please enter username'
                        value={values.username}
                        // @ts-ignore
                        error={errors === '' ? false : (errors.username ? errors.username : errors) }
                        onChange={handleChange}
                        className={styles.register_form_input}
                    />
                    <Form.Input 
                        fluid
                        type="email"
                        label='Email'
                        name="email"
                        placeholder='Please enter email'
                        value={values.email}
                        // @ts-ignore
                        error={errors === '' ? false : errors.email}
                        onChange={handleChange}
                        className={styles.register_form_input}
                    />
                    <Form.Input 
                        fluid
                        type="password"
                        label='Password'
                        name="password"
                        placeholder='Please enter your password' 
                        value={values.password}
                        // @ts-ignore
                        error={errors === '' ? false : errors.password}
                        onChange={handleChange}
                        className={styles.register_form_input}
                    />
                    <Form.Input 
                        fluid
                        type="password"
                        name="confirmPassword"
                        label='Confirm Password'
                        placeholder='Please confirm your password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className={styles.register_form_input}
                    />
                    <Button type="submit" color="purple" className={loading ? "loading" : ""}>Register</Button>
                    <div className={styles.register_form_login}>
                        Already have an account?<strong><Link href="/login"> Sign in here!</Link></strong>
                    </div>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Register