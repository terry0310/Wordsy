# 4. Communication Flow

The user interacts with the app to trigger AI tasks (e.g., generate a sentence).

The request is sent to the API Gateway, which checks for quotas and authorization.

If AI data is not cached or already available, the system queries the Google Gemini API.

The generated data is cached and stored for future use, and the response is sent back to the user.
