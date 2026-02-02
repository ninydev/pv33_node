
import { XimilarUploader } from '@/features/XimilarComponent/ui/XimilarUploader';

export default function XimilarPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Демонстрация Ximilar API</h1>
      <div className="max-w-4xl mx-auto">
        <XimilarUploader />
      </div>
    </div>
  );
}