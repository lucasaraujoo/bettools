import { FaSolidUnlockKeyhole } from 'solid-icons/fa'

export function FootballVersusStats({stats}) {
  return(
    
    <div class="w-full " >
      {( Object.keys(stats).length === 0) ?
        <div>
          <h2 class='text-center text-red-900/70 dark:text-red-300/70 '>Não há confrontos diretos na temporada</h2>
        </div>
        : 
      <>
        <div class="grid grid-cols-3 text-center items-center   "> 
          <div class="font-extrabold text-xl text-red-950/80 dark:text-white/70 ">{stats.percWinsTeamHome.toFixed(2)+"%"}</div>
          <div class="text-red-900/70 dark:text-red-300/70">Taxa de Vitórias</div>
          <div class="font-extrabold text-xl text-red-950/80 dark:text-white/70 ">{stats.percWinsTeamAway.toFixed(2)+"%"}</div>
        </div>
        <div class="grid grid-cols-3 text-center items-center  "> 
          <div class="font-extrabold text-xl text-red-950/80 dark:text-white/70">{stats.avgOddsTeamHome.toFixed(2)}</div>
          <div class="text-red-900/70 dark:text-red-300/70">Média de Odds</div>
          <div class="font-extrabold text-xl text-red-950/80 dark:text-white/70">{stats.avgOddsTeamAway.toFixed(2)}</div>
        </div>
        
        <div class="divider divider-vertical m-4 "></div>
        <div class="flex max-sm:justify-between justify-evenly px-4 ">
          
          
          <div class="">
            <div class="stat-desc">Média</div>
            <div class="stat-title">de Gols</div>
            <div class="stat-value text-2xl">{stats.avgGoals.toFixed(2)}</div>
          </div>
          <div class="divider divider-horizontal w-0 m-0"></div>
          <div class="  ">
            <div class="stat-desc">Taxa</div>
            <div class="stat-title">de Ambas</div>
            <div class="stat-value text-2xl">{stats.percBoth.toFixed(2)+"%"}</div>
            
          </div>
          <div class="divider divider-horizontal w-0 m-0"></div>
          <div class="">
            <div class="stat-desc ">Sugestões de Aposta</div>
            <div class="stat-title"></div>
            <div class="stat-value text-2xl">
              <button class="btn my-1 p-3 bg-green-400 hover:bg-green-500 dark:text-zinc-900 ">
                <FaSolidUnlockKeyhole />Liberar Análise
              </button>
            </div>
          </div>
          
        </div>
      
      </>
      }
    </div>
  )
}