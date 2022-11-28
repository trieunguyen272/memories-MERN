import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles';

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    //kiem tra truoc va sau re-render lai html thi dispatch co thay doi ko
    //neu co callbank lai func
    //neu ko thi thoi
    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
