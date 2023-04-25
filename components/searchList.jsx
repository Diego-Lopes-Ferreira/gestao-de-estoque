import { useEffect, useState } from "react";

export default function SearchList({ list, searchAttribute, setRenderList }) {
  const [searchValue, set_searchValue] = useState("");
  useEffect(() => {
    setRenderList(list.filter(item => {
      return item[searchAttribute].toLowerCase().includes(searchValue.toLocaleLowerCase());
    }));
  }, [searchValue]);
  return (
    <input
      type="text"
      value={ searchValue }
      onChange={ e => set_searchValue(e.target.value) }
    />
  );
}
