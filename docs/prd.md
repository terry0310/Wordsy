# Product Requirements Document (PRD) for Wordsy

## 1. Overview
Wordsy is an AI-powered language learning app designed to help non-native speakers of English practice and learn vocabulary. It allows users to create their own flashcards, study vocabulary based on the forgetting curve, and interact with an AI to generate example sentences, grammar checks, synonyms, and antonyms.

## 2. Goals
- Provide a vocabulary learning tool based on flashcards with AI assistance.
- Integrate AI-powered features such as sentence generation, grammar checks, and synonyms.
- Provide a flexible freemium model with usage limits based on user type (free vs. pro).
- Build a robust backend with a scalable architecture for managing flashcards and AI requests.

## 3. Features
### 3.1 Core Features
- **Flashcard Creation**: Users can create and design flashcards.
- **AI Assistance**: Includes features like sentence generation, grammar checks, synonyms, and antonyms.
- **SRS (Spaced Repetition System)**: The app uses the forgetting curve for optimized study schedules.
- **Batch Task Management**: Generate example sentences and quizzes for multiple cards at once.
- **Freemium Model**: Free users have limited AI usage, and pro users get more AI tasks but still have limits.
- **Card Deck Functionality**: Users can categorize flashcards into different decks and select decks to start reviewing. Each deck has its own learning schedule, and when a user starts reviewing a deck, the system will schedule the number of cards to review based on the forgetting curve.
- **Quiz Functionality**: After reviewing cards or based on user selection, cards will enter the quiz system. The quizzes come in various formats: cloze tests, word definitions, word collocations, sentence creation, phrases, and preposition-related phrases. AI evaluates the answers' correctness and completeness to assign a familiarity rating (1-5 stars or more). This rating becomes part of the flashcard's metadata (average rating from prior reviews). Users can also categorize flashcards into decks based on their rating and continue reviewing.

### 3.2 Non-Functional Requirements
- **Availability**: The system should be available 99.9% of the time.
- **Scalability**: The system should scale as user base grows, especially for batch tasks.
- **Security**: User data should be encrypted, and the app must comply with privacy regulations.

## 4. Technical Requirements
- **API**: The system will use RESTful API endpoints (with JSON) for interaction with the backend services.
- **AI Backend**: Google Gemini API will be used for AI tasks such as sentence generation and grammar checks.
- **Database**: MongoDB for storing user data, flashcards, and task history.
- **Cloud Storage**: AWS S3 compatible service for storing generated data.

## 5. User Stories
- As a free user, I want to have daily limits for AI usage.
- As a pro user, I want to get more AI tasks per day than free users, but still have limits.
- As a user, I want to be able to see AI-generated example sentences and check grammar.

## 6. Milestones
- **Phase 1**: Core functionality implementation (AI integration, user registration, flashcard creation).
- **Phase 2**: Implement SRS and batch task handling.
- **Phase 3**: Deploy the app with freemium model and AI limits.
- **Phase 4**: Release mobile versions (iOS/Android).
