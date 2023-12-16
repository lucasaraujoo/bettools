import { formatDateFromString } from "@lib/utils";

export function FootballCard({
  fixture
}){
  return(
      <li class="card  shadow border border-1 dark:border-zinc-600 p-2 mb-2  "> 
        <a href={`/football/fixture/${fixture.idFixture}`} >
          <div class="grid grid-cols-3 items-center  "> 
            <div class="flex flex-col items-center text-center "> 
              <img src={fixture.Home.logo} alt="Palmeiras" class="w-10 h-10 " /> 
              <h3 class="font-semibold">{fixture.Home.name}</h3>
            </div>
            <div class="flex flex-col items-center "> 
              <span class="text-xs text-gray-600 dark:text-gray-400">{formatDateFromString(fixture.date)}</span> 
              <span class="text-lg font-bold text-gray-400">X</span> 
            </div>
            <div class="flex flex-col items-center text-center "> 
              <img src={fixture.Away.logo} alt="Palmeiras" class="w-10 h-10 " /> 
              <h3 class="font-semibold" >{fixture.Away.name}</h3>
              
            </div>
          </div>
        </a>
      </li>
  )
}