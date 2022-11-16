import React from "react"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { createRoot } from "react-dom/client"
import App from './App.jsx'

const router = createBrowserRouter([
  // This array is to add new routes to the app.
  {
    path: "/",
    element: <App />,
  },
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  //<React.StrictMode>
  //</React.StrictMode>
)
// TODO: Is this feature really necessary?
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Control') {
//     // Do nothing.
//     return;
//   }
//   if (event.ctrlKey) {
//     const copied = window.getSelection().toString()

//     if (copied !== ''){
//       swal({
//         title: 'Cool!',
//         text: 'Succesfully Copied to Clipboard!',
//         icon: 'success',
//         button: false,
//         timer: 2000,
//       })
//     } else return
//   } else {
//     // alert(`Key pressed ${event.key} \n Key code Value: ${code}`);
//   }
// }, false);