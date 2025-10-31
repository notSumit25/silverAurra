"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            "h-4 w-4 " +
            (i <= Math.round(value) ? "fill-gold text-gold" : "text-gray-300")
          }
        />
      ))}
    </div>
  );
}

export function ReviewsSection({
  productId,
  reviews,
  averageRating,
  totalReviews,
}: {
  productId: string;
  reviews: (Review & { user?: Pick<User, "id" | "name"> })[];
  averageRating: number;
  totalReviews: number;
}) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      toast.success("Review submitted");
      // Simple client refresh
      window.location.reload();
    } catch (err) {
      toast.error((err as Error).message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-serif text-2xl font-bold">Customer Reviews</h2>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{averageRating.toFixed(1)}</span> / 5 •{" "}
          {totalReviews} reviews
        </div>
      </div>

      <div className="mb-6">
        <Stars value={averageRating} />
      </div>

      {user ? (
        <form onSubmit={onSubmit} className="mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm">Your rating:</label>
            <div className="inline-flex rounded-md border">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  className={`px-3 py-1 text-sm ${
                    i <= rating ? "text-gold" : "text-gray-400"
                  }`}
                >
                  <Star
                    className={i <= rating ? "h-4 w-4 fill-gold" : "h-4 w-4"}
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review (optional)"
            className="min-h-24 w-full rounded-md border p-3 text-sm focus:outline-none"
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      ) : (
        <p className="mb-8 text-sm text-muted-foreground">
          Please{" "}
          <a href="/sign-in" className="text-gold hover:underline">
            sign in
          </a>{" "}
          to write a review.
        </p>
      )}

      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="rounded-lg border p-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="font-medium">{r.user?.name || "Anonymous"}</div>
              <Stars value={r.rating} />
            </div>
            {r.comment && (
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            )}
            <div className="mt-2 text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
