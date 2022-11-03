import React from "react"; 

import "./styles.sass";

interface IProps {
  page: number,
  setPage: (page: number) => void
}

export const ChangePage = ({page, setPage}: IProps) => {
  const changePage = (changeDirection: "up" | "down") => {
    if(changeDirection === "down" && page === 1) return
    console.log(changeDirection)
    changeDirection === "up"? 
      setPage(page + 1):
      setPage(page - 1)
  }
  return(
    <div className="ChangePage d-flex justify-content-around">
      <div onClick={() => changePage("up")} className="arrow up mt-1"></div>
      <span className="categoriesPage fs-2">{page}</span>
      <div onClick={() => changePage("down")} className="arrow down mt-1"></div>
    </div>
  )
}