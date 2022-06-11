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

        {/* we want to protect these routes */}
        {/*allowedRoles={[ROLES.User]}*/}
        <Route element={<RequireAuth  />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/*allowedRoles={[ROLES.Editor, ROLES.Admin]}*/}
        <Route
          element={<RequireAuth />}
        >
          <Route path="content-type-builder" element={<ContentTypeBuilder />} />
        </Route>
        {/*allowedRoles={[ROLES.Editor, ROLES.Admin]}*/}
        <Route
          element={<RequireAuth />}
        >
          <Route
            path="content-type-manager/*"
            element={<ContentTypeManager />}
          />
        </Route>
        {/*allowedRoles={[ROLES.Editor, ROLES.Admin]}*/}
        <Route
          element={<RequireAuth />}
        >
          <Route path="contents" element={<Contents />} />
        </Route>
        {/*allowedRoles={[ROLES.Editor, ROLES.Admin]}*/}
        <Route
          element={<RequireAuth />}
        >
          <Route path="user-manager" element={<UserManager />} />
        </Route>
        {/*allowedRoles={[ROLES.Editor, ROLES.Admin]}*/}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
