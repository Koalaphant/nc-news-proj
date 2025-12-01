## NC News

Welcome to NC News! This is a platform where you can read, share, and discuss articles on various topics. Whether you're interested in technology, politics, or lifestyle, NC News has got you covered.

Visit here: [https://nc-news-andrew.netlify.app/](https://nc-news-andrew.netlify.app/) - Please note it may take up to 30 seconds for the site to spool up

Back-end Repo:  
[https://github.com/Koalaphant/nc-news](https://github.com/Koalaphant/nc-news)

**Minimum node version required to run locally:** _v21.2.0_

**To run this project locally:**
In your terminal:

    git clone https://github.com/Koalaphant/nc-news-proj](https://github.com/Koalaphant/nc-news-proj

Then navigate to this directory

    cd nc-news-proj

### Run in Docker (production build)

1. Build the image, injecting your API URL (required at build time for Vite):

       docker build --build-arg VITE_API_BASE_URL="https://your-api.example.com/api" -t nc-news-prod .

2. Run the container and expose it on port 80 (or adjust to suit your VPS):

       docker run -d --name nc-news-prod -p 80:80 nc-news-prod

Set a different host port (e.g. `-p 3000:80`) if port 80 is already taken. Rebuild the image whenever you change code or the API base URL.
