import { NavLink, Outlet } from "react-router-dom";

const Layout=(props)=>{
    return(<>
    <header className="navbar header-section navbar-light bg-light">
        <div className="container">
            <h3>{props.title}</h3>
            <div>
                <NavLink className="btn btn-sm btn-outline-secondary" to={props.link}>{props.linkTitle}</NavLink>
            </div>
        </div>
    </header>
    <Outlet/>
    </>)
}
export default Layout;