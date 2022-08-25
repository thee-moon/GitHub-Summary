import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Badge, CardTitle, CardText } from 'reactstrap';
import { Octokit } from "octokit";
const octokit = new Octokit({})
function Repocard({ data, username }) {
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        if (data) {
            octokit.request("GET /repos/{user}/{name}/languages", {
                user: username,
                name: data.name
            }).then(r => {
                setLanguages(r.data);
            });
        }
    }, [data, username]);
    const lang = () => {
        var nd = [];
        for (const p in languages) {
            nd.push(<Badge
                style={{
                    margin: "5px"
                }}
                key={p}
                className="text-dark"
                color="light"
                pill
            >
                {p}
            </Badge>
            );
        }
        return nd;
    };
    return (
        <Card
            className="my-2"
            style={{
                width: '18rem'
            }}
        >
            <CardHeader tag="h5">
                {data.name}
            </CardHeader>
            <CardBody>
                <CardTitle >
                    {data.description}
                </CardTitle>
                <CardText>
                    {data.language_url}
                </CardText>
                {lang()}
            </CardBody>
        </Card>
    );
}

export default Repocard;