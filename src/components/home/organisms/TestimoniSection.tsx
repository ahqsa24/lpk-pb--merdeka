import { useEffect, useState } from "react";
import { LineHeading } from "../../shared/molecules";
import { TestimoniBox } from "./TestimoniBox";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string | null;
  rating: number;
}

export const TestimoniSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/cms/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        <div className="mb-12 text-center">
          <LineHeading title="Kata Alumni Kami" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Dengar langsung dari mereka yang telah merasakan dampak positif dari program pelatihan kami.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Belum ada testimoni yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <TestimoniBox
                key={item.id}
                src={item.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100"}
                comment={item.content}
                title={item.name}
                description={item.role}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
