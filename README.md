# Bettools

Project developed for football game data analysis and prediction of statistics for future games. This project is built using Python and JavaScript with the Astro framework, combining the efficiency of the backend with the interactivity of the frontend to provide valuable information for bettors.

## Backend Operation (Python)
Bettools collects and analyzes historical football game data to provide relevant statistics. It uses data from past games available in this [repository](https://github.com/futpythontrader/YouTube) and standings data from the [api-football](https://rapidapi.com/api-sports/api/api-football).

1. **Data Collection:** Initially, the spreadsheets for the next 3 days of future games are collected, filtering these games and fetching the standings with the API-FOOTBALL. Using the Pandas library, past games of the both teams are collected.

2. **Data Processing:** With the data from the previous games of each team (Home and Away), some statistics such as average Odds, win rate, and goal rate are stored.

3. **Data Storage:** A JSON is constructed with the analysis of all matches, and another with the standings data related to these matches. In the local environment, the JSON is sent to the local API (using Astro endpoints). In the production environment, the data is sent and stored using [KV storage](https://vercel.com/docs/storage/vercel-kv) from Vercel.

## Prerequisites
- Python
- Node.js
- Other dependencies can be installed using the `requirements.txt` and `package.json` files.

## Vercel Services Used
- [KV Storage](https://vercel.com/storage/kv)

## Environment Variables
Make sure to configure the following environment variables before starting:

- **FOOTBALL_API_KEY:** Your access key from [api-football](https://rapidapi.com/api-sports/api/api-football).
- **KV_REST_API_TOKEN:** Token generated by Vercel when you connect your project and create a KV Storage.
- **KV_REST_API_URL:** You'll find your URL and token in your project's dashboard under the following environment variables.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/bettools.git
   cd bettools
   ```

2. Install backend dependencies:
   ```bash
   cd server
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   yarn install
   ```

4. Run the client:
   ```bash
   yarn run dev
   ```

5. Run the server to collect data:
   ```bash
   cd ../server
   python main.py
   ```

6. Access BetTools in the browser:
   ```
   http://localhost:4321
   ```

## Improvements

1. Evaluate deployment options and schedule daily execution for the backend.
2. Process and include more statistical data in the analysis construction.
3. Implement AI analysis and result projection based on the collected data.
4. Finish construction of the seasons page.
5. Display odds from major betting houses on the Odds tab.
6. Implement user authentication.
7. Implement features for premium users.

## Contributions

Contributions are welcome! Feel free to open issues, send pull requests, or suggest improvements.
