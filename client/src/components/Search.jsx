

export function Search({term}){

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.location.assign("/?search="+event.target.value)
    }
  }

  return (
    <input onKeyDown={handleKeyDown } value={term} type="text" placeholder="Buscar" class="input input-bordered w-24 md:w-auto" />

  )
}