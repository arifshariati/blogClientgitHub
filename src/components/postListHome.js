import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {

    card:{
        display:'flex',
        marginBottom:'1rem'
    },
    image:{
        minWidth:150
    },
    content:{
        padding:'1rem',
        objectFit:'cover'
    }
}

class postListHome extends Component {
    render() {

        dayjs.extend(relativeTime);

        const { classes, post:{ userHandle, postTitle, postExcerpt, userImage, postId, likeCount, commentCount, createdAt} } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Writer Image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h5" 
                        component={ Link } 
                        to={`/posts/${postId}`}
                        color="primary"
                    >
                        {postTitle}
                    </Typography>
                    <Typography variant="body1">{postExcerpt}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography 
                        variant="body1" 
                        component={ Link } 
                        to={`/users/${userHandle}`}
                        color="primary"

                    >
                        {userHandle}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles) (postListHome);
