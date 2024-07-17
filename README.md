# Welcome to GPLAN Web

## Getting Started

Run the following commands to start the web in dev mode

### `npm i`

### `npm start`

## Code Structure

- **Gplan\-web**
  - **public**
  - **src**
    - **api**
    - **app**
    - **components**
    - **features**
    - **public**
    - **reducers**

## Module meanings

- `api` module keeps all the incoming and outgoing REST api calls
- `app` module keeps all the init contents required to start the app
- `components` module keeps all the common components like button to be used universally in the app
- `features` module keeps all the pages and non-ui features
  - `example-page`
    - `components` each page will have its own sub section and reusable components
    - `reducers` will store the reducers related to the feature
- `reducers` module will store all the common reducers for the app if any

## Coding rules

- Always run `npm run format` before commiting your code
- Follow the code structure
- Contribute to documentation 