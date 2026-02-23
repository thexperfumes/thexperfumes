import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(`[${this.props.appName} Error]:`, error, info);
    // Optional: send to Sentry or logging service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          {this.props.appName} crashed, but the other side is safe.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
