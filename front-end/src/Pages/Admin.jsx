/*Admin Main page
Junaid Saleem 103824753
Last edited 10/10/2023*/
import { Route, Routes } from 'react-router-dom';
import AdminDrawer from '../Components/AdminDrawer';
import Footer from '../Components/Footer'
function Admin() {
  return <>
    <AdminDrawer />
    <Footer />
  </>;
}

export default Admin;