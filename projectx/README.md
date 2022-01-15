# family-board

### Root env (for docker) / local setup
#### Path: .env
##### DOCKER_ENV=dev
##### APP_SERVER_PORT=4000
##### APP_CLIENT_PORT=3000

### Backend env / local setup
#### Path: backend/.env
##### MONGO_URI="" -> Mongo DB Atlas (cloud) => https://www.mongodb.com/cloud/atlas/register
##### NODE_ENV="development"
##### PORT=4000
##### SECRET_KEY="" -> Secret for encryption
##### FRONT_BASE_URL="http://localhost:3000"

### Frontend env / local setup
#### Path: frontend/project-x/.env.development.local
##### REACT_APP_BASE_URL="http://localhost:4000/dashboard"
##### REACT_APP_SUBSCRIBE_URL="ws://localhost:4000/dashboard"
##### REACT_APP_OPENWEATHER_KEY="" -> Openweathermap API => https://openweathermap.org/api
