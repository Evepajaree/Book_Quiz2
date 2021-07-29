import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/front.module.css'
 
const URL = `http://localhost:8000/api/bears`
 
export default () => {
  const [bears, setBears] = useState({})
  const [bear, setBear] = useState('')
  const [name,setName] = useState('')
  const [weight,setWeight] = useState(0)
  const [sex,setSex] = useState('')
  const [nickname,setNickname] = useState('')
  const [lastname,setLastname] = useState('')
  const getBears = async () => {
      const result = await axios.get(URL)
      setBears(result.data.list)
  }
  const getBear = async (id) => {
      const result = await axios.get(`${URL}/${id}`)
      console.log('bear id: ', result.data)
      setBear(result.data)
  }
  const addBear = async (name, weight, sex, nickname, lastname) => {
      const result = await axios.post(URL,{
          name,
          weight,
          sex,
          nickname,
          lastname
      })
      console.log(result.data)
      getBears()
  }
  const deleteBear = async (id) => {
      const result = await axios.delete(`${URL}/${id}`)
      console.log(result.data)
      getBears()
  }
  const updateBear = async (id) => {
      const result = await axios.put(`${URL}/${id}`,{
          name,
          weight,
          sex,
          nickname,
          lastname
      })
      console.log('bear id update: ', result.data)
      getBears()
  }
  const printBears = () => {
      console.log('Bears:', bears)
      if (bears && bears.length)
          return (bears.map((bear, index) =>
              (<li className={styles.listItem} key={index}>
                  {(bear)?bear.name:'-'} : {(bear)?bear.weight:0} : {(bear)?bear.sex:'-'} : {(bear)?bear.nickname:'-'} : {(bear)?bear.lastname:'-'}
                  <div className={styles.editbutton}>
                  <button className={styles.buttondelete} onClick={() => deleteBear(bear.id)}> Delete </button>
                  <button className={styles.buttonget} onClick={() => getBear(bear.id)}>Get</button>
                  <button className={styles.buttonupdate} onClick={() => updateBear(bear.id)}>Update</button>
                  </div>
              </li>)
          ))
      else {
          return (<h2>No bears</h2>)
      }
  }
  useEffect(() => {
      getBears()
  },[])
  return (
      <div className={styles.container} >
          <h2>Bears</h2>
          <ul className={styles.list} >{printBears()}</ul>
        
          selected bear: {bear.name} {bear.weight} {bear.sex} {bear.nickname} {bear.lastname}
          <h2>Add bear</h2>
          <h2>Add bear</h2>
          <div className={styles.formadd}>
          Name:<input type="text" onChange={(e)=>setName(e.target.value)} /> <br/>
          Weight:<input type="number" onChange={(e)=>setWeight(e.target.value)} /> <br/>
          sex:<input type="text" onChange={(e)=>setSex(e.target.value)} /> <br/>
          Nickname:<input type="text" onChange={(e)=>setNickname(e.target.value)} /> <br/>
          lastname:<input type="text" onChange={(e)=>setLastname(e.target.value)} /> <br/>
          </div>
          <button className={styles.buttonadd} onClick={ () => addBear(name, weight, sex, nickname, lastname)}>Add new bear</button>
      </div>
  )
}
