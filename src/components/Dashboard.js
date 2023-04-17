import { Fragment } from "react";
import Header from "./Header";
import useDashboard from "../hooks/useDashboard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';

const Dashboard = () => {
    const { lastOneDayData, lastOneHourData } = useDashboard();

    return(
        <Fragment>
            <Header />
            <Container>
                <Row className="justify-content-md-center mt_30">
                    <Col lg="6">
                        <h3>No of searches in last 1 Hour: {lastOneHourData.length}</h3>
                    </Col>
                    <Col lg="6">
                        <h3>No of searches in last 1 day: {lastOneDayData.length}</h3>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Dashboard;