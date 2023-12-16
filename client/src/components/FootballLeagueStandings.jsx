import {For} from "solid-js"
import { FaSolidCircleCheck, FaSolidCircleMinus, FaSolidCircleXmark } from 'solid-icons/fa';


function IconResult({result}){
  if (result == "D"){
    return <FaSolidCircleMinus class="text-gray-400  " size={12}/>
  } else if(result == "W"){
    return <FaSolidCircleCheck class="text-green-600  " size={12}/>
  } else {
    return <FaSolidCircleXmark class="text-rose-500  " size={12}/>
  }
}

export function FootballLeagueStandings({
  league, home = "", away=""
}){
  
  return(
      
      <div class="w-full my-2 p-1 "> 
        <ul>
          <li class="flex p-2 mx-1 gap-1.5 itens-center text-xs text-gray-500">
            <div class="grow ">Clube</div>
            <div class="flex  gap-1.5 text-center">
              <div class="  w-4 ">Pts</div>
              <div class="  w-4 ">PJ</div>
              <div class="  w-4 ">V</div>
              <div class="  w-4 max-sm:hidden">E</div>
              <div class="  w-4 max-sm:hidden">D</div>
              <div class="  w-4 max-sm:hidden">GM</div>
              <div class="  w-4 max-sm:hidden">GC</div>
              <div class="  w-4 ">SG</div>
            </div>
            <div class=" text-center w-16   ">
              Últimas 5
            </div>
          </li>
          <For each={league.standings[0]} >
            {(standing) => 
              
              <li 
                class={`flex border-t dark:border-t-zinc-600 p-2 mx-1 gap-1.5  text-xs hover:bg-zinc-50 dark:hover:bg-zinc-700 
                  ${(standing.team.name == home || standing.team.name == away) && " bg-rose-300/20"}`}>
                <div class="flex items-center w-4 "><span class=" m-auto">{standing.rank}</span></div>
                <div class="flex items-center w-5 "><img src={standing.team.logo} /></div>
                <div class="grow flex -mr-2 items-center ">{standing.team.name}</div>

                <div class="flex items-center gap-1.5 text-center">
                  <div class="  w-4 ">{standing.points}</div>
                  <div class="  w-4 ">{standing.all.played}</div>
                  <div class="  w-4 ">{standing.all.win}</div>
                  <div class="  w-4 max-sm:hidden">{standing.all.draw}</div>
                  <div class="  w-4 max-sm:hidden">{standing.all.lose}</div>
                  <div class="  w-4 max-sm:hidden">{standing.all.goals.for}</div>
                  <div class="  w-4 max-sm:hidden">{standing.all.goals.against}</div>
                  <div class="  w-4 ">{standing.all.goals.for-standing.all.goals.against}</div>
                </div>

                <div class="flex items-center space-x-0.5 w-16 ">
                  {standing.form.split('').map((r) =>  
                    <IconResult result={r} />
                  )}
                </div>
                
              </li>
            }
          </For>
        </ul>
      </div>
  )
}

