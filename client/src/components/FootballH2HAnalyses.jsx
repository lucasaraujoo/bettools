import {  createSignal } from "solid-js";
import { FootballTeamStats } from '@components/FootballTeamStats';
import { FootballTableMatches } from '@components/FootballTableMatches';
import { FootballVersusStats } from '@components/FootballVersusStats';
import { 
  filterMatchesByTeam, 
  filterMatchesByVersus
} from '@lib/data/football';


export function FootballH2HAnalyses ({
  fixture
}){
  
  const lastMatchesHome = filterMatchesByTeam(fixture.lastMatches,fixture.Home.name);
  const lastMatchesAway = filterMatchesByTeam(fixture.lastMatches, fixture.Away.name);
  const lastMatchesVersus = filterMatchesByVersus(fixture.lastMatches,fixture.Home.name, fixture.Away.name)
  const lastMatchesHomeInHome = filterMatchesByTeam(fixture.lastMatches,fixture.Home.name, "home");
  const lastMatchesAwayInAway = filterMatchesByTeam(fixture.lastMatches, fixture.Away.name, "away");
  const lastMatchesHomeXAway = filterMatchesByVersus(fixture.lastMatches,fixture.Home.name, fixture.Away.name, false)
  const [side, setSide] = createSignal("all");

  return(
    <div class='w-full '>

      <div class="flex justify-center space-x-1 pt-1">
        <button class="btn btn-sm btn-error hidden"></button>
        <button class={`btn btn-sm btn-error btn-outline ${side() == 'all' && 'btn-active'}` } onclick={() => setSide("all")}>Todos</button>
        <button class={`btn btn-sm btn-error btn-outline ${side() == 'home' && 'btn-active'}` } onclick={() => setSide("home")}>Casa</button>
        <button class={`btn btn-sm btn-error btn-outline ${side() == 'away' && 'btn-active'}` } onclick={() => setSide("away")}>Fora</button>
      
      </div>

      <Show when={side() !== "away"} >

        <div class="z-10 card shadow-md  bg-gradient-to-b from-50% from-transparent via-zinc-100 dark:via-base-100 to-zinc-200 dark:to-zinc-700 ">
          <h2 class="text-lg font-bold mt-2  text-center">{fixture.Home.name}</h2>
          
          <Show 
            when={side() === "home"} 
            fallback={
            <>
            <FootballTeamStats stats={fixture.analysisHome.allMatches} />
            <FootballTableMatches fixtures={lastMatchesHome} team={fixture.Home.name}  />
            </>}
          >
            <FootballTeamStats stats={fixture.analysisHome.inHome} side={side()} />
            <FootballTableMatches fixtures={lastMatchesHomeInHome} team={fixture.Home.name}  />
          </Show>
          
        </div>

      </Show>
      <Show when={side() !== "home"} >
        <div class="z-10 card shadow-md  bg-gradient-to-b from-50% from-transparent via-zinc-100 dark:via-base-100 to-zinc-200 dark:to-zinc-700 ">
          <h2 class="text-lg font-bold mt-2 text-center">{fixture.Away.name}</h2>
          <Show 
            when={side() === "away"} 
            fallback={
            <>
            <FootballTeamStats stats={fixture.analysisAway.allMatches} />
            <FootballTableMatches fixtures={lastMatchesAway} team={fixture.Away.name} /> 
            </>}
          >
            <FootballTeamStats stats={fixture.analysisAway.inAway} side={side()} />
            <FootballTableMatches fixtures={lastMatchesAwayInAway} team={fixture.Away.name} />
            
          </Show>
          
        </div>
      </Show>
      
      <div class=" -mt-5 card shadow-md bg-gradient-to-b from-50% from-transparent via-zinc-100 dark:via-base-100 to-zinc-200 dark:to-zinc-700 ">
        
        <div class="bg-gradient-to-t from-transparent  from-30% via-red-00 to-red-400 dark:to-red-900" >
          <h2 class="text-lg font-bold mt-7 mb-1 text-center dark:text-white/80 text-black/80">Confrontos diretos {(side() !== "all" && lastMatchesHomeXAway.length > 0) && "(Casa x Fora)"}</h2>
          {(side() === "all"  || lastMatchesHomeXAway.length === 0)
          ? <FootballVersusStats stats={fixture.analysisVersus.analysisVersusAll}  />
          : <FootballVersusStats stats={fixture.analysisVersus.analysisVersusHxA}  />

          }
        </div>
        {(side() === "all"  || lastMatchesHomeXAway.length === 0)
        ? <FootballTableMatches fixtures={lastMatchesVersus} team=""  />
        : <FootballTableMatches fixtures={lastMatchesHomeXAway} team=""  />
        
        }
        
      </div>
    </div>
  )
}