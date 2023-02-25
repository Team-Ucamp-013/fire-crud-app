import { useState, useEffect } from 'react'
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
  const [form, setForm] = useState(null)
  // const [formUpdate, setFormUpdate] = useState(false)
  // const [item, setItem] = useState(null)

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

  const createProduct = (() => {
    if (form) {
      addDoc(collection(db, 'productos'), form)
    } else {
      alert('formulario vacio')
    }
    getData()
  })


  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.name]: ev.value
    })
    console.log(form)
  }

  const onDelete = async (id) => {
    console.log(id)
    await deleteDoc(doc(db, 'productos', id));
    getData()
  }

  // const formUpdateOpen = (data) => {
  //   setFormUpdate(true)
  //   setItem(data)
  // }

  // const onUpdate = async (id) => {
  //   await setProducts(doc(db, 'productos', id), form)
  // }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">
      <h1>Fire Crud App</h1>
      <div>
        <input type="text" placeholder="name" name="name" onChange={(e) => handleChange(e.target)} />
        <input type="text" placeholder="description" name="description" onChange={(e) => handleChange(e.target)} />
        <input type="text" placeholder="price" name="price" onChange={(e) => handleChange(e.target)} />
        <button onClick={() => createProduct()}>Guardar</button>
      </div>

      {
        products.map(item => (
          <div>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => onDelete(item.id)} >X</button>
            {/* <button onClick={() => formUpdateOpen(item)} >📝</button> */}
          </div>
        ))
      }
      {/* {
        formUpdate &&
        <div>
          <input type="text" placeholder="name" value={item.name} name="name" onChange={(e) => handleChange(e.target)} />
          <input type="text" placeholder="description" value={item.description} name="description" onChange={(e) => handleChange(e.target)} />
          <input type="text" placeholder="price" value={item.price} name="price" onChange={(e) => handleChange(e.target)} />
          <button onClick={() => onUpdate()}>Guardar</button>
        </div>
      } */}
    </div>
  )
}

export default App
