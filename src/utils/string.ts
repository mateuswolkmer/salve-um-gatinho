// Function to trim, escape unsafe characters, and enforce a maximum length
export const sanitize = (input: string, maxLength: number): string => {
  const trimmed = input.trim();
  const escaped = trimmed.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case `"`:
        return "&quot;";
      case "'":
        return "&#x27;";
      default:
        return char;
    }
  });
  return escaped.slice(0, maxLength);
};
