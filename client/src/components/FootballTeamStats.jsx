
export function FootballTeamStats({
  stats, side = "all"
}) {
  const sideText =  side == "home" ? "Casa" : (side != "all" ? "Fora" : "");
  return(
    
    <div class="grid grid-cols-3 justify-evenly px-1 w-full ">
      
      <div class=" m-0.5 bg-zinc-100 dark:bg-zinc-700/20 rounded-md">
        <div class=" max-w-fit m-auto p-1  ">
          <div class="stat-desc">Média</div>
          <div class="stat-title">Gols Marcados</div>
          <div class="stat-value text-2xl">{(stats.avgGoalsScored).toFixed(2)}</div>
        </div>
      </div>
      
      <div class=" m-0.5 bg-zinc-100 dark:bg-zinc-700/20 rounded-md">
        <div class=" max-w-fit m-auto p-1  ">
          <div class="stat-desc">Média</div>
          <div class="stat-title">Gols Sofridos</div>
          <div class="stat-value text-2xl">{(stats.avgGoalsConced).toFixed(2)}</div>
        </div>
      </div>

      <div class=" m-0.5 bg-zinc-100 dark:bg-zinc-700/20 rounded-md">
        <div class=" max-w-fit m-auto p-1  ">
          <div class="stat-desc">Taxa</div>
          <div class="stat-title">Vitórias</div>
          <div class="stat-value text-2xl">{(stats.percWins).toFixed(2)+"%"}</div>
        </div>
      </div>

      {stats.avgOdd >=0 &&
        <div class=" m-0.5 bg-zinc-100 dark:bg-zinc-700/20 rounded-md">
          <div class=" max-w-fit m-auto p-0.5  ">
            <div class="stat-desc">Jogando ({sideText})</div>
            <div class="stat-title">Média de Odd</div>
            <div class="stat-value text-2xl">{(stats.avgOdd).toFixed(2)}</div>
            
          </div>

        </div>
      } 
      {stats.percOdds >= 0 &&
        <div class=" m-0.5 bg-zinc-100 dark:bg-zinc-700/20 rounded-md">
          <div class=" max-w-fit m-auto p-0.5  ">
            <div class="stat-desc">Jogos ({sideText}) com</div>
            <div class="stat-title">Odd a favor</div>
            <div class="stat-value text-2xl">{(stats.percOdds).toFixed(2)+"%"}</div>
            
          </div>

        </div>
      }
      
    </div>
   
  )
}