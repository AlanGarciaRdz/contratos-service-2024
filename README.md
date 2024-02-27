# API Servicios de Transporte Recorriendo Kilómetros

This API provides services for managing contracts related to transportation. It includes endpoints for health checks, generating random keys, saving contracts, and retrieving contract details.

## Table of Contents
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Generate Random Key](#generate-random-key)
  - [Save Contract](#save-contract)
  - [List Contracts](#list-contracts)
  - [Retrieve Contract](#retrieve-contract)

## Endpoints

### Health Check

- **Endpoint:** `/healthZ`
- **Method:** `GET`
- **Description:** Returns the health status of the API.
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "API servicios de transporte Recorriendo kilometros último update 26 feb 2024"
  }
  ```

### Generate Random Key

- **Endpoint:** `/clave`
- **Method:** `POST`
- **Description:** Generates a random hexadecimal key.
- **Response:** Returns a random hexadecimal key.

### Save Contract

- **Endpoint:** `/guardar`
- **Method:** `POST`
- **Description:** Saves a contract to the file system.
- **Request Body:** Expects a JSON object representing the contract details.
- **Response:** Returns the saved contract details.

### List Contracts

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Lists all available contracts.
- **Response:** Returns an array of contract filenames.

### Retrieve Contract

- **Endpoint:** `/:nombre_contrato`
- **Method:** `GET`
- **Description:** Retrieves details of a specific contract.
- **Path Parameter:** `nombre_contrato` (Name of the contract file).
- **Response:** Returns the content of the specified contract file.

## Usage

To use this API, you can send HTTP requests to the provided endpoints using your preferred HTTP client.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

## Author

Alan Garcia

Feel free to contribute or report issues.

