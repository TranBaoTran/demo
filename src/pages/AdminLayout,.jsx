import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader"

const AdminLayout = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden'}}>
            <AdminHeader />
            <main style={{width: '100%', flex: '1', overflow: 'auto'}}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout