# Pokemon Raffle Reverse Engineering

This project contains code for reverse engineering a Pokemon raffle system. It's designed to demonstrate how a seemingly secure raffle can be exploited, serving as a lesson in information security.

## Project Structure

The project consists of several TypeScript files and configuration files:

- `main.ts`: The main entry point of the application
- `types.ts`: Contains type definitions
- `utils.ts`: Utility functions for the application
- `deno.json`: Deno configuration file
- `deno.lock`: Deno lock file for dependencies

## How It Works

### Inputs

The main input for this application is a base URL for a URL shortener service, provided via the command line argument `--shortenerBaseUrl`.

### Process

1. The application generates all possible two-character combinations.
2. For each combination, it constructs a URL using the provided shortener base URL.
3. It then fetches the constructed URL, with a delay between requests to avoid overloading the server.
4. The HTML response is parsed to extract Pokemon information.
5. If a Pokemon is found, it's added to a list.
6. This process continues until 23 Pokemon are found or all combinations are exhausted.

### Outputs

The application outputs two things:

1. Console logs of each Pokemon found or combinations that didn't yield a Pokemon.
2. A CSV file named `pokemon.csv` containing the names and catch URLs of all found Pokemon.

## Key Functions

- `genTwoCharCombos()`: Generates all possible two-character combinations.
- `fetchWithWait()`: Fetches a URL with a specified delay.
- `extractPokemon()`: Parses HTML to extract Pokemon information.

## Usage

To run the application:

```sh
deno task catchThemAll
```

This command is defined in the `deno.json` file and includes necessary permissions for network access and file writing.

## Security Implications

This project demonstrates how a seemingly random raffle system can be systematically exploited if the underlying mechanism (in this case, short URLs) is predictable. It serves as a cautionary tale about the importance of truly random and secure systems in applications involving chance or raffle-like mechanics.



# Reverse Engineering a Pokemon Raffle

>  A tale on childlike curiosity turning into a lesson about information security 🔐

This repo contains the code for the article [Reverse Engineering a Pokemon Raffle]()

## How to run

```sh
deno task catchThemAll
```
