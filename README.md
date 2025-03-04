# Blog API Client

This is the Client Front-End for the [Blog API](https://github.com/T0nci/odin-blog-api).

## Live Preview

[Live Preview link](https://odin-blog-viewer.vercel.app/)

## Demo

- Home page ![home page](./readme_assets/image-1.png)
- Login page ![login page](./readme_assets/image-2.png)
- Register page ![register page](./readme_assets/image-3.png)
- Blog page ![blog page](./readme_assets/image-4.png)
- Comments section ![comments section](./readme_assets/image-5.png)

### Prerequisites

- Setup and run a [Blog API server](https://github.com/T0nci/odin-blog-api?tab=readme-ov-file#installation)

### Setup and running locally

1. Clone the repo:
   ```bash
   git clone git@github.com:T0nci/odin-blog-viewer.git
   ```
   The above example is cloning through SSH, this can be done through HTTPS as well:
   ```bash
   git clone https://github.com/T0nci/odin-blog-viewer.git
   ```
2. Install NPM packages:
   ```bash
   npm install
   ```
3. Create `.env` file and set the following environment variables with values that follow the instructions:
   ```dotenv
   VITE_API_URL='THE URL ON WHICH THE BLOG API IS RUNNING'
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

And your server should have started. Visit your server by running the following command in the same terminal as the 4th step and then pressing enter.

```bash
o
```

## License

[MIT](LICENSE)

[(back to top)](#blog-api-client)
