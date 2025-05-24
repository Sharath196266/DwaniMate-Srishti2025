Project Details: DwaniMate - ದ್ವನಿಮಿತ್ರ

Overview:
DwaniMate is a bilingual AI-powered voice assistant and information platform designed to assist users in Karnataka with government services, transport routes, and public schemes. It supports Kannada and English, enabling easy access to vital information through conversational AI and smart transport route planning.

Features

Bilingual Chat Interface:
Communicate in Kannada or English for queries about government schemes, transport routes, and more.
Smart Transport Information:
Find the best bus routes and travel timings between locations using geolocation or place names with integration of OpenStreetMap geocoding.
Government Schemes Explorer:
Browse and apply for relevant schemes such as PM-Kisan, Ayushman Bharat, and Digital Karnataka with detailed eligibility and document requirements.
Speech Synthesis:
AI-generated Kannada speech responses to provide an immersive voice assistant experience.
Real-time Location Support:
Use the browser's geolocation API for quick setting of current location in route planning.
Tech Stack

Frontend:
React with TypeScript, using components from a custom UI library (@/components/ui), and icons from lucide-react.
Fetches data from backend APIs and integrates with geocoding services like OpenStreetMap Nominatim.
Backend:
Python Flask server with CORS enabled.
Integrates with Dwani API for AI-powered chat and text-to-speech in Kannada.
Hosts REST endpoints for chat (/api/chat) and audio streaming (/api/audio).
Other Tools:
OpenStreetMap Nominatim for geocoding place names to coordinates.
Environment variables for Dwani API keys (DWANI_API_KEY, DWANI_API_BASE_URL).
npm for frontend dependency management.
pip for Python backend package management.
How to Run

Frontend
cd voice-of-service-dawn
npm install
npm run dev
Backend
cd backend
pip install -r requirements.txt
python app.py
Team Members

BR Adithya
Sharath H N
Rakshi
Hemanthi
Use Case

DwaniMate empowers Karnataka residents, especially those who prefer Kannada, to easily access and understand government services and transportation information. This project combines AI, voice interaction, and smart geolocation features to simplify public service navigation.

