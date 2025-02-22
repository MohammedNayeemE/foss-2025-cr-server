## CHAT-ROOM SERVER [feat : openhub]

- A Node.js and Express-based chat room server built with TypeScript and PostgreSQL, featuring GitHub OAuth authentication. This server supports chat rooms where users can exchange messages, share links, send images, and post code snippets. Each chat room is moderated by an admin who has the authority to manage users, transfer admin rights, and generate invite links.

### FEATURES:
  - User Authentication: GitHub OAuth for secure user sign-ins.
  - Chat Room Management: Room-specific administrators can manage user access and roles.
  - Admin Controls:

      - Block/unblock users.
      - Transfer admin privileges.
      - Generate unique links for others to join the room.

  - Message Types:

      - Text
      - Hyperlinks
      - Images
      - Code snippets

  - Database: PostgreSQL for reliable data storage.

### Getting Started:

#### prerequisties:
    - nodejs
    - PostgreSQl 
#### installation 

1. clone this repo 
```
git clone https://github.com/MohammedNayeemE/foss-2025-cr-server.git
cd cr-server
```
2. install the depencies
```
npm install

```
3. setup environment
```
touch .env [linux]
New-Item .env [windows]

paste your db credentials in the respective fields at .env

```
- env strcuture:

```
DB_USER = 
DB_PASSWORD = 
DB_HOST = 
DB_PORT = 
DB_DATABASE = 

```

4. Running the server 
```
npm run start

```
