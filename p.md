Okay, here is a Product Requirements Document (PRD) for the YouTube Video Summarizer React Native Expo App.

---

**Product Requirements Document: YouTube Summarizer Pro**

**Version:** 1.0
**Date:** May 21, 2024
**Author:** chirag127

**1. Introduction**

YouTube Summarizer Pro is a cross-platform application (iOS, Android, Web PWA) built with React Native Expo. It allows users to quickly generate concise, detailed, or key-point summaries of YouTube videos using Google's Gemini 2.0 Flash-Lite model. Users can input video links via pasting or direct sharing from the YouTube app. Generated summaries are stored persistently, displayed with video context (title, thumbnail), and can be read aloud using a highly customizable text-to-speech (TTS) engine. The app provides a history view for managing summaries and a settings panel for TTS preferences.

**2. Goals**

*   Provide users with a fast and efficient way to understand the content of YouTube videos without watching them entirely.
*   Generate accurate and relevant summaries using the Gemini 2.0 Flash-Lite AI model.
*   Offer accessible consumption of summaries through a flexible Text-to-Speech feature with speed, pitch, and voice controls.
*   Deliver a seamless user experience across iOS, Android, and the Web (as a Progressive Web App).
*   Enable easy management and sharing of generated summaries.
*   Ensure a robust and reliable service with clear error handling.

**3. Target Audience**

*   Students and Researchers needing quick insights from educational videos.
*   Busy Professionals looking to digest information from webinars, talks, or news clips efficiently.
*   Content Creators analyzing other videos or repurposing content.
*   Individuals with limited time who want to grasp the essence of long videos.
*   Users preferring auditory consumption of information.

**4. Features**

**4.1. Video Link Input & Validation**

*   **Paste Link:** Users can paste a valid YouTube video URL (`youtube.com/...` or `youtu.be/...`) into a dedicated text input field on the main screen.
*   **Share from YouTube App:** The app must register as a share target for URLs. Users sharing a YouTube link from the official YouTube app (or browser share function) should be able to select "YouTube Summarizer Pro" to directly initiate the summary process within the app.
*   **Client-Side URL Validation:** Implement initial, non-blocking validation on the frontend to check if the input string contains `youtube.com` or `youtu.be`. This provides immediate feedback but is not the definitive validation step. A loading indicator should show while backend validation is pending.
*   **Backend URL Validation:** The backend service (`ytdlp-nodejs`) will perform comprehensive validation to confirm it's a valid, accessible YouTube video link before proceeding.

**4.2. Summary Generation**

*   **Trigger:** Generation starts upon submission of a valid link (either pasted or shared).
*   **Backend Process:**
    *   The backend receives the validated YouTube URL.
    *   Uses `ytdlp-nodejs` to attempt fetching the video's transcript or captions.
    *   **Fallback (No Transcript):** If no transcript or captions are available, the backend immediately responds to the frontend, which must clearly inform the user that the video cannot be summarized due to lack of captions/transcripts.
    *   If transcripts are available, the backend prepares the text content.
    *   The backend sends the transcript content along with user-selected parameters (Type, Length) to the Gemini 2.0 Flash-Lite API for summarization.
    *   The backend receives the generated summary from Gemini.
    *   Uses `ytdlp-nodejs` to attempt fetching the video title and thumbnail URL. Fetching these is *desirable* for display but *not critical* for summary generation; the process should succeed even if title/thumbnail retrieval fails. Default placeholders or null values should be handled gracefully on the frontend.
    *   The backend stores the summary details (including link, title, thumbnail (if available), summary text, type, length) in the MongoDB database.
    *   The backend returns the complete summary data (or error state) to the frontend.
*   **User Controls (During Submission):**
    *   **Summary Type:** Users must be able to select the desired summary type before or during submission:
        *   `Brief` (Default)
        *   `Detailed`
        *   `Key Point`
    *   **Summary Length:** Users must be able to select the desired summary length:
        *   `Short`
        *   `Medium` (Default)
        *   `Long`
    *   These selections should be sent to the backend to influence the prompt sent to Gemini.
*   **Cancellation:** Users must have a clear way (e.g., a "Cancel" button) to abort an ongoing summary generation request. The frontend should signal the backend to stop processing (if possible, or at least discard the result upon return) and revert the UI from the loading state.
*   **Loading Indication:** The UI must clearly indicate when a summary generation is in progress.

**4.3. Summary Display**

*   **Card Format:** Summaries (both newly generated and viewed from history) must be displayed in a visually distinct card format containing:
    *   **Video Thumbnail:** Display the fetched thumbnail. Use a placeholder if unavailable.
    *   **Video Title:** Display the fetched title. Use "Title Unavailable" or the URL if unavailable.
    *   **Summary Text:** Display the generated summary text. This text must be parsed and rendered as Markdown (supporting basic formatting like bold, italics, lists, paragraphs).
    *   **Summary Type:** Clearly indicate the type used (Brief, Detailed, Key Point).
    *   **Summary Length:** Clearly indicate the length used (Short, Medium, Long).
    *   **Read Aloud Button:** A button to trigger TTS playback of the summary text.
    *   **Share Button:** A button to share the *generated summary text* (not the video link) using the native device sharing mechanism.
    *   **Delete Button:** A button to delete the summary from the history/database. Requires confirmation.
    *   **Edit Button:** A button that allows the user to change the Summary Type and Summary Length for the *currently viewed* video and regenerate the summary with the new parameters.

**4.4. Text-to-Speech (TTS)**

*   **Activation:** Initiated via the "Read Aloud" button on a summary card.
*   **Core Functionality:** Use `expo-speech` (or equivalent Expo module) to read the `Summary Text` aloud.
*   **Availability:** TTS functionality must be available for *all* summaries displayed in the app.
*   **Controls (Settings Screen):** A dedicated "Settings" screen must provide controls for:
    *   **Speed:** A slider or selector allowing adjustment from normal speed (1x) up to 16x. The range should allow fine-grained control (e.g., 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x, ... 16x). Default: 1x.
    *   **Pitch:** A slider or selector allowing adjustment of the speech pitch. Default: 1x.
    *   **Voice:** A selector allowing the user to choose from the available system voices provided by the OS/Expo module. The list of voices should be dynamically populated based on availability. Default: System Default Voice.
*   **Persistence:** TTS settings (Speed, Pitch, selected Voice) must be saved locally on the device and persist across app sessions.
*   **Playback Control:** Basic playback controls (Play/Pause, Stop) should be implicitly available (e.g., tapping Read Aloud again pauses/resumes, navigating away stops).

**4.5. History**

*   **History Screen:** A dedicated screen accessible via main navigation (e.g., Tab Bar, Drawer Menu) displaying a list of all previously generated and saved summaries.
*   **List Format:** The history should be displayed as a scrollable list. Each entry in the list must show:
    *   Video Thumbnail (Placeholder if unavailable)
    *   Video Title ("Title Unavailable" or URL if unavailable)
*   **Navigation:** Tapping a history list item navigates the user to the full Summary Card view for that specific entry.
*   **Deletion:** Users must be able to delete individual summary entries directly from the history list (e.g., via a swipe action or a delete icon per item) or via the Delete button on the Summary Card view. Deletion requires confirmation and removes the entry permanently from MongoDB.

**4.6. Settings**

*   A dedicated "Settings" screen accessible via main navigation.
*   Contains controls for TTS adjustments (Speed, Pitch, Voice) as described in section 4.4.

**4.7. Cross-Platform Compatibility & PWA**

*   **iOS & Android:** The app must function correctly and provide a native look-and-feel on both platforms using React Native Expo.
*   **Web (PWA):** The app must be buildable as a Progressive Web App.
    *   It should run correctly in modern web browsers.
    *   It must include a web manifest file and service worker (configured via Expo) to allow users to "Install" or "Add to Home Screen".
    *   Ensure responsive design for various screen sizes on the web.

**4.8. Source Link Access**

*   Provide a way for the user to easily access the original YouTube video link associated with a summary. This should be implemented via the main application navigation menu (e.g., a "Source Links" or "Video Links" section in the Drawer/Hamburger menu) which lists the unique YouTube URLs stored in the history. Clicking a link could potentially navigate back to the corresponding summary in the history screen/view.

**5. User Interface (UI) / User Experience (UX)**

*   **Navigation:** Implement intuitive navigation (e.g., Tab Navigator for Home/Input, History, Settings).
*   **Visual Design:** Clean, modern, and user-friendly interface. Consistent design language across platforms.
*   **Feedback:** Provide clear visual feedback for user actions (button presses, loading states, success messages, error messages).
*   **Markdown Rendering:** Ensure summary text is rendered correctly and legibly according to Markdown rules.
*   **Performance:** Smooth transitions, fast loading times, responsive interactions.

**6. Technical Requirements**

*   **Frontend:**
    *   Framework/Platform: React Native Expo (using JavaScript/TypeScript)
    *   Navigation: Expo Router (or React Navigation)
    *   State Management: Context API / Zustand / Redux Toolkit (Choose one)
    *   TTS: `expo-speech` module
    *   Markdown Rendering: `react-native-markdown-display` or similar
    *   API Client: Axios or Fetch API
    *   PWA Configuration: Expo PWA setup (`app.json`, web build configurations)
    *   Share Target: Configuration via Expo plugins or native module configuration if necessary (`expo-share-intent-android`, iOS URL Schemes/App Group setup).
*   **Backend:**
    *   Framework: Node.js + Express.js
    *   YouTube Interaction: `ytdlp-nodejs` library (for link validation, transcript/caption fetching, title/thumbnail retrieval).
    *   AI Integration: Official Google AI Gemini SDK/Client Library for Node.js (using Gemini 2.0 Flash-Lite model).
    *   Database ORM/Driver: Mongoose (recommended for schema definition) or the native `mongodb` driver.
*   **Database:**
    *   MongoDB (Self-hosted or Cloud Service like MongoDB Atlas).
*   **Project Structure:**
    *   Monorepo or separate folders:
        ```
        /project-root
        ├── frontend/  # React Native Expo App
        │   ├── src/
        │   │   ├── components/
        │   │   ├── screens/
        │   │   ├── navigation/
        │   │   ├── services/    # API calls
        │   │   ├── hooks/
        │   │   ├── store/       # State management
        │   │   ├── assets/
        │   │   └── ...
        │   ├── app.json
        │   └── package.json
        ├── backend/   # Express.js Backend
        │   ├── src/
        │   │   ├── controllers/ # Request/Response handling
        │   │   ├── routes/      # API endpoint definitions
        │   │   ├── services/    # Business logic (ytdl, gemini calls)
        │   │   ├── models/      # Database schemas (Mongoose)
        │   │   ├── middleware/  # e.g., error handling, validation
        │   │   └── config/      # DB connection, API keys
        │   ├── server.js    # Entry point
        │   └── package.json
        └── ...
        ```
    *   Emphasis on modularity within both frontend and backend folders. Reusable components, services, and clear separation of concerns.
*   **API Endpoints (Example):**
    *   `POST /api/summarize`: Input { youtubeUrl, summaryType, summaryLength }, Output { summaryData } or { error }
    *   `GET /api/history`: Output { [summaryMetadataList] } (Metadata: id, title, thumbnail)
    *   `GET /api/summary/:id`: Output { fullSummaryData }
    *   `DELETE /api/summary/:id`: Output { success } or { error }
    *   `PUT /api/summary/:id`: Input { summaryType, summaryLength }, triggers regeneration, Output { updatedSummaryData } or { error }
    *   `POST /api/summarize/cancel/:jobId` (Optional, advanced: Requires managing generation jobs) or simpler client-side cancellation logic.

**7. Data Management**

*   **Storage:** MongoDB.
*   **Collection:** `summaries`
*   **Schema (`Summaries`):**
    *   `_id`: ObjectId (Primary Key)
    *   `userId`: String (Optional placeholder for future user accounts, can be device ID initially if needed for scoping, or null)
    *   `youtubeUrl`: String (Indexed, Unique constraint might be useful per user if accounts are added)
    *   `videoTitle`: String (Nullable)
    *   `videoThumbnailUrl`: String (Nullable)
    *   `summaryText`: String (The generated summary content in Markdown)
    *   `summaryType`: String (Enum: 'Brief', 'Detailed', 'Key Point')
    *   `summaryLength`: String (Enum: 'Short', 'Medium', 'Long')
    *   `isProcessing`: Boolean (Optional: useful for tracking active jobs)
    *   `errorState`: String (Nullable: Stores error message if generation failed, e.g., 'NO_TRANSCRIPT')
    *   `createdAt`: Date (Timestamp)
    *   `updatedAt`: Date (Timestamp)
*   **Data Privacy:** No collection of personal user data beyond what's essential for functionality (potentially device ID for anonymous history scoping if not using accounts). API keys (Gemini) must be kept secure on the backend.

**8. Non-Functional Requirements**

*   **Performance:**
    *   Fast app startup time.
    *   Responsive UI, especially during scrolling and interactions.
    *   Minimize delay in summary generation (dependent on transcript length and Gemini API response time). Optimize backend processing.
    *   Efficient database queries.
*   **Reliability:**
    *   Graceful handling of API errors (Gemini, YouTube).
    *   Robust error handling for network issues.
    *   App should not crash on invalid input or unexpected data.
*   **Scalability:** Backend should be designed to handle a reasonable number of concurrent users (consider serverless functions or container orchestration if high scale is anticipated). Be mindful of Gemini API rate limits.
*   **Security:** Secure storage of API keys (backend environment variables). Protect against common web vulnerabilities (if applicable to backend APIs). No sensitive user data stored unnecessarily.
*   **Maintainability:** Clean, well-documented code. Modular architecture. Use of linters and formatters.
*   **Accessibility (A11y):** Ensure UI elements are accessible (proper labels for screen readers, sufficient color contrast, touch target sizes). TTS is a key accessibility feature.

**9. Error Handling & Edge Cases**

*   **Invalid URL (Client/Server):** Clear message to the user.
*   **Video Not Found/Private:** Inform user the video is inaccessible.
*   **No Transcripts:** Inform user summarization is not possible.
*   **`ytdlp-nodejs` Failure:** Log error on backend, inform user of a generic failure.
*   **Gemini API Error:** Handle rate limits, content filtering errors, timeouts, and other API exceptions. Inform user summary generation failed.
*   **Network Connectivity:** Detect offline status, handle request failures gracefully, potentially allow retries.
*   **Database Errors:** Log errors, ensure app stability, maybe show cached data if available.
*   **TTS Engine Failure:** Inform user TTS is unavailable.
*   **Storage Full (Device):** Handle potential errors when saving settings or offline data.
*   **Long Transcripts/Summaries:** Ensure performance doesn't degrade significantly. Consider potential timeouts or length limits if necessary.

**10. Release Criteria**

*   All features listed in Section 4 are implemented and functional.
*   The application runs stably on target platforms (iOS, Android, Web PWA).
*   Comprehensive testing completed: Unit tests, Integration tests (Frontend-Backend), End-to-End tests covering all major user flows.
*   Performance targets (startup time, UI responsiveness, summary generation time) are met.
*   All major bugs identified during testing are resolved.
*   UI/UX is polished and meets design specifications.
*   Documentation (Code comments, READMEs) is adequate.

**11. Open Issues / Questions**

*   (None currently - This PRD assumes all initial questions are resolved by the requirements above).

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