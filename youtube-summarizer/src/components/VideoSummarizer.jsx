// Your summarizer component
const VideoSummarizer = () => {
  return (
    <div className="video-summarizer">
      <div className="summarizer-header">
        <h3>📝 AI Video Summarizer</h3>
      </div>
      <div className="summarizer-content">
        <p>Get an AI-powered summary of this video</p>
        <button className="summarize-btn">Generate Summary</button>
        <div className="summary-output">
          <p className="placeholder-text">
            Click the button to generate a summary
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSummarizer;
