import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { apiBaseUrl, apiRequestAsync } from "../../common/data/userData";
// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

// Import Components
import MiniWidgets from "./MiniWidgets";
// import RevenueAnalytics from "./RevenueAnalytics";
// import SalesAnalytics from "./SalesAnalytics";
// import EarningReports from "./EarningReports";
// import Sources from "./Sources";
// import RecentlyActivity from "./RecentlyActivity";
// import RevenueByLocations from "./RevenueByLocations";
// import ChatBox from "./ChatBox";
// import LatestTransactions from "./LatestTransactions";

const Dashboard = () => {
    const [breadcrumbItems] = useState([
        { title: "Manager", link: "/" },
        { title: "Dashboard", link: "#" }
    ]);
    const [loading, setLoading] = useState(false);
    const dashboardStatsApiurl = `${apiBaseUrl}/dashboard/stats`;
    const [reports, setReports] = useState([]);
    
    const fetchDashboardStatsData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiRequestAsync("get", dashboardStatsApiurl, null);
            if (response.status === 200) {
                const overallData = response.result.overall || {};
                setReports([
                    { icon: "ri-group-line", title: "Total Groups", value: overallData.total_groups || 0 },
                    { icon: "ri-book-2-line", title: "Total Courses", value: overallData.total_courses || 0 },
                    { icon: "ri-book-open-line", title: "Total Subjects", value: overallData.total_subjects || 0 },
                    { icon: "ri-file-list-line", title: "Total Documentations", value: overallData.total_documents || 0 }
                ]);
            } else {
                alert("Failed to fetch dashboard stats. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    }, [dashboardStatsApiurl]);
    
    useEffect(() => {
        fetchDashboardStatsData();
    }, [fetchDashboardStatsData]);


    return (
        <div className="page-content">
            {loading ? <Spinner color="primary" /> :
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xl={12} lg={12}>
                            <Row>
                                <MiniWidgets reports={reports} />
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
            }
        </div>
    );
};

export default Dashboard;
