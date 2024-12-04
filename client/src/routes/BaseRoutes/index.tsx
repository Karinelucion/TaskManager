import { Route, Routes } from "react-router-dom";
import { TaskPage } from "../../pages/TaskPage";

export function BaseRoutes() {
    return (
      <>
        <Routes>
          <Route path="/tasks" element={<TaskPage />} />
          {/* <Route path="/tasklist" element={} /> */}
  
        </Routes>
      </>
    );
}