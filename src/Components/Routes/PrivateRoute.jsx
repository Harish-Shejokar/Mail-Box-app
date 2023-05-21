import React from 'react'
import { Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLogin);
  console.log(isLoggedIn);
  return (
    <>
      <Routes>
        {/* {isLoggedIn && <Route>} */}
       
      </Routes>
    </>
  )
}

export default PrivateRoute
