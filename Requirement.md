Frontend Engineering Test: Cryptocurrency Price Tracker
Objective:
Create a cryptocurrency price tracker with real-time updates and interactive form functionalities
using a frontend framework of your choice (e.g., React, Svelte, Angular). The application should
fetch and display real-time cryptocurrency prices and allow the user to filter and simulate
investments.
Note: Ekorn does not deal with Crypto Currencies, this use case is for testing purposes
only

Requirements:

1. Real-Time Price Updates
   ● Use the Coinbase API fetch cryptocurrency prices (e.g., Bitcoin, Ethereum, etc.), quoted
   in USD, and display, at least, the price & volume
   ● Implement a real-time price refresh mechanism (e.g., update prices every 10 seconds).
   ● Hints:
   ○ To identify USD quoted crypto currencies, only allow symbols with “-USD”. For
   example, BTC-USD and ETH-USD (ie BTC-USDT, ETH-USDT are not quoted in
   USD)
   ○ First retrieve all the products from https://api.exchange.coinbase.com/products
   ○ For each product, retrieve the ticker from
   https://api.exchange.coinbase.com/products/{product_id}/ticker

2. Filtering and Sorting
   ● Add a search bar to filter cryptocurrencies by name or symbol.
   ● Allow the user to sort the list by name or price (ascending/descending).
3. Simulate Investments
   ● Provide a form that allows the user to:
   ○ Select a cryptocurrency from a dropdown.
   ○ Input an investment amount in USD.
   ○ Calculate the amount of the selected cryptocurrency they would own at the
   current price.
   ○ Hint:
   ■ The price, in USD, is for 1 unit of the crypto currency. So if the price of
   BTC-USD is 60,000.00, then the price for 1 BTC is 60,000.00 USD

● Display the result dynamically below the form.

Bonus (Optional):
● Testing: Write unit tests for key components or functionality (e.g., price fetching, form
validation, filtering).
● Error Handling: Gracefully handle API errors (e.g., display an error message if the API
call fails).
● State Management: Showcase clean state management for real-time updates and form
interactions.

<!-- Deliverables:
● A GitHub repository with the codebase.
● A README.md file explaining:
○ How to run the application locally.
○ Any design decisions or trade-offs made during development. -->
