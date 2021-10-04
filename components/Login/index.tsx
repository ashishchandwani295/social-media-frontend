import { useMutation } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import { FormEvent, useContext, useState } from "react"
import { Button, Form, Message } from "semantic-ui-react"
import { Context } from "../../context/contextProvider"
import { LOGIN_USER } from "../../graphql/mutations/user"
import { ILogin } from "../../interfaces"
import styles from './Login.module.css'

const Login: React.FC = () => {

    const initialState = {
        username: '',
        password: '',
    }

    const auth = useContext(Context);

    const router = useRouter();
    const [ errors, setErrors ] = useState('');
    const [ values, setValues ] = useState<ILogin>(initialState);


    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, data){
            auth.login(data.data.login)
            router.push('/')
        },
        onError(err){
            console.log(err)
            setErrors(err.graphQLErrors[0].extensions?.errors)
        },
        variables : {loginInput: values}
    })

    const handleChange: any = (event: any) => {
        setValues({...values, [event.target.name]: event.target.value})
        setErrors('')
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        loginUser();
    }


    return (
        <div className={styles.login_form_container}>
            <h1>Login</h1>
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
                        error={errors.username}
                        onChange={handleChange}
                        className={styles.login_form_input}
                    />
                    <Form.Input 
                        fluid
                        type="password"
                        label='Password'
                        name="password"
                        placeholder='Please enter your password' 
                        value={values.password}
                        // @ts-ignore
                        error={errors.password}
                        onChange={handleChange}
                        className={styles.login_form_input}
                    />
                    <Button type="submit" color="purple" className={loading ? "loading" : ""}>
                        Login
                    </Button>
                    <div className={styles.login_form_register}>
                        Do not have an account?<strong><Link href="/register"> Sign up here!</Link></strong>
                    </div>
                    <Message
                        style={{ display: errors ? "block" : "none" }}
                        error
                        // @ts-ignore
                        list= {errors.general ? (
                            // @ts-ignore
                            [ errors.general ]
                            ) : (
                            [
                            // @ts-ignore
                            errors.username,
                            // @ts-ignore
                            errors.password
                            ])}
                    />
                </Form.Field>
            </Form>
        </div>
    )
}

export default Login