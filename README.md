# MindMaple

**Organize, prioritize, and visualize your tasks seamlessly.**

MindMaple is an AI-powered TODO application designed to streamline your task management. With features like intelligent suggestions, image generation, and robust task tracking, it combines simplicity and innovation for enhanced productivity.

## Features

- AI-powered task descriptions and suggestions.
- Seamless integration with MySQL database.
- Intuitive UI built with React and TailwindCSS.
- RESTful APIs for robust backend operations.
- Role-based user management and authentication.

---

## Frontend Setup

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yashkolte/mindmaple.git
   cd mindmaple/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

### Key Dependencies

- `react`: Core library for building the UI.
- `axios`: For making API requests.
- `tailwindcss`: For styling components.
- `@react-oauth/google`: For Google authentication.

---

## Backend Setup

### Prerequisites

- Java Development Kit (JDK 21 or higher)
- Maven
- MySQL Server

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yashkolte/mindmaple.git
   cd mindmaple/backend
   ```

2. Configure the database:
   - Create a MySQL database named `mindmaple`.
   - Update the `application.properties` file with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/mindmaple
     spring.datasource.username=yourusername
     spring.datasource.password=yourpassword
     ```

3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend API will be available at `http://localhost:8080`.

### Key Dependencies

- `spring-boot-starter-web`: For building RESTful APIs.
- `spring-boot-starter-data-jpa`: For database interaction.
- `mysql-connector-j`: For MySQL database connection.
- `spring-ai-openai-spring-boot-starter`: For AI-powered features.

---

## API Endpoints

### AI Features
- `POST /api/ai/generate` - Generate an image based on a prompt.

### TODO Management
- `POST /api/v1/todo` - Create a new task.
- `GET /api/v1/todobysub/{sub}` - Get tasks by user sub.
- `DELETE /api/v1/todo/{id}` - Delete a task by ID.
- `PUT /api/v1/todo/{id}` - Update a task by ID.

### User Management
- `POST /users/adduser` - Add or retrieve a user by sub.

---

## Deployment

### Frontend
1. Build the production files:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to any static hosting platform (e.g., Vercel, Netlify).

### Backend
1. Package the application:
   ```bash
   mvn package
   ```
2. Deploy the generated JAR file to any Java application hosting service (e.g., AWS, Heroku).

---

## Contribution

We welcome contributions! Please fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

Special thanks to all contributors and users who inspire us to make MindMaple better every day!
