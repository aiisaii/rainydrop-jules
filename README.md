# RainyDrop Clone

This project is a full-featured, self-hosted clone of Raindrop.io. It includes a Django backend, a React frontend, and a browser extension.

## Features

-   User authentication with email verification and password reset.
-   Multi-user support with data isolation.
-   Bookmark management with categories, tags, and collections.
-   Dedicated categories for influencers and torrents.
-   Import and export of data in JSON format.
-   Browser extension for one-click bookmarking.
-   Admin interface for managing application data.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Python 3.8+
-   Node.js and npm

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rainydrop-clone.git
    cd rainydrop-clone
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Apply the database migrations:**
    ```bash
    python manage.py migrate
    ```

5.  **Create a superuser to access the admin panel:**
    ```bash
    python manage.py createsuperuser
    ```

6.  **Run the backend development server:**
    ```bash
    python manage.py runserver
    ```
    The backend will be running at `http://127.0.0.1:8000/`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm start
    ```
    The frontend will be running at `http://localhost:3000/`.

### Browser Extension Setup

1.  **Open your browser's extension management page.**
    -   In Chrome, go to `chrome://extensions`.
    -   In Firefox, go to `about:addons`.

2.  **Enable "Developer mode".**

3.  **Click "Load unpacked" and select the `browser-extension` directory** from the project.

## Known Issues

-   The tag merging functionality on the backend is not working as expected. The source tags are not being deleted after the merge. This is documented in the code.
