/**
 * AuthGuard — no-op. Authentication removed. Always renders children.
 */
export default function AuthGuard({ children }) {
  return children;
}