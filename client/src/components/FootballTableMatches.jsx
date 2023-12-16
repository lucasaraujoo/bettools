import { formatDateFromString } from "@lib/utils";
import {For} from "solid-js"
import { FaSolidCircleCheck, FaSolidCircleMinus, FaSolidCircleXmark } from 'solid-icons/fa';


function IconResult({fixture, team}){
  if (fixture.Winner == "X"){
    return <FaSolidCircleMinus class="text-gray-300 " size={16}/>
  } else if((team === fixture.Away && fixture.Winner === "Away") ||
    (team === fixture.Home && fixture.Winner === "Home")){
    return <FaSolidCircleCheck class="text-green-500 " size={16}/>
  } else {
    return <FaSolidCircleXmark class="text-rose-500 " size={16}/>
  }
}

export function FootballTableMatches(
  {fixtures, team,}
){
  
  return(
    <>
    <div class="divider h-0 mb-0"></div>
    <details class="collapse collapse-arrow  ">
      
      <summary class="collapse-title text-md font-medium  ">Ver últimos Jogos</summary>
      <div class="collapse-content bg-base-100 "> 
        <ul>
          <For each={fixtures} >
            {(fixture) => 
              
              <li class="border-y px-2 py-1  flex grow gap-4 itens-center text-xs">
                <div class="flex items-center text-gray-400 ">{formatDateFromString(fixture.Date, false)}</div>
                <div class="grow ">
                  <div class="flex justify-between">
                    <span class={fixture.Winner == "Home" && 'font-bold'}>{fixture.Home}</span>
                    <span class={fixture.Winner == "Home" && 'font-bold'} >{fixture.Goals_H_FT}</span>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class={fixture.Winner == "Away" && 'font-bold'}>{fixture.Away}</span>
                    <span class={fixture.Winner == "Away" && 'font-bold'}>{fixture.Goals_A_FT}</span>
                  </div>
                </div>
                {(team != "") &&
                  <div class="flex items-center ">
                    <IconResult fixture={fixture} team={team} />
                  </div>
                }
              </li>
            }
          </For>
        </ul>
      </div>
    </details>
    
    </>
    
  )
}