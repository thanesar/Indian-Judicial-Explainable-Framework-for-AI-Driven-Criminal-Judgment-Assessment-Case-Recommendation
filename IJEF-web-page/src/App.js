import { BrowserRouter, Routes, Route } from "react-router-dom";

import InputPage from "./pages/InputPage";
import ResponsePage from "./pages/ResponsePage";
import Layout from "./Layout";
import LoadingPage from "./pages/Loading";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InputPage />} />
          <Route path="assess" element={<InputPage />} />
          <Route path="summary" element={<ResponsePage />} />
          <Route path="response" element={<ResponsePage />} />
        </Route>
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
