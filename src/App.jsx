import React, { useEffect, useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import Header from "./Components/Header/Header"
import routes from './routes'
import Footer from './Components/Footer/Footer'
import DataError from './Components/DataError/DataError'

import shopContext from './Context/contex'

import Loading from './Components/Loading/Loading'

import "./App.css"

export default function App() {

  const [loading, setLoading] = useState(true);
  const [userCartList, setUserCartList] = useState([]);
  const [userSavesList, setUserSavesList] = useState([]);
  const [ToastShow, setToastShow] = useState([]);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isDataError, setIsDataError] = useState(false);
  const router = useRoutes(routes)
  const { pathname } = useLocation();

  //scroll tot top
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })


    getUserCartList();
    getUserSavesListHandler();

    setLoading(true)
    pathname.includes('category') && setLoading(false)




  }, [pathname])

  //get userCartList
  const getUserCartList = () => {
    let cookie = document.cookie.split('; ').find(row => row.startsWith('userCartProducts='));

    if (cookie) {
      setUserCartList(JSON.parse(cookie.split('=')[1]))

    }
  }

  //get user saves list
  const getUserSavesListHandler = () => {
    let cookie = document.cookie.split('; ').find(row => row.startsWith('userSaveList='));

    if (cookie) {
      setUserSavesList(JSON.parse(cookie.split('=')[1]))

    }
  }




  return (
    <shopContext.Provider
      value={{
        userCartList,
        setUserCartList,
        userSavesList,
        setUserSavesList,
        ToastShow,
        setToastShow,
        toastTitle,
        setToastTitle,
        toastMessage,
        setToastMessage,
        isDataError,
        setIsDataError,
        loading,
        setLoading
      }}
    >

      {/* loading */}
      {
        loading ? (
          <Loading />
        ) : ('')
      }

      <Header />
      {router}
      <Footer />

      {/* data fetch error */}
      {
        isDataError ?
          (
            <DataError />
          )
          : ('')
      }

    </shopContext.Provider>

  )
}
