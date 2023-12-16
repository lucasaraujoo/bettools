import {similarTerms } from '@lib/utils'

export async function getFootballFixtures(url, date=null, search=null, localData=false) {
	const  fetchUrl = url+(localData ? '/data' : '/api' )+'/football/fixtures.json';
	
  const footballFixtures = await fetch(fetchUrl)
		.then((response) => response.json())
		.catch(() => []);
	
	if (date) {
		return footballFixtures.filter(fixture => fixture.date.split('T')[0] === date )
	}

	if(search) {
		return footballFixtures.filter(fixture => similarTerms(fixture.Home.name , search) || similarTerms(fixture.Away.name , search))
	}

	return footballFixtures;
}

export async function getFootballFixture(url, id){
  const footballFixtures = await getFootballFixtures(url);

	const fixture = footballFixtures.filter(fixture => fixture.idFixture == id)

	if (fixture[0]){
		return fixture[0];
	}
}

export async function getFootballFixturesByLeague(url, idLeague){
  const footballFixtures = await getFootballFixtures(url);
	const fixtures = footballFixtures.filter(fixture => fixture.idLeague == idLeague)
	
	return fixtures
}

export async function getFootStandings(url, localData=false){
	const  fetchUrl = url+(localData ? '/data' : '/api' )+'/football/standings.json';
	const standings = await fetch(fetchUrl)
		.then((response) => response.json())
		.catch(() => []);
		
	return standings;
	
}

export async function getFootLeagueStandings(url, idLeague){
	const standings = await getFootStandings(url);
	
	const leagueStandings = standings.filter(item => item.id == idLeague)

	if (leagueStandings[0]){
		return leagueStandings[0]

	}
}

export async function getFootLeagues(url){
	const standings = await getFootStandings(url);

	const leagues = standings.map(item => {
		const league = {
			id: item.id,
			name: item.name,
			country: item.country,
			flag: item.flag,
			season: item.season
		}
		return league
	})

	return leagues
}

export function filterMatchesByTeam(matches, team, side = "all"){
	const filtered = matches
		.filter(fixture => 
			(side==="all" && (fixture.Home == team || fixture.Away == team)) ||
			(side==="home" && (fixture.Home == team )) ||
			(side==="away" && (fixture.Away == team )) 

		)
		.sort((a, b) => new Date(b.Date) - new Date(a.Date) );
	
	return filtered;
}

export function filterMatchesByVersus(matches, team1, team2, anySide = true){
	const filtered = matches
		.filter(fixture => 
			(fixture.Home == team1 && fixture.Away == team2) ||
			(anySide && (fixture.Home == team2 && fixture.Away == team1)) 
		)
		.sort((a, b) => new Date(b.Date) - new Date(a.Date) );
	
	return filtered;
}





