import React, {ChangeEvent, SyntheticEvent } from 'react'

interface Props {
  onClick: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({onClick, search, handleChange}: Props): JSX.Element => {

  return <>
    <input type="text" value={search} onChange={(e) => handleChange(e)} />
    <button onClick={(e) => onClick(e)} />
  </>

}

export default Search