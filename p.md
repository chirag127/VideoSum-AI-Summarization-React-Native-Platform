Okay, here is a Product Requirements Document (PRD) for the YouTube Video Summarizer React Native Expo App.

---

**Product Requirements Document: YouTube Video Summarizer App**

**Version:** 1.0
**Date:** May 21, 2024
**Author:** [Your Name/Team Name]
**Status:** Final

**1. Introduction**

This document outlines the requirements for a cross-platform (iOS, Android, Web PWA) application built using React Native Expo. The application allows users to generate concise summaries of YouTube videos using Google's Gemini 2.0 Flash-Lite AI model. Users can input YouTube links via pasting or sharing directly from the YouTube app. The generated summaries are stored persistently, can be read aloud using customizable text-to-speech (TTS), managed in a history view, and shared.

**2. Goals**

*   Provide users with quick and accurate summaries of YouTube videos.
*   Offer flexible summary options (type and length).
*   Deliver an accessible experience with customizable text-to-speech playback.
*   Enable easy sharing of both YouTube links (for summarizing) and generated summaries.
*   Provide a persistent history of summarized videos for easy access.
*   Ensure a seamless user experience across iOS, Android, and Web (as a PWA).
*   Build a robust and performant application using the specified technology stack.

**3. Target Audience**

*   Students, researchers, and professionals looking to quickly grasp the content of YouTube videos without watching them entirely.
*   Individuals with limited time who want to consume video content efficiently.
*   Users seeking accessibility features like text-to-speech for consuming information.
*   Anyone interested in quickly understanding the key takeaways from YouTube videos.

**4. Functional Requirements**

**4.1. Video Link Input & Validation**

*   **FR1.1 Paste Link:** Users must be able to paste a YouTube video URL directly into a designated text input field on the main screen.
*   **FR1.2 Share-to-App:** Users must be able to share a YouTube video link directly from the native YouTube application (iOS/Android) or web browser into this app, triggering the summarization process.
*   **FR1.3 Client-Side Validation:** The app must perform initial client-side validation on the input URL. This validation should strictly check if the domain is either `youtube.com` or `youtu.be`. Invalid formats should trigger user-friendly error feedback.
*   **FR1.4 Backend Validation:** The backend must perform comprehensive validation of the YouTube link using `ytdlp-nodejs` to ensure it's a valid, accessible video link before proceeding.

**4.2. Summary Generation**

*   **FR2.1 Trigger Generation:** Upon successful validation of a YouTube link (either pasted or shared), the user can initiate the summary generation process (e.g., via a "Summarize" button).
*   **FR2.2 Backend Processing:** The frontend sends the validated YouTube link to the backend (Express.js).
    *   The backend uses `ytdlp-nodejs` to attempt fetching the video transcript/captions.
    *   If transcripts are unavailable, the backend informs the frontend, which then notifies the user (See FR8.2).
    *   If transcripts are available, the backend sends the transcript data to the Gemini 2.0 Flash-Lite API, requesting a summary based on the user's selected type and length settings.
*   **FR2.3 Summary Type Selection:**
    *   Users must be able to select the desired summary type: "Brief", "Detailed", or "Key Point".
    *   The default summary type must be "Brief".
    *   The selected type must be sent to the backend to guide the Gemini API request.
    *   Selection should be possible before initiating generation and via the "Edit" functionality (FR4.5).
*   **FR2.4 Summary Length Selection:**
    *   Users must be able to select the desired summary length: "Short", "Medium", or "Long".
    *   The default summary length must be "Medium".
    *   The selected length must be sent to the backend to guide the Gemini API request.
    *   Selection should be possible before initiating generation and via the "Edit" functionality (FR4.5).
*   **FR2.5 Metadata Fetching:**
    *   The backend must attempt to fetch the video's Title and Thumbnail URL using `ytdlp-nodejs` concurrently or prior to summary generation.
    *   Failure to retrieve Title or Thumbnail must *not* block or fail the summary generation process. Default placeholders or indication of missing data should be used on the frontend if necessary.
*   **FR2.6 Generation Progress:** The UI must indicate that summary generation is in progress (e.g., loading spinner, progress message).
*   **FR2.7 Cancel Generation:** Users must have a clear way to cancel a summary generation request while it is in progress. This action should stop the backend process if possible and revert the UI state.

**4.3. Summary Storage**

*   **FR3.1 Persistent Storage:** Successfully generated summaries, along with associated metadata (Video URL, Video ID, Title (if available), Thumbnail URL (if available), Summary Text, Summary Type, Summary Length, Generation Timestamp), must be stored persistently in the MongoDB database.
*   **FR3.2 Data Association:** Stored data should be associated with the user (if authentication is implemented in the future) or device locally if no user accounts are planned for v1.0. For this PRD, assume storage is local/device-based or tied to a unique identifier unless user accounts are added later.

**4.4. Summary Display**

*   **FR4.1 Card Format:** Generated summaries must be displayed in a visually distinct card format.
*   **FR4.2 Card Content:** Each summary card must display:
    *   Video Title (or placeholder if unavailable)
    *   Video Thumbnail (or placeholder if unavailable)
    *   Summary Text (formatted using Markdown)
    *   Summary Type (e.g., "Type: Brief")
    *   Summary Length (e.g., "Length: Medium")
    *   "Read Aloud" Button
    *   "Share" Button
    *   "Delete" Button
    *   "Edit" Button
*   **FR4.3 Markdown Rendering:** The summary text must be rendered correctly from its Markdown format (e.g., supporting headings, lists, bold, italics).
*   **FR4.4 Immediate Display:** Upon successful generation, the new summary card should be displayed prominently to the user, potentially replacing the input view or appearing at the top of a results/history list.
*   **FR4.5 Edit Functionality:** The "Edit" button on a summary card must allow the user to change the Summary Type and Summary Length for *that specific video*. Selecting new options and confirming should trigger a *new* summary generation request to the backend using the original video link and the newly selected parameters. The updated summary will replace the previous one or be stored as a new entry linked to the original video (TBD based on desired UX - Recommendation: Replace the existing entry).

**4.5. Text-to-Speech (TTS)**

*   **FR5.1 Read Aloud Trigger:** A "Read Aloud" button must be present on every summary card. Tapping this button initiates TTS playback of the Summary Text.
*   **FR5.2 Playback Controls:** Basic playback controls (Play/Pause, Stop) must be available once TTS starts.
*   **FR5.3 Availability:** TTS functionality must be available for all summary types (Brief, Detailed, Key Point) and lengths (Short, Medium, Long).
*   **FR5.4 Speed Control:** Users must be able to adjust the TTS playback speed.
    *   Speed adjustment must be available via the Settings screen (FR7.1).
    *   The speed range should allow adjustments up to 16x the normal speed (consider practical upper limits like 2x, 3x, 4x first, ensure 16x is technically feasible and usable before committing). *Clarification: Let's aim for standard ranges first, e.g., 0.5x to 4x, and specify 16x as a target if feasible.* Provide discrete steps or a slider.
*   **FR5.5 Pitch Control:** Users must be able to adjust the TTS playback pitch via the Settings screen (FR7.1). Provide discrete steps or a slider.
*   **FR5.6 Voice Selection:** Users must be able to select from available TTS voices (system-provided or bundled) via the Settings screen (FR7.1). The app should list available voices dynamically.
*   **FR5.7 Setting Persistence:** TTS settings (Speed, Pitch, Voice) must be saved locally on the device and persist across app sessions.

**4.6. History Management**

*   **FR6.1 History Screen:** The app must include a dedicated "History" screen accessible via navigation (e.g., bottom tab, hamburger menu).
*   **FR6.2 History List:** The History screen must display a list of all previously generated and saved summaries.
*   **FR6.3 List Item Display:** Each item in the history list must display the Video Thumbnail (or placeholder) and Video Title (or placeholder).
*   **FR6.4 Access Summary:** Tapping a history item must navigate the user to view the full summary card for that entry.
*   **FR6.5 Delete Summary:**
    *   Users must be able to delete individual summaries from the history. This action should be available from the summary card ("Delete" button).
    *   Consider adding swipe-to-delete functionality on the history list items as well.
    *   Deletion must remove the corresponding record from the MongoDB database.
*   **FR6.6 History Ordering:** History items should be displayed in reverse chronological order (most recent first).

**4.7. Settings**

*   **FR7.1 Settings Screen:** The app must include a dedicated "Settings" screen.
*   **FR7.2 TTS Configuration:** The Settings screen must provide controls for adjusting and saving TTS preferences:
    *   Playback Speed (Slider/Stepper, range 0.5x to 4x, target up to 16x if feasible)
    *   Playback Pitch (Slider/Stepper)
    *   Voice Selection (Dropdown/List of available voices)

**4.8. Sharing**

*   **FR8.1 Share Summary:** A "Share" button on the summary card must allow users to share the generated Summary Text (plain text format) using the native platform sharing capabilities. Optionally include the original video link in the shared content.

**4.9. PWA Functionality**

*   **FR9.1 Installable:** The web version of the app must be a Progressive Web App (PWA), allowing users to "install" it to their home screen on supported mobile and desktop devices.
*   **FR9.2 Offline Support:** Basic offline support should be implemented (e.g., app shell, viewing cached history if possible). Full offline summary generation is out of scope.
*   **FR9.3 Manifest & Service Worker:** A web app manifest file and a service worker must be implemented to enable PWA features.

**5. Non-Functional Requirements**

*   **NFR1. Performance:**
    *   The app must be responsive and performant on all target platforms (iOS, Android, Web).
    *   UI transitions should be smooth.
    *   Summary generation time should be minimized; provide clear feedback during processing.
    *   List scrolling (History) must be smooth even with a large number of entries.
*   **NFR2. Usability:**
    *   The app must have an intuitive and clean user interface.
    *   Navigation should be straightforward.
    *   Error messages must be clear and helpful.
    *   Provide clear visual feedback for user actions (button taps, loading states, success/error).
*   **NFR3. Reliability:**
    *   The app should handle network interruptions gracefully.
    *   Backend services should be reliable and handle errors robustly.
    *   Data stored in MongoDB must maintain integrity.
*   **NFR4. Maintainability:**
    *   The codebase must follow best practices for React Native, Expo, Node.js, and MongoDB.
    *   Code should be well-documented and organized into a modular structure (`frontend/`, `backend/`).
    *   Components should be reusable where applicable.
*   **NFR5. Compatibility:**
    *   The app must function correctly on supported versions of iOS, Android, and modern web browsers (Chrome, Firefox, Safari, Edge).
*   **NFR6. Security:**
    *   API keys (Gemini) must be securely stored on the backend and not exposed in the frontend code.
    *   Input sanitization should be performed on the backend to prevent potential injection attacks (though less critical with just URLs, still good practice).
    *   Communication between frontend and backend should ideally use HTTPS.

**6. Design & UX**

*   **UI6.1 Theme:** A consistent and clean visual theme should be applied throughout the app.
*   **UI6.2 Layout:** Responsive layout adapting to different screen sizes (mobile, tablet, web).
*   **UI6.3 Accessibility:** Consider accessibility guidelines (WCAG) for color contrast, font sizes, and screen reader compatibility, especially given the TTS feature.

**7. Technical Specifications**

*   **TS1. Frontend:**
    *   Framework/Platform: React Native with Expo SDK
    *   Language: JavaScript
    *   State Management: (Choose one: Context API, Redux Toolkit, Zustand, etc. - Specify based on team preference)
    *   Navigation: React Navigation
    *   TTS Implementation: `expo-speech` or a suitable alternative library.
    *   Markdown Rendering: `react-native-markdown-display` or similar.
*   **TS2. Backend:**
    *   Framework: Express.js
    *   Language: Node.js (JavaScript)
    *   Video Processing: `ytdlp-nodejs` (for link validation, metadata, transcript fetching)
    *   AI Integration: Google Gemini API (specifically targeting `gemini-2.0-flash-lite` if available, otherwise adjust to available models like `gemini-1.5-flash`) via official Node.js SDK or REST API calls.
*   **TS3. Database:**
    *   Type: NoSQL
    *   Provider: MongoDB (Self-hosted or Atlas)
*   **TS4. Hosting:** (Specify based on choice, e.g., Vercel/Netlify for Frontend/PWA, Heroku/AWS/GCP/Fly.io for Backend, MongoDB Atlas for DB).
*   **TS5. Project Structure:**
    *   Monorepo or separate repositories containing:
        *   `frontend/` (React Native Expo app)
        *   `backend/` (Express.js API)
    *   Shared types/interfaces if using a monorepo.

**8. Data Management & Schema**

*   **DM8.1 MongoDB Schema:** A collection (e.g., `summaries`) should store documents with fields like:
    *   `_id`: ObjectId (Primary Key)
    *   `videoId`: String (Extracted YouTube Video ID)
    *   `videoUrl`: String (Original YouTube URL)
    *   `title`: String (Optional, fetched video title)
    *   `thumbnailUrl`: String (Optional, fetched thumbnail URL)
    *   `summaryText`: String (Generated summary content)
    *   `summaryType`: String (Enum: "Brief", "Detailed", "Key Point")
    *   `summaryLength`: String (Enum: "Short", "Medium", "Long")
    *   `generatedAt`: ISODate (Timestamp of generation)
    *   `userId`: String/ObjectId (Optional, for future user accounts - can be device ID initially)
    *   *(Consider adding `transcriptFetched`: Boolean, `metadataFetched`: Boolean for debugging/tracking)*
*   **DM8.2 Data Flow:**
    1.  User inputs URL (Paste/Share).
    2.  Frontend performs basic validation.
    3.  Frontend sends URL, selected Type/Length to Backend.
    4.  Backend validates URL fully via `ytdlp-nodejs`.
    5.  Backend fetches Transcript & Metadata (Title/Thumbnail) via `ytdlp-nodejs`.
    6.  Backend calls Gemini API with transcript and Type/Length parameters.
    7.  Backend receives summary from Gemini.
    8.  Backend stores summary details + metadata in MongoDB.
    9.  Backend returns summary details + metadata to Frontend.
    10. Frontend displays the summary card.

**9. Error Handling & Edge Cases**

*   **EH9.1 Invalid YouTube Link:** Display clear error message on frontend after both client-side and backend validation failures.
*   **EH9.2 No Transcripts/Captions:** If `ytdlp-nodejs` cannot retrieve transcripts, the backend must inform the frontend. The frontend must display a user-friendly message like "Sorry, this video does not have transcripts or captions available, and cannot be summarized."
*   **EH9.3 Gemini API Errors:** Handle potential errors from the Gemini API (e.g., rate limits, content filtering, server errors) and display appropriate messages to the user.
*   **EH9.4 Network Errors:** Handle fetch/API call failures due to network issues (offline, unstable connection) gracefully. Allow retries where appropriate.
*   **EH9.5 `ytdlp-nodejs` Errors:** Handle errors during metadata/transcript fetching (e.g., video unavailable, region-locked, private).
*   **EH9.6 TTS Errors:** Handle errors during TTS initialization or playback (e.g., voice unavailable, engine error).
*   **EH9.7 Storage Errors:** Handle potential errors during communication with MongoDB.

**10. Success Metrics**

*   Number of successful summaries generated per day/week/month.
*   User retention rate.
*   App Store / Play Store ratings and reviews (if applicable).
*   PWA installation rate.
*   Frequency of TTS feature usage.
*   Frequency of summary sharing.
*   Average summary generation time.
*   Error rate (API errors, validation failures).

---
the following is the example code for the backend API endpoint to generate summaries using the Gemini 2.0 Flash-Lite model:

```javascriptconst {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [
  ],
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // TODO: Following code needs to be updated for client-side apps.
  const candidates = result.response.candidates;
  for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if(part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  console.log(result.response.text());
}

run();
```

the following is the example code for the backend API endpoint to get the video transcript using `ytdlp-nodejs`:

```javascript
const ytdlp = require("ytdlp-nodejs");

import { YtDlp } from 'ytdlp-nodejs';

const ytdlp = new YtDlp();

const info = await ytDlp.getInfoAsync(
    'https://www.youtube.com/watch?v=dU7GwCOgvNY'
  );

console.log(info);
```