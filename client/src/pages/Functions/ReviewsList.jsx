/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000' : 'http://192.168.1.3:5000';

const ReviewsList = ({ companyId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculer le nombre total d'avis et la répartition par note
  const calculateReviewStats = (reviews) => {
    const totalReviews = reviews.length;
    const ratingsCount = [0, 0, 0, 0, 0]; // Pour 1 à 5 étoiles

    reviews.forEach(review => {
      if (review.RATING >= 1 && review.RATING <= 5) {
        ratingsCount[review.RATING - 1]++;
      }
    });

    return { totalReviews, ratingsCount };
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/reviews/${companyId}`);
      setReviews(response.data); // Mettre à jour l'état avec les données récupérées
    } catch (err) {
      setError('Erreur lors du chargement des avis');
      console.error('Erreur lors du chargement des avis:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [companyId]);

  const { totalReviews, ratingsCount } = calculateReviewStats(reviews);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='space-y-4 mt-8 p-4 border rounded-lg bg-white py-9'>
      <h2 className="text-xl font-semibold text-yellow-500 mb-4">Résumé des Avis</h2>
      <div className="space-y-2">
        {ratingsCount.map((count, index) => (
          <div key={index} className="flex items-center">
            <span className={`w-6 h-6 flex items-center justify-center bg-yellow-${(index + 1) * 100} text-white rounded-full`}>
              {index + 1}⭐
            </span>
            <span className="ml-2">{count} avis</span>
            <div className="flex-1 h-4 ml-4 bg-gray-200 rounded">
              <div
                className={`h-full bg-yellow-${(index + 1) * 100} rounded`}
                style={{ width: `${(count / totalReviews) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {reviews.length === 0 ? (
        <p>Aucun avis trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map(review => (
            <li key={review.ID_REVIEW} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <strong>Utilisateur vérifié</strong>
                <span className="text-green-500 font-semibold">
                  {review.RATING} {review.RATING === 1 ? 'étoile' : 'étoiles'}
                </span>
              </div>
              <p>{review.COMMENT}</p>
              <small className="text-gray-500">Posté le {new Date(review.CREATED_AT).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsList;
