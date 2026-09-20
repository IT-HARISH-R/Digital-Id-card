export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
