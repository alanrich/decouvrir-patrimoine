# Découvrir Patrimoine

![Découvrir Patrimoine Banner](path/to/your/banner-image.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Contact](#contact)

## Introduction

**Découvrir Patrimoine** is a dynamic dashboard application designed to aggregate and visualize cultural heritage data from the [Ministère de la Culture](https://www.culture.gouv.fr/). Built with a React front end, an Express server, and MongoDB for data storage, this application provides users with an interactive way to explore various cultural datasets such as Museums, Cathedrals, Châteaux, Gardens, Notable Houses, and Contemporary Architecture.

Access the live application at [www.decouvrirpatrimoine.fr](https://www.decouvrirpatrimoine.fr).

## Features

- **Summary Table:** Presents an overview of the selected cultural datasets with options to sort and search.
- **Detail View:** Displays detailed information from the Ministère de la Culture alongside Wikipedia entries. This view can be expanded into a modal for an enhanced user experience.
- **Map View:** Interactive map populated with markers representing the locations of cultural sites.
- **Toolbar:** Allows users to select different cultural datasets including:
  - Museums
  - Cathedrals
  - Châteaux
  - Gardens
  - Maisons Des Illustres
  - Contemporary Architecture
- **Interactive Elements:**
  - Clickable images of famous artists or artworks within the museum dataset.
  - Search and sorting functionalities across various categories.

## Screenshots

![Dashboard](./src/assets/images/dashboard-screenshot.png)
_Dashboard displaying the user's workspace._

![Summary Table](./src/assets/images/summary-table-screenshot.png)
_Summary Table showcasing cultural datasets._

![Detail View](./src/assets/images/detail-view-screenshot.png)
_Detail View with a default view of the selected item's photo._

![Detail View MOdal](./src/assets/images/detail-view-modal-screenshot.png)
_Detail View Modal with additional content displayed._

## Usage

- **Select Datasets:** Use the toolbar to choose among Museums, Cathedrals, Châteaux, Gardens, Maisons Des Illustres, and Contemporary Architecture.
- **Search & Sort:** Utilize the search bar and sorting options in the Summary Table to find and organize data.
- **View Details:** Click on an item in the Summary Table to view detailed information. Expand the Detail View into a modal for a focused look.
- **Explore Map:** Interact with the Map View to see the geographical distribution of cultural sites.
- **Interactive Elements:** In the museum dataset, click on images of famous artists or artworks to learn more.

## Technology Stack

- **Front End:**
  - [React](https://reactjs.org/)
  - [MUI](https://redux.js.org/)
  - [React Router](https://mui.com/)
- **Back End:**
  - [Express](https://expressjs.com/)
  - [Node.js](https://nodejs.org/)
- **Database:**
  - [MongoDB](https://www.mongodb.com/)
- **Visualization:**
  - [Leaflet](https://leafletjs.com/) for MapView
- **Others:**
  - [Axios](https://axios-http.com/) for API calls
  - [Mongoose](https://mongoosejs.com/) for MongoDB interactions

## Contact

For any inquiries or feedback, please contact [rich.alan@proton.me](mailto:rich.alanl@proton.me).
