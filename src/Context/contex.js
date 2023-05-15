import { createContext } from "react";

const shopContext = createContext({
    ToastShow: [],
    userCartList: [],
    userSavesList: [],
    toastTitle: '',
    toastMessage: '',
    isDataError: false,
    loading: true

})

export default shopContext
