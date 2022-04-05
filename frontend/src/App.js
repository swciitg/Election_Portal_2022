import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL } from "./constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import CandidateNominateScreen from "./screens/candidatenominationscreen/CandidateNominateScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import CandidatePositionForm from "./screens/CandidatePositionForm/CandidatePositionForm";
import ElectionScreen from "./screens/election/ElectionScreen";
import TopNav from "./components/Home/TopNav/TopNav";
import CandidateNominationScreen from "./screens/pre_election/CandidateNominationScreen";

function Pre() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/*" exact element={<PreElectionScreen />} />
        <Route path="/register" exact element={<RegisterScreen />} />
        <Route path="/nominate/*" exact element={<CandidateNominateScreen />} />
        <Route
          path="/nominate/post"
          exact
          element={<CandidatePositionForm />}
        />
        <Route
          path="/candidate/:name"
          exact
          element={<CandidateNominationScreen />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={BASEURL}>
      <Routes>
        <Route path="/*" exact element={<Pre />} />
        <Route path="/election/*" exact element={<ElectionScreen />} />
        <Route path="/admin/*" exact element={<AdminScreen />} />
        {/* Route of the VOTING PORTAL */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
