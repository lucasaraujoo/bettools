import {For} from "solid-js"
import { FootballCard } from "./FootballCard";


export function CardList(
  {matches, type}
){
  return(
      <ul  >
        <For each={matches} >
          {(matche) => <FootballCard fixture={matche} />}
        </For>

			</ul>
  )
}