interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}