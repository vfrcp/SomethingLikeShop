import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

interface IProps {
  whatSearch: string
  by: {
    value: string,
    func: (search: string) => void
  }[]
}

export const Search = ({whatSearch, by}: IProps) => {
  const [radioSelectedIndex, setRadioSelectedIndex] = useState<number>(0)
  const timerBeforeSendRequest = useRef<null | ReturnType<typeof setTimeout>>(null)
  const [searchInput, setSearchInput] = useState<string>("")
  useEffect(() => {
    searchWrap()
  }, [radioSelectedIndex, searchInput])

  const search = () => {
    by[radioSelectedIndex].func(searchInput)
  }
  const searchWrap = () => {
    if(timerBeforeSendRequest.current) clearTimeout(timerBeforeSendRequest.current)
    timerBeforeSendRequest.current = setTimeout(search, 1500)
  }
  return (
    <Form>
      <Form.Group>
        <Form.Label >Поиск {whatSearch}</Form.Label>
        <Form.Control value={searchInput} onChange={(e) => {
          setSearchInput(e.currentTarget.value)
        }}/>
      </Form.Group>
      <Form.Group>{
        by.map((byElem, index) => {
          return(
            <Form.Check key={byElem.value} label={byElem.value} type="radio" onChange={() => setRadioSelectedIndex(index)} checked={index === radioSelectedIndex? true: false} value={byElem.value} name={"radio"} />
          )})
      }</Form.Group>
    </Form>
  )
}