/*Admin Main page
Junaid Saleem 103824753
Last edited 15/10/2023*/
import UserActivityChart from './UserActivityChart';
import TestResultChart from './TestResultChart';
import RiskExposureChart from './RiskExposureChart';
import WebsiteVisitsChart from './WebsiteVisitChart';
import '../Css/Chart.css';

function AdminHome() {
    return <>
        <div className="chart-main">
            <UserActivityChart />
            <TestResultChart />
        </div>
        <div className="chart-main">
            <RiskExposureChart />
            <WebsiteVisitsChart />
        </div>
    </>;
}

export default AdminHome;