import { Route, Routes } from "react-router-dom";
import { TaskPage } from "../../pages/TaskPage";
import { TaskListPage } from "@/pages/TaskListPage";

export function BaseRoutes() {
    return (
      <>
        <Routes>
          <Route path="/task/incluir" element={<TaskPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/" element={<TaskListPage/>} />
        </Routes>
      </>
    );
}