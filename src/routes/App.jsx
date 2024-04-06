import { useContext, } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginContext } from 'contexts/LoginContext';
import { ListUser } from 'pages/ListUser/ListUser';
import { Login } from 'pages/login/Login';
import { DetailsUser } from 'pages/detailsUser/DetailsUser';
import { Layout } from './Layout';

function App() {
  const {isLogged} = useContext(LoginContext);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {!isLogged && (
          <>
            <Route path="/*" element={<Login />} />
            <Route index element={<Navigate to={'/login'} replace/>} />
          </>)}
          {
            isLogged &&
            <>
              <Route index element={<Navigate to={'/listUsers'} replace/>} />
              <Route path="/listUsers" element={<ListUser/>} />
              <Route path="/listusers/:id" element={<DetailsUser/>} />
              <Route path="/*" element={<Navigate to={'/listUsers'} replace/>} />
            </>
          }
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
