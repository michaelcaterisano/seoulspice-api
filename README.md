# Seoulspice Pickup API

This is the repository for the backend API for [pickup.seoulspice.com](https://pickup.seoulspice.com), a custom online ordering app for Seoulspice Restaurant ([seoulspice.com](https://www.seoulspice.com)). This was built primariliy between December 2020 and February 2020, and is still under active development.

Seoulspice uses Square to process their online orders. The API's main responsibility is to proxy requests from the [client application](https://github.com/michaelcaterisano/seoulspice-pickup-app) to Square's API.

Specific functionality includes:

- Processing orders
- Processing payments
- Managing customer loyalty points
- Getting user location and returning nearby restaurant locations
- Texting users payment receipts (using Twilio)

Future Features/Improvements include:

- Endpoints to allow marking ingredients out of stock per location and dynamically updating menu data sent to client
- Manage menu data entirely on back end, allowing restaurant managers to change menu
