import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewsContainer = styled.div`
  padding: 2rem 0;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ReviewCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
`;

const ReviewDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const Comment = styled.p`
  color: #333;
  line-height: 1.5;
`;

const AddReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Star = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.filled ? '#ffd700' : '#ddd'};
  font-size: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviews, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && rating > 0) {
      onAddReview({
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Utilisateur anonyme',
        rating,
        comment
      });
      setRating(0);
      setComment('');
    }
  };

  return (
    <ReviewsContainer>
      <Title>Avis clients</Title>
      
      {currentUser && (
        <AddReviewForm onSubmit={handleSubmit}>
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= rating}
                onClick={() => setRating(star)}
                type="button"
              >
                ★
              </Star>
            ))}
          </StarRating>
          
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience avec ce produit..."
            required
          />
          
          <SubmitButton type="submit" disabled={rating === 0}>
            Publier mon avis
          </SubmitButton>
        </AddReviewForm>
      )}

      <ReviewsList>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ReviewerName>{review.userName}</ReviewerName>
              <ReviewDate>
                {new Date(review.date).toLocaleDateString()}
              </ReviewDate>
            </ReviewHeader>
            <Rating>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Rating>
            <Comment>{review.comment}</Comment>
          </ReviewCard>
        ))}
      </ReviewsList>
    </ReviewsContainer>
  );
};

export default ProductReviews;
