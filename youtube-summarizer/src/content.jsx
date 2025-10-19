import { createRoot } from "react-dom/client";
import "./content.css";
import VideoSummarizer from "./components/VideoSummarizer";

// Function to inject the summarizer
const injectSummarizer = () => {
  // YouTube's secondary column selector
  const secondaryColumn = document.querySelector("#secondary");

  if (secondaryColumn) {
    // Create container for our extension
    const container = document.createElement("div");
    container.id = "youtube-summarizer-container";

    // Insert at the top of the secondary column
    secondaryColumn.insertBefore(container, secondaryColumn.firstChild);

    // Render React component
    const root = createRoot(container);
    root.render(<VideoSummarizer />);

    console.log("YouTube Summarizer injected successfully!");
  } else {
    console.log("Secondary column not found, retrying...");
    // Retry after a short delay if the element isn't loaded yet
    setTimeout(injectSummarizer, 1000);
  }
};

// Wait for page to load, then inject
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectSummarizer);
} else {
  injectSummarizer();
}

// Handle YouTube's single-page app navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    // Remove old instance if it exists
    const oldContainer = document.querySelector(
      "#youtube-summarizer-container"
    );
    if (oldContainer) {
      oldContainer.remove();
    }
    // Inject new instance
    setTimeout(injectSummarizer, 500);
  }
}).observe(document.body, { subtree: true, childList: true });
