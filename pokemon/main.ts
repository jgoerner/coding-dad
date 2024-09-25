import { parseArgs } from "@std/cli";
import { stringify } from "@std/csv";

import { Pokemon } from "./types.ts";
import { extractPokemon, fetchWithWait, genTwoCharCombos } from "./utils.ts";

const { shortenerBaseUrl } = parseArgs(Deno.args);

if (!shortenerBaseUrl) {
  throw new Error(
    "Must specify URL shorter base urs with the --shortenerBaseUrl flag",
  );
}

const allPokemon: Pokemon[] = [];

for (const combination of genTwoCharCombos()) {
  if (allPokemon.length === 23) break;
  const url = `${shortenerBaseUrl}${combination}`;
  const result = await fetchWithWait(url);

  const pokemon = extractPokemon(result);

  if (pokemon) {
    console.log(pokemon);
    allPokemon.push(pokemon);
  } else {
    console.log(`❌ no pokemon found for ${combination}`);
  }
}

const csvContent = stringify(
  allPokemon.map((pokemon) => [pokemon.pokemonName, pokemon.urlToCatch]),
);

await Deno.writeTextFile("pokemon.csv", csvContent);
