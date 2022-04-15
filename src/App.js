import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/App.css";
import EditorDetailAdmin from "./components/admin/pages/EditorDetail_page";
import EditorAdmin from "./components/admin/pages/Editor_page";
import AdminProfile from "./components/admin/pages/Profile_page";
import PublishersDetail from "./components/admin/pages/PublisherDetail_page";
import Publishers from "./components/admin/pages/Publisher_page";
import CreateNews from "./components/editor/pages/CreateNews_page";
import Home from "./components/editor/pages/Home_page";
import Login from "./components/editor/pages/Login_page";
import EditNews from "./components/editor/pages/NewsDetail_page";
import News from "./components/editor/pages/News_page";
import EditorProfile from "./components/editor/pages/Profile_page";
import ReportsDetail from "./components/editor/pages/ReportsDetail_page";
import Reports from "./components/editor/pages/Reports_page";
import Tasks from "./components/editor/pages/Tasks_page";
import ViewNewsDetail from "./components/editor/pages/ViewDetailNews_page";
import EditorsDetail from "./components/publisher/pages/EditorDetail_page";
import Editors from "./components/publisher/pages/Editor_page";
import PublisherNewsDetail from "./components/publisher/pages/NewsDetail_page";
import PublisherNews from "./components/publisher/pages/News_page";
import PublisherProfile from "./components/publisher/pages/Profile_page";
import ReportersDetail from "./components/publisher/pages/ReporterDetail_page";
import Reporters from "./components/publisher/pages/Reporter_page";
import ReporterDetail_Page from "./components/reporter/pages/ReporterDetail_page";
import CreateReports from "./components/reporter/pages/CreateReports_page";
import Reporter_Page from "./components/reporter/pages/Reporter_page";
import AlertDialogProvider from "./Providers/AlertDialogProvider";
import "react-medium-image-zoom/dist/styles.css";

function App() {
  return (
    <AlertDialogProvider>
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />

            {/* Role Editor */}
            <Route path="/news" exact component={News} />
            <Route path="/edit_news" exact component={EditNews} />
            <Route path="/tasks" exact component={Tasks} />
            <Route path="/reports" exact component={Reports} />
            <Route path="/report_detail" exact component={ReportsDetail} />
            <Route path="/create_news" exact component={CreateNews} />
            <Route path="/view_news_detail" exact component={ViewNewsDetail} />
            <Route path="/editor_profile" exact component={EditorProfile} />

            {/* Role Publisher */}
            <Route path="/publisher_news" exact component={PublisherNews} />
            <Route
              path="/publisher_view_news_detail"
              exact
              component={PublisherNewsDetail}
            />
            <Route path="/reporters" exact component={Reporters} />
            <Route path="/reporter_detail" exact component={ReportersDetail} />
            <Route path="/editors" exact component={Editors} />
            <Route path="/editor_detail" exact component={EditorsDetail} />
            <Route
              path="/publisher_profile"
              exact
              component={PublisherProfile}
            />

            {/* Role Admin */}
            <Route path="/publishers" exact component={Publishers} />
            <Route
              path="/publisher_detail"
              exact
              component={PublishersDetail}
            />
            <Route path="/editor_admin" exact component={EditorAdmin} />
            <Route
              path="/editor_detail_admin"
              exact
              component={EditorDetailAdmin}
            />
            <Route path="/admin_profile" exact component={AdminProfile} />

            {/* Role Reporter */}
            <Route path="/reporter_page" exact component={Reporter_Page} />
            <Route path="/reporter_detail_page" exact component={ReporterDetail_Page} />
            <Route path="/create_reports" exact component={CreateReports} />
          </Switch>
        </Router>
      </div>
    </AlertDialogProvider>
  );
}

export default App;
