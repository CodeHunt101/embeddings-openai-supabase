# Movie Recommendation System with OpenAI and Supabase

## Overview
This project implements a semantic movie recommendation system using OpenAI's embeddings and Supabase for vector similarity search. The system takes natural language queries about movies and returns relevant movie recommendations based on semantic similarity rather than just keyword matching.

## Features
- Natural language movie queries
- Semantic search using OpenAI's text embeddings
- Vector similarity search with Supabase
- Conversational responses using OpenAI's GPT models
- Movie database with detailed information about recent films

## Technical Stack
- **Frontend**: Vanilla JavaScript with Vite
- **Database**: Supabase with pgvector extension
- **AI/ML**: OpenAI API (embeddings and chat completion)
- **Build Tool**: Vite

## Prerequisites
- Node.js and npm
- Supabase account and project
- OpenAI API key

## Environment Variables
Create a `.env` file with the following:
```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_anon_key
```

## Database Setup
1. Create a new Supabase project
2. Enable vector similarity search in your Supabase database
3. Execute the SQL queries from `queries-supabase.sql`:
   - Creates a `movies` table with vector embeddings support
   - Implements a `match_movies` function for similarity search

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

## Building for Production
```bash
npm run build
```

## How It Works
1. User queries are converted into embedding vectors using OpenAI's embedding model
2. The embeddings are used to search for similar movies in Supabase using vector similarity
3. Matching results are processed through OpenAI's chat completion to generate natural language responses
4. The system returns movie recommendations based on the user's query

## Project Structure
```
├── config.js             # OpenAI and Supabase configuration
├── index.js              # Main application logic
├── index.html            # Entry point
├── movies.txt            # Movie database content
├── queries-supabase.sql  # Database setup queries
└── script.cjs            # Utility script for file management
```

## Current Limitations
- Returns only one match at a time
- Limited to the movies in the database
- Requires both OpenAI and Supabase credits

## Future Improvements
- Add a user interface for queries
- Include more movie metadata
- Implement movie filtering by rating, genre, etc.
- Add caching for frequent queries
