# Wordsy Project Brief

## 1. Background
Wordsy is a language learning app designed to help non-native speakers of English practice their vocabulary. Using a spaced repetition system (SRS), the app helps users retain and recall vocabulary effectively. With integrated AI features such as sentence generation, grammar checks, and synonyms, Wordsy enhances the learning experience.

## 2. Key Features
- **AI Assistance**: Provides sentence generation, grammar checks, and synonyms to help with vocabulary understanding.
- **Flashcards**: Users can create their own flashcards and review them using the SRS.
- **Freemium Model**: Free users have limited AI functionality, while pro users get more extensive AI capabilities.
- **Card Deck Functionality**: Users can categorize flashcards into different decks and select decks to start reviewing. Each deck has its own learning schedule, and when a user starts reviewing a deck, the system will schedule the number of cards to review based on the forgetting curve.
- **Quiz Functionality**: After reviewing cards or based on user selection, cards will enter the quiz system. The quizzes come in various formats: cloze tests, word definitions, word collocations, sentence creation, phrases, and preposition-related phrases. AI evaluates the answers' correctness and completeness to assign a familiarity rating (1-5 stars or more). This rating becomes part of the flashcard's metadata (average rating from prior reviews). Users can also categorize flashcards into decks based on their rating and continue reviewing.

## 3. Technical Specifications
- **Frontend**: React Native (for both iOS and Android).
- **Backend**: Node.js with NestJS framework.
- **Database**: MongoDB.
- **AI Integration**: Google Gemini API.
- **Cloud Storage**: AWS S3 for storing files and flashcards.

## 4. Business Goals
- Expand user base by offering a freemium model.
- Increase retention by providing personalized, AI-driven learning experiences.
- Ensure the app's scalability and performance with cloud-based architecture.

## 5. Roadmap
- **Q1**: MVP with core AI features, flashcards, and basic user management.
- **Q2**: Introduce the Pro version, enhanced AI functionalities, and user feedback integration.
- **Q3**: Expansion to additional languages and integration with other learning platforms.
