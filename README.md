# Travel Blog Web Application (Little Adventures | Travel Stories)
*Built and deployed independently as a portfolio project.  
A full-stack travel blog platform where users can explore blog posts through an interactive map and card-based interface, with advanced filtering and location-based grouping.
Logged in users (currently limited to developer and demo accounts) can access admin side to create, edit, delete blogs.

This application was built to keep track of my travels and share those stories with others, especially my mother, who loves travelling.  
This project demonstrates end-to-end development, including API design, authentication, media handling, and deployment.

# Live Demo
[Little Adventures | Travel Stories](https://little-adventures.vercel.app)

## Demo Account
Username: demo_admin
Password: password123!
> [!NOTE]
> Demo account has limited permissions. Users can view drafts and access the create page, but cannot publish, save, or delete posts.

# Features
- Create, edit, and manage blog posts
- Image preview during blog creation
- Interactive map view using location-based data
- Grouped blog posts with carousel per location
- Filter blogs by year, region, and publish/draft state
- Toggle between map and card views
- JWT-based authentication
- Responsive design across devices
- Asynchronous data fetching with loading states
- Interactive 3D element on homepage using Three.js

# Tech Stack
## Frontend
- React
- React Router
- Leaflet
- CSS
- Three.js
## Backend
- Node.js
- Express
## Database
- MongoDB
- Cloudinary (image storage)
## Deployment
- Vercel (Frontend)
- Render (Backend)

# Architecture
- Frontend communicates with backend via REST APIs
- Authentication handled using JWT tokens
- Blog data stored in MongoDB and fetched dynamically
- Images stored in Cloudinary, with URLs persisted in MongoDB
- Map markers generated based on grouped location data
- Blog recommendations based on blog series and location

# Challenges & Solutions
## Backend Cold Start (slow initial load)
**Problem**  
The backend, hosted on free-tier Render, would go idle after inactivity, leading to slow initial responses or failed requests.

**Solution**  
- Implemented retry logic on the frontend
- Added loading states to improve perceived performance

**Outcome**  
Improved reliability and user experience during initial load.
## Database Access Restrictions (IP Whitelisting)
**Problem**  
MongoDB access was restricted to whitelisted IP addresses, but the hosting platform did not provide a fixed outbound IP.

**Solution**  
- Temporarily allowed access from all IP addresses for development purposes

**Outcome**  
Enabled deployment without blocking database connectivity, with the intention to secure this further in production
## Large Image Payloads (Performance Issue)
**Problem**  
Blog pages containing multiple high-resolution images resulted in slow load times.

**Solution**  
- Implemented lazy loading for images

**Outcome**  
Reduced initial load time and improved performance

# Future Improvements
- Strengthen database security by restricting MongoDB access to trusted IP addresses
- Improve search and filtering capabilities
- Implement caching for improved performance
- Allow flexible blog content layouts (drag-and-drop components)
- Add comments and user interaction features
- Introduce custom domain and improve branding