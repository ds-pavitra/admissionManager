import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Cubicle HRMS", link : "/" },
                { title : "Dashboard", link : "#" },
            ],
            reports : [
                { icon : "ri-stack-line", title : "Total Groups", value : "4" },
                { icon : "ri-store-2-line", title : "Total Courses", value : "17" },
                { icon : "ri-briefcase-4-line", title : "Total Subjects", value : "5" },
                { icon : "ri-briefcase-4-line", title : "Total Documentations", value : "7" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <Col xl={12} lg={12}>
                                <Row>
                                    <MiniWidgets reports={this.state.reports} />
                                </Row>
                                {/* <RevenueAnalytics /> */}
                            </Col>

                            {/* <Col xl={4}>
                                <SalesAnalytics/>

                                <EarningReports/>
                            </Col> */}
                        </Row>
                        
                        {/* <Row>
                            <Sources/>
                            <RecentlyActivity/>

                            <RevenueByLocations/>
                        </Row>

                        <Row>
                            <ChatBox/>

                            <LatestTransactions/>
                        </Row> */}

                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
