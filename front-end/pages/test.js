import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
const fetcher = (url) => axios.get(url).then((res) => res.data);
 
const URL = "http://localhost:8000/api/bears";
 
const test = () => {
  const { data, error } = useSWR(URL, fetcher);
  // const [bears, setBears] = useState(data?.list || bears);
  useEffect(() => {
    mutate(URL);
  }, []);
  const printBears = () => {
    console.log("Bears:", bears);
    if (bears && bears.length)
      return bears.map((bear, index) => (
        <li key={index}>
          {bear ? bear.name : "-"} : {bear ? bear.weight : 0} :{" "}
          {bear ? bear.sex : "-"} : {bear ? bear.nickname : "-"}
        </li>
      ));
    else {
      return <h2>No bears</h2>;
    }
  };
 
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let bears = data.list;
  console.log("Home: ", data);
  return (
    <div>
      <p>Hello test page</p>
      {printBears()}
    </div>
  );
};
export default test;