// import GetApiLocal from "./Component/GetApiLocal";
import { Route, Routes } from "react-router-dom";
import Layout from "./Component/CurdApi/Layout";
import DataList from "./Component/CurdApi/DataList";
import CreateData from "./Component/CurdApi/CreateData";
import Error from "./Component/CurdApi/Error";
import { ToastContainer } from "react-toastify";
// import PostApiLocal from "./Component/PostApiLocal";
const App=()=>{
  return(<>
  <Routes>
    <Route path="/" element={<Layout/>}/>
    <Route index element={<DataList/>} />
    <Route path="create-data" element={<CreateData/>} />
    <Route path="*" element={<Error/>} />
  </Routes>
  <ToastContainer/>
  {/* <GetApiLocal/> */}
  {/* <PostApiLocal/> */}
  </>)
}
export default App;