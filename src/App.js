import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import ContentTypeBuilder from "./components/ContentTypeBuilder";
import ContentTypeManager from "./components/ContentTypeManager";
import Contents from "./components/Contents";
import UserManager from "./components/UserManager";
import Table from "./components/Table";

/*const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};*/

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="table" element={<Table />} />

        {/* we want to protect these routes */}
        {/*allowedRoles={[ROLES.User]}*/}
        <Route element={<RequireAuth  />}>
          <Route path="/" element={<Home />} />
          <Route path="content-type-builder" element={<ContentTypeBuilder />} />
          <Route path="content-type-manager/*" element={<ContentTypeManager />}/>
          <Route path="contents/*" element={<Contents />} />
          <Route path="user-manager" element={<UserManager />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
