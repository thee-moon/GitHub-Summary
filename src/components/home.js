import React, { useState, useEffect } from 'react';
import { Octokit } from "octokit";
import { Row, Col } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Page from "./pagination.js";
import Container from 'react-bootstrap/Container';
import Repocard from './repocard.js'
import InputNavbar from './navbar.js';
import Profile from './profile'
const octokit = new Octokit({})


const Home = () => {

    const [repo, setRepo] = useState([]);
    const [all, setAll] = useState([]);
    const [user, setUser] = useState();
    const [page, setPage] = useState();
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [totalPage, setTotalpage] = useState();

    useEffect(() => {
        if (all.length != 0 || page != null) {
            setRepo(all[page].data);
            setLoading2(false);
        }
    }, [page, all]);

    const getData = async (username) => {
        if (user && username === user.login) {
            return;
        }
        setLoading1(true);
        setLoading2(true);
        let res = [];
        await octokit.request("GET /users/{username}", {
            username: username,
        }).then(r => {
            setUser(r.data);
        }).catch(e => {
            setLoading1(false);
            setLoading2(false);
            alert("User Not found");
            return;
        });
        setLoading1(false);
        await octokit
            .paginate(
                "GET /users/{username}/repos", { username: username, per_page: 10 },
                (response) => res.push(response))
        setLoading2(false);
        setAll(res);
        setTotalpage(res.length);
        setPage(0);
    }
    return (
        <div>
            <Container>
                <InputNavbar setUser={getData} />
                {loading1 ? <Spinner animation="border" style={{ marginTop: "2rem" }} /> : loading1}
                {user ? <Profile user={user} /> : user}
                <Container>
                    {loading2 ? <Spinner animation="border" style={{ marginTop: "2rem" }} /> : loading2}
                    <Row >
                        {repo.length ? repo.map((data,i) => <Col key={i}><Repocard data={data} username={user.login} /> </Col>) : repo}
                    </Row>

                    {totalPage > 0 ? <Page page={page} setPage={setPage} totalpages={totalPage} /> : totalPage}

                </Container>

            </Container>



        </div >
    );
};

export default Home;