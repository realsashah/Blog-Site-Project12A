import * as React from 'react';
import { Button, makeStyles, createStyles, TextField, InputAdornment } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MailOutlineIcon from '@material-ui/icons/MailOutlined';
import VpnKeyOutlineIcon from '@material-ui/icons/VpnKeyOutlined';
import {navigate} from 'gatsby';

const useStyles = makeStyles(() =>
    createStyles({
        formStyles: {
            textAlign: 'center'
        },
        button:{
            margin:'2px'
        },
        errorMessage:{
            fontSize:'18px'
        },
        heading:{
                color:'#003A7B',
                marginTop:'150px',
        }
    })
);


const loginSchema = Yup.object().shape({
    name:Yup.string()
            .required("Name is Required")
            .min(3,"Name should not be less than 3 characters")
            .max(50,"Name should not be greater than 50 characters"),
    email: Yup.string()
        .email('Invalid Email')
        .required("Email is Required").max(50, "Email must not be longer than 50 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short- should be 8 letter minimum")
        .max(16, "Password is too long- should be 16 letter maximum")
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

export interface LoginProps {

}

const Login: React.SFC<LoginProps> = () => {
    const classes = useStyles();
    return (
        <div className={classes.formStyles}>
            <h1 className={classes.heading}>Register Here</h1>
            <Formik
                initialValues={{
                    name:"",
                    email: "",
                    password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                    console.log('====================================');
                    console.log("Submitted",values.name, values.email, values.password);
                    console.log('====================================');
                    navigate('/')
                }}
            >
                {(formik: any) => (
                    <Form onSubmit={formik.handleSubmit}>
                        <div>
                            <Field
                                type='text'
                                as={TextField}
                                variant="outlined"
                                label="Name"
                                name="name"
                                id="name"
                            />
                            <br />
                            <ErrorMessage className={classes.errorMessage} name='name' render={(msg: string) => (
                                <span style={{ color: "red" }}>{msg}</span>
                            )} />
                            <br />
                        </div>
                        <div>
                            <Field
                                type='email'
                                as={TextField}
                                variant="outlined"
                                label="Email"
                                name="email"
                                id="email"
                            />
                            <br />
                            <ErrorMessage className={classes.errorMessage} name='email' render={(msg: string) => (
                                <span style={{ color: "red" }}>{msg}</span>
                            )} />
                            <br />
                        </div>
                        <div>
                            <Field
                                type='password'
                                as={TextField}
                                variant="outlined"
                                label="Password"
                                name="password"
                                id="password"
                            />
                            <br />
                            <ErrorMessage className={classes.errorMessage} name='password' render={(msg: string) => (
                                <span style={{ color: "red" }}>{msg}</span>
                            )} />
                            <br />
                        </div>

                        <div>
                            <Button className={classes.button} variant="outlined" color="primary" onClick={()=>{
                                navigate('/');
                            }}>
                                Cancel
                            </Button>

                            <Button className={classes.button} variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                        </div>

                    </Form>
                )}


            </Formik>
        </div>
    );
}

export default Login;