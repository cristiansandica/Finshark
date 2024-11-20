import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from 'react'

type Props = {}

const Search: React.FC<Props> = (props: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    console.log(e);
  }

  const onClick = (e: SyntheticEvent) => {

  }

  return <>
    <input type="text" value={search} onChange={(e) => handleChange(e)} />
    <button onClick={(e) => onClick(e)} />
  </>

}

export default Search