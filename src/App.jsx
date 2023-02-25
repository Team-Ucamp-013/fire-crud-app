import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase.js'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  const getData = () => {
    const arrData = []
    onSnapshot(collection(db, 'productos'), (snapshot) => {
      snapshot.docs.forEach((item) => {
        console.log(item.data())
        arrData.push({
          ...item.data(),
          id: item.id
        })
        console.log(arrData)
        setProducts(arrData)
      })
    })
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">
      <h1>Fire Crud App</h1>
      {
        products.map(item => <h3>{item.name}</h3>)
      }
    </div>
  )
}

export default App
