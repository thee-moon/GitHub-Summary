import Button from 'react-bootstrap/Button';
import React from 'react';
import { Card, CardBody,CardTitle, CardText } from 'reactstrap';

function Profile({ user }) {
    return (
        <Card
            style={{
                flexDirection: 'row',
                marginTop: '1rem',
                marginBottom: '1rem'
            }}
        >
            <img
                alt="avatar"
                src={user.avatar_url}
                style={{
                    height: '15rem'
                }}
            />
            <CardBody style={{
                textAlign: 'left'
            }}>
                <CardTitle tag="h5">
                    {user.login}
                </CardTitle>


                <CardText>
                    {user.bio}   </CardText>

                <CardText>
                    {user.location}   </CardText>
                <CardText>
                    {user.url}   </CardText>
                <CardText>
                    {user.email}   </CardText>
                <Button onClick={() => window.open(user.url)}>
                    Jsonify user details
                </Button>
            </CardBody>
        </Card >
    );
}

export default Profile;