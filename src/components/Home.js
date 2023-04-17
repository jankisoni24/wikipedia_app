import Header from './Header';
import React, { Fragment, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Home.css';
import useSearch from '../hooks/useSearch';
import SearchList from './SearchList';

const Home = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const {
        search,
        searchResult
    } = useSearch({ searchQuery });
    
    return(
        <Fragment>
            <Header />

            <Container>
                <Row className="justify-content-md-center mt_30">
                    {/* <Col xs lg="2">
                    1 of 3
                    </Col> */}
                    <Col lg="10">
                        <Form.Control
                            className='me-auto'
                            type="text"
                            id="searchTxt"
                            aria-describedby="searchBlock"
                            placeholder="Search here"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                    <Col xs lg="2">
                    <Button variant="dark" id="searchBtn" onClick={search}>Search</Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt_20 mb_20">
                    <Col lg="12">
                        <SearchList searchResult={searchResult} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
export default Home;