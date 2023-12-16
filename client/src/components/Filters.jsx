import { IoFootball, IoBasketball } from 'solid-icons/io'
import  {createResource} from "solid-js";
import {getFootLeagues} from '@lib/data/football'
import { createSignal, onMount , For} from 'solid-js';
import { getNextDates } from '@lib/utils';


export function Filters({
  url
}){
  const fetchFootStandings = async () =>  {
    const response = await getFootLeagues(url.origin);
    return response;
  };
  const [footLeagues] = createResource(fetchFootStandings);
  const [filter, setFilter] = createSignal("football");


  onMount(() => {
    if ( window.innerWidth < 640 ){
      setFilter("")
    } else if ( filter() == ""){
      setFilter("football")
    }
  });

  
  return(
    <div class="flex flex-col join join-vertical  max-w-sm min-w-[18rem] max-sm:max-w-full">
      <div class="join join-item join-horizontal  ">
        <For each={getNextDates(3)} >{ (date) =>
          <a class="btn join-item grow " href={"/?date="+date.year+"-"+date.month+"-"+date.day}>{date.day+"."+date.month}</a>
        }</For>
        
      </div>
      <div class="collapse collapse-arrow join-item  dark:bg-gradient-to-br bg-gradient-to-tl from-15%  dark:from-green-950 dark:to-emerald-900 from-lime-300 to-green-100">
        <input type="checkbox" name="my-accordion-1" checked={ filter() == "football"} onClick={() => setFilter("football")} /> 
        <div class="flex collapse-title text-xl font-medium">
          <IoFootball size={28} />
          Futebol
          
        </div>
        <div class="flex flex-wrap gap-2 collapse-content ">
          {footLeagues() &&
            <For each={footLeagues()} >
              {(league) => 
                <a href={"/football/"+league.id}>
                  <button class="btn btn-sm btn-outline rounded-full ">
                    <img src={league.flag} class='w-4 h-4' />
                    {league.name}
                  </button>
                </a>
              } 
            </For>
          } 
        </div>
      </div>
      <div class="collapse collapse-arrow join-item  dark:bg-gradient-to-br bg-gradient-to-tl from-15%  dark:from-orange-950 dark:to-amber-900 from-yellow-300 to-orange-100">
        <input type="checkbox" name="my-accordion-1" checked={filter() == "basket"} onClick={() => setFilter("basket")} /> 
        <div class="flex collapse-title text-xl font-medium">
          <IoBasketball size={28} />
          Basquete
        </div>
        <div class="flex flex-wrap gap-2 collapse-content "> 
          <button class="btn btn-sm btn-outline rounded-full">NBA</button>
          
        </div>
      </div>
    </div>
  )
}