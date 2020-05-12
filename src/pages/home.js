import React, { Component } from 'react';
import axios from 'axios';

//MUI Stuff
import Grid from '@material-ui/core/Grid';

//components
import PostListHome from '../components/postListHome';

class home extends Component {

    state = {
        posts: null
    }

    componentDidMount(){

        axios.get('/allPosts')
        .then((res)=>{
            this.setState({
                posts: res.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    render() {

        let postsList = this.state.posts ? (

            this.state.posts.map((post)=><PostListHome key={post.postId} post={post} />)
        ) : <p>Loadding....</p>
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {postsList}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <p>Profile ..</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
