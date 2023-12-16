export function formatDateFromString(string, time = true){
	const  options = {
		year: "numeric", 
		month: '2-digit', 
		day: '2-digit',
		...(time && {hour:  'numeric'}),
  	...(time && {minute:  'numeric'}),
	}
	const date = new Date(string.split("T").join(" ").slice(0,16)).toLocaleDateString("pt-BR", options)

	return date;
}


export function similarTerms(text, term){
	return text.toLowerCase().includes(term.toLowerCase()) ||
	term.toLowerCase().includes(text.toLowerCase())

}


export function getNextDates ( daysToAdd = 1) {
	
	const nextDate = new Date();
	let dates = []
	do{
		nextDate.setDate(nextDate.getDate() + (dates.length == 0 ? 0 : 1))
		dates.push(
			{
				year: nextDate.getFullYear(),
				month: ('0'+(nextDate.getMonth()+1)).slice(-2),
				day: ('0'+nextDate.getDate()).slice(-2) ,
			}
		)
	} while (dates.length < daysToAdd)

	return dates
}