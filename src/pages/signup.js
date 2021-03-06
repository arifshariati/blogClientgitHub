import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import logo from '../resource/images/logo.png';
import axios from 'axios';




// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
    ...theme.spreadThis
})
class signup extends Component {

    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            userHandle:'',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        })

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userHandle: this.state.userHandle
        }

        axios.post('/signup',newUserData)
        .then((res)=>{
            console.log(res.data);
            localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
            this.setState({
                loading: false
            })
            this.props.history.push('/');
        })
        .catch((err)=>{
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })

    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {

        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={logo} alt="Logo" className={classes.logo_image} />
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField} 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField 
                            id="userHandle" 
                            name="userHandle" 
                            type="text" 
                            label="User Handle" 
                            className={classes.textField} 
                            helperText={errors.userHandle}
                            error={errors.userHandle ? true : false}
                            value={this.state.userHandle} 
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                        >
                            Signup
                            {loading && (

                                <CircularProgress size={25} color="secondary" className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Already have an account ? Login <Link to="/login">here</Link> </small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {

    classes: propTypes.object.isRequired
}

export default withStyles(styles)(signup);
