import pandas as pd
import json
import http.client
from datetime import date, timedelta
import requests
from dotenv import load_dotenv
import os

load_dotenv()


numberOfDays = 3
currentYear = '2023'

matches_analized = []

standings = []
fixtures = {}

conn = http.client.HTTPSConnection(os.environ['FOOTBALL_API_HOST'])

headers = {
    'X-RapidAPI-Key': os.environ['FOOTBALL_API_KEY'],
    'X-RapidAPI-Host': os.environ['FOOTBALL_API_HOST']
}


# Matches data
print("Collecting data...")
df = pd.read_excel(r'https://github.com/futpythontrader/YouTube/blob/main/x_FutPythonTrader_Base_de_Dados_2022_2024_x.xlsx?raw=true')


df.columns.to_list()
df = df[
  ['Season', 'Date','League','Home','Away', 'Goals_H_FT',
  'Goals_A_FT',
  'TotalGoals_FT','Odd_H_FT',
  'Odd_D_FT',
  'Odd_A_FT','Odd_DC_1X',
  'Odd_DC_12',
  'Odd_DC_X2','Odd_Over05_FT',
  'Odd_Under05_FT',
  'Odd_Over15_FT',
  'Odd_Under15_FT',
  'Odd_Over25_FT',
  'Odd_Under25_FT',]
]
#removing accents
df[['Home','Away']] = df[['Home','Away']].apply(lambda x: x.str.normalize('NFKD').str.encode('ascii', errors='ignore').str.decode('utf-8'))

#setting results...
df.loc[df['Goals_H_FT']>df['Goals_A_FT'],'Winner'] = 'Home'
df.loc[df['Goals_H_FT']<df['Goals_A_FT'],'Winner'] = 'Away'
df.loc[df['Goals_H_FT']==df['Goals_A_FT'],'Winner'] = 'X'


def collectMatchesOfDay(date):
  print("Collecting matches of "+str(date)+"...")
  try:

    df_Today = pd.read_excel(r'https://github.com/futpythontrader/YouTube/raw/main/Jogos_do_Dia/'+str(date)+'_FutPythonTrader_Jogos_do_Dia.xlsx')
    df_Today = df_Today[['League', 'Date', 'Time' , 'Rodada', 'Home','Away']]
    df_Today[['Home','Away']] = df_Today[['Home','Away']].apply(lambda x: x.str.normalize('NFKD').str.encode('ascii', errors='ignore').str.decode('utf-8'))
  except:
    df_Today = []
    
  return df_Today

### Api - Football ######
def get_Standings(idLeague):

  conn.request("GET", "/v3/standings?season="+currentYear+"&league="+str(idLeague), headers=headers)

  res = conn.getresponse()
  data = res.read()

  data = data.decode("utf-8")

  data = json.loads(data)
  
  if len(data['response']) > 0:
    response = data['response'][0]
    standings.append(response['league']) 

def get_Fixtures(date):

  conn.request("GET", "/v3/fixtures?date="+str(date)+"&timezone=America%2FSao_Paulo", headers=headers)

  res = conn.getresponse()
  data = res.read()
  data = data.decode("utf-8")
  data = json.loads(data)

  with open("fixtures.json", "w", encoding='utf8') as outfile:
    json.dump(data, outfile, indent=4, ensure_ascii=False)
    
  return data

def analysisByTeam(teamName, df_FT):
  totalTeamMatches = 0
  print('\n#################### '+teamName+' ####################')

  #Playing in home
  df_FT_TeamInHome = df_FT[df_FT.Home == teamName]
  totalWinsInHome = 0
  percWinsInHome = 0
  avgGoalsScoredInHome = 0
  avgGoalsConcedInHome = 0
  avgOddHome = 0
  percOddsToHome = 0
  if len(df_FT_TeamInHome) > 0 :
    print('\n****************** Em Casa *****************')
    totalWinsInHome = len(df_FT_TeamInHome[df_FT_TeamInHome["Winner"]=="Home"])
    percWinsInHome = (totalWinsInHome / len(df_FT_TeamInHome)) * 100
    print("Porcentagem de Vitórias jogando em Casa:", percWinsInHome)

    #goals
    avgGoalsScoredInHome = df_FT_TeamInHome['Goals_H_FT'].mean()
    print("Média de Gols marcados jogando em Casa:", avgGoalsScoredInHome )
    avgGoalsConcedInHome = df_FT_TeamInHome['Goals_A_FT'].mean()
    print("Média de Gols sofridos jogando em Casa:", avgGoalsConcedInHome )

    #ODDS
    avgOddHome = df_FT_TeamInHome['Odd_H_FT'].mean()
    print("Média de odds:", avgOddHome )
    percOddsToHome = (len(df_FT_TeamInHome[df_FT_TeamInHome["Odd_H_FT"]<df_FT_TeamInHome["Odd_A_FT"]]) / len(df_FT_TeamInHome)) * 100
    print("Porcentagem de odds favoráveis:", percOddsToHome )

    totalTeamMatches = totalTeamMatches + len(df_FT_TeamInHome)

    print('*********************************************')

  ############################################################################

  #Playing Away
  df_FT_TeamInAway = df_FT[df_FT.Away == teamName]
  totalWinsInAway = 0
  percWinsInAway = 0
  avgGoalsScoredInAway = 0
  avgGoalsConcedInAway = 0
  avgOddAway = 0
  percOddsToAway = 0
  if len(df_FT_TeamInAway) > 0:
    print('\n******************* Fora *******************')
    totalWinsInAway = len(df_FT_TeamInAway[df_FT_TeamInAway["Winner"]=="Away"])
    percWinsInAway = (totalWinsInAway / len(df_FT_TeamInAway)) * 100
    print("Porcentagem de Vitórias jogando Fora:", percWinsInAway)

    #gols
    avgGoalsScoredInAway = df_FT_TeamInAway['Goals_A_FT'].mean()
    print("Média de gols marcados jogando Fora:", avgGoalsScoredInAway )
    avgGoalsConcedInAway = df_FT_TeamInAway['Goals_H_FT'].mean()
    print("Média de gols sofridos jogando Fora:", avgGoalsConcedInAway )

    #ODDS
    avgOddAway = df_FT_TeamInAway['Odd_A_FT'].mean()
    print("Média de odds:", avgOddAway )
    percOddsToAway = (len(df_FT_TeamInAway[df_FT_TeamInAway["Odd_A_FT"]<df_FT_TeamInAway["Odd_H_FT"]]) / len(df_FT_TeamInAway)) * 100
    print("Porcentagem de odds favoráveis:", percOddsToAway )

    totalTeamMatches = totalTeamMatches + len(df_FT_TeamInAway)

    print('*********************************************')
 
  #################################################################

  #Both sides

  print('\n************** Todos os Jogos **************')

  totalWins = totalWinsInHome + totalWinsInAway

  percWins = (totalWins / totalTeamMatches) * 100
  print("Porcentagem de Vitórias no geral:", percWins)

  avgGoalsScored = (avgGoalsScoredInHome + avgGoalsScoredInAway) / 2
  print("Média de gols marcados no geral:", avgGoalsScored )
  avgGoalsConced = (avgGoalsConcedInHome + avgGoalsConcedInAway) / 2
  print("Média de gols sofridos no geral:", avgGoalsConced )

  print('*********************************************')

  ## assembling object
  analysisTeamObj = {
    'inHome': {
      'percWins': percWinsInHome,
      'avgGoalsScored': avgGoalsScoredInHome,
      'avgGoalsConced': avgGoalsConcedInHome,
      'avgOdd': avgOddHome,
      'percOdds': percOddsToHome,

    },
    'inAway': {
      'percWins': percWinsInAway,
      'avgGoalsScored': avgGoalsScoredInAway,
      'avgGoalsConced': avgGoalsConcedInAway,
      'avgOdd': avgOddAway,
      'percOdds': percOddsToAway,
    },
    'allMatches':{
      'percWins': percWins,
      'avgGoalsScored': avgGoalsScored,
      'avgGoalsConced': avgGoalsConced
    }
  }

  return analysisTeamObj

def getSumOdds(df_FT, teamName):
  oddsSum = 0
  if len(df_FT[df_FT.Home == teamName]) > 0 :
    oddsSum = df_FT[df_FT.Home == teamName]['Odd_H_FT'].sum()
  if len(df_FT[df_FT.Away == teamName]) > 0 :
    oddsSum = oddsSum + df_FT[df_FT.Away == teamName]['Odd_A_FT'].sum()

  return oddsSum

def getSumWins(df_FT, teamName):
  sumWins = len(df_FT[(df_FT.Home == teamName) & (df_FT.Winner == "Home")])
  sumWins = sumWins + len(df_FT[(df_FT.Away == teamName) & (df_FT.Winner == "Away")])

  return sumWins

def analysisVersus(df_FT, teamHome, teamAway):

  if len(df_FT) == 0:
    return {}

  totalMatchesVersus = len(df_FT)

  #AVG ODDS
  avgOddsTeamHome = getSumOdds(df_FT,teamHome) / totalMatchesVersus
  print("Média Odds do "+teamHome+": ", avgOddsTeamHome)
  avgOddsTeamAway = getSumOdds(df_FT,teamAway) / totalMatchesVersus
  print("Média Odds do "+teamAway+": ", avgOddsTeamAway)

  #tax both
  percBoth = (len(df_FT[(df_FT.Goals_H_FT > 0) & (df_FT.Goals_A_FT > 0)]) / totalMatchesVersus) * 100
  print("Taxa de Ambas: ", percBoth) 

  #Wins Tax
  percWinsTeamHome = (getSumWins(df_FT,teamHome) / totalMatchesVersus) * 100
  print("Taxa de Vitórias do "+teamHome+": ", percWinsTeamHome)
  percWinsTeamAway = (getSumWins(df_FT,teamAway) / totalMatchesVersus) * 100
  print("Taxa de Vitórias do "+teamAway+": ", percWinsTeamAway)

  #avg goals
  avgGoals = (df_FT['Goals_H_FT'].mean() +   df_FT['Goals_A_FT'].mean())
  print("Média de Gols Por partida: ", avgGoals)

  print('******************************************************')

  ##assembling object
  analysisVersusObj = {
    'percWinsTeamHome': percWinsTeamHome,
    'percWinsTeamAway': percWinsTeamAway,
    'percBoth': percBoth,
    'avgGoals': avgGoals,
    'avgOddsTeamHome': avgOddsTeamHome,
    'avgOddsTeamAway': avgOddsTeamAway,
  }
  
  return analysisVersusObj

def analysis(teamHome, teamAway, fixtureAPI, idLeague, teamsAPI):
  if len(df[(df.Home == teamHome) | (df.Away == teamHome)]) == 0 :
      print(teamHome + ' não encontrado!')
      return
  if len(df[(df.Home == teamAway) | (df.Away == teamAway)]) == 0 :
      print(teamAway + ' não encontrado!')
      return

  #filters all matches with these teams 
  dfTeams = df[df.Home.isin([teamHome, teamAway]) | df.Away.isin([teamHome, teamAway])]
  dfTeams = dfTeams.astype({'Season':'string'})

  #storing all matches...
  dfTeamsAll = dfTeams
  # dfTeamsAll.sort_values(by='Date', ascending = False, inplace = True)
  
  #filter only season matches
  dfTeams = dfTeams[dfTeams['Season'].str.contains(currentYear) ]

  # Ajusting index
  dfTeams.reset_index(inplace=True, drop=True)
  dfTeams.index = dfTeams.index.set_names(['Nº'])
  dfTeams = dfTeams.rename(index=lambda x: x + 1)

  #dfTeams = dfTeams[['Home', 'Away','Goals_H_FT', 'Goals_A_FT', 'Winner', 'Odd_H_FT', 'Odd_A_FT' ]]
  
  #analysis team by team
  analysisHome = analysisByTeam(teamHome, dfTeams)
  analysisAway = analysisByTeam(teamAway, dfTeams)

  #analysis all versus matches
  print('\n############# Todos os Confrontos Diretos ############')
  analysisVersusAll = analysisVersus(dfTeamsAll[dfTeamsAll.Home.isin([teamHome, teamAway]) & dfTeamsAll.Away.isin([teamHome, teamAway])], teamHome, teamAway)

  #analysis versus matches Home x Away
  print('\n############## Confrontos - Casa x Fora ##############')
  analysisVersusHxA = analysisVersus(dfTeamsAll[dfTeamsAll.Home.isin([teamHome]) & dfTeamsAll.Away.isin([teamAway])], teamHome, teamAway)

  #preparing all data for history saving
  dfTeamsAll = dfTeamsAll.astype({'Date':'string'})
  dfTeamsAll = dfTeamsAll[['Date', 'Home', 'Away','Goals_H_FT', 'Goals_A_FT', 'Winner' ]]
  # Ajusting index
  dfTeamsAll.reset_index(inplace=True, drop=True)
  dfTeamsAll.index = dfTeamsAll.index.set_names(['id'])
  dfTeamsAll = dfTeamsAll.rename(index=lambda x: x + 1)
  

  matchObject = {
    'idFixture': fixtureAPI['id'],
    'date':  fixtureAPI['date'],
    'Home': {
      'idAPIFootball': teamsAPI['home']['id'],
      'name': teamHome,
      'logo': teamsAPI['home']['logo'],
    },
    'Away': {
      'idAPIFootball': teamsAPI['away']['id'],
      'name': teamAway,
      'logo': teamsAPI['away']['logo'],
    },
    
    'idLeague': idLeague,
    'analysisHome': analysisHome,
    'analysisAway': analysisAway,
    'analysisVersus': {
      'analysisVersusAll': analysisVersusAll,
      'analysisVersusHxA': analysisVersusHxA
    },
    'lastMatches': dfTeamsAll.to_dict('records')
  }

  
  matches_analized.append(matchObject) 

  ################################################


# collecting by day

for x in range(numberOfDays):
  day = date.today() + timedelta(days=x)
  df_Day = collectMatchesOfDay(day)
  
  if len(df_Day) == 0:
    continue

  #Using API-Footbal
  fixtures = get_Fixtures(day)

  for row in fixtures['response']:
    df_fixture = df_Day[(df_Day['Home'].str.lower()==(row['teams']['home']['name']).lower()) & (df_Day['Away'].str.lower()==(row['teams']['away']['name']).lower())] 
    if len(df_fixture) == 1:
      print(df_fixture['Home'].iloc[0]+' x '+df_fixture['Away'].iloc[0])

      idLeague = row['league']['id']
     
      fixtureAPI = row['fixture']
      teamsAPI = row['teams']

      #League Standings
      if not idLeague in [standingLeague['id'] for standingLeague in standings] :
        get_Standings(idLeague)

      analysis(df_fixture['Home'].iloc[0] , df_fixture['Away'].iloc[0], fixtureAPI, idLeague, teamsAPI)


# Writing matches with analysis in .json
with open("analyses.json", "w", encoding='utf8') as outfile:
  json.dump(matches_analized, outfile, indent=4, ensure_ascii=False)


# Writing standings to .json
with open("standings.json", "w", encoding='utf8') as outfile:
  json.dump(standings, outfile, indent=4, ensure_ascii=False)

## Saving in CLIENT API
clientObj = {
  'fixtures' : matches_analized, 
  'standings': standings, 
}

print('\n\n+++++++++++++++++++++++++++++++++++\nFinishing...')

if os.environ['CLIENT_URL'] != '':
  print('\nSending json to Client App (localhost)...')
  try:
    response = requests.post(os.environ['CLIENT_URL']+'/api/football',  json=clientObj)
  except:
    print("Request client error")
  print('\nResponse from Client: ', response.status_code)

#Saving in Vercel KV Storage Server

if os.environ['KV_REST_API_URL'] != '' and  os.environ['KV_REST_API_TOKEN'] != '':
  print('\nSending json to KV Storage...')

  response = requests.post(
    os.environ['KV_REST_API_URL']+"/set/fixtures",  
    json=matches_analized,
    headers={
      'Authorization': os.environ['KV_REST_API_TOKEN'],
    }
  )

  print('\nResponse from KV (save fixtures): ', response.status_code)

  response = requests.post(
    os.environ['KV_REST_API_URL']+"/set/standings",  
    json=standings,
    headers={
      'Authorization': os.environ['KV_REST_API_TOKEN'],
    }
  )

  print('\nResponse from KV (save standings): ', response.status_code)