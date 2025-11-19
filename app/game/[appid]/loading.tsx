export default function LoadingGameDetail() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p>Memuat detail game...</p>
    </div>
  );
}


