# 3. Features
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
