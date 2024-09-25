import { DOMParser } from "deno_dom";
import { Pokemon } from "./types.ts";

/**
 * Generates all two character combinations of the given string
 * @param [chars="abcdefghijklmnopqrstuvwxyz0123456789"] - characters to generate from
 * @returns a generator that yields all two character combinations
 */
export function* genTwoCharCombos(
  chars: string = "abcdefghijklmnopqrstuvwxyz0123456789",
) {
  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars.length; j++) {
      yield chars[i] + chars[j];
    }
  }
}

/**
 * Fetches a URL with a delay
 * @param url - The URL to fetch
 * @param secondsToWait - The delay in milliseconds (default is 1 second)
 * @returns a promise that resolves to the fetched URL
 */
export function fetchWithWait(
  url: string,
  secondsToWait: number = 1_000,
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch(url).then((res) => res.text()));
    }, secondsToWait);
  });
}

/**
 * Extracts Pokemon information from the given HTML string.
 * @param html - The HTML string to parse.
 * @returns A Pokemon object containing the Pokemon name and URL to catch, or undefined if extraction fails.
 */
export function extractPokemon(html: string): Pokemon | undefined {
  const parser = new DOMParser();

  const doc = parser.parseFromString(html, "text/html");
  const script = doc.querySelector("script");

  const match = script?.textContent?.match(/https:\/\/pokemon\.+w\.de[^\s'"]+/);
  if (!match) return;

  const [longUrl] = match;

  const pokemon = doc.title;

  return {
    pokemonName: pokemon,
    urlToCatch: longUrl,
  };
}
