import { Link, Outlet } from "react-router-dom"

function AdminLayout() {

    return (

        <div>

            {/* SIDEBAR */}

            <div
                style={{
                    width: 220,
                    background: "#111",
                    color: "white",
                    height: "100vh",
                    padding: 20,
                    position: "fixed",
                    top: 0,
                    left: 0
                }}
            >

                <h3>Admin</h3>

                <Link to="/admin/dashboard" style={{ color: "white" }}>
                    Dashboard
                </Link>

                <br /><br />

                <Link to="/admin/packages" style={{ color: "white" }}>
                    Quản lý gói cước
                </Link>

                <br /><br />

                <Link to="/admin/packages/list" style={{ color: "white" }}>
                    Danh sách gói
                </Link>

                <br /><br />

                <Link to="/admin/news" style={{ color: "white" }}>
                    Quản lý tin tức
                </Link>

            </div>


            {/* CONTENT */}

            <div
                style={{
                    marginLeft: 220,
                    padding: 40
                }}
            >

                <Outlet />

            </div>

        </div>

    )

}

export default AdminLayout