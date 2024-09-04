import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ companyId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifier si l'utilisateur est connecté
      const response = await axios.get('/userinfo');
      if (!response.data.email) {
        navigate('/login'); // Redirige si l'utilisateur n'est pas connecté
        return;
      }

      // Si l'utilisateur est connecté, envoyer l'avis
      await axios.post('/reviews', {
        companyId,
        userEmail: response.data.email,
        rating,
        comment,
      });
      alert('Avis ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
      alert('Erreur lors de l\'ajout de l\'avis');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-1 p-4 border rounded-lg bg-white py-9">
    <h3 className="text-xl font-semibold text-yellow-500 mb-4">Laissez un avis</h3>
       <div className="mb-4">
        <div className="inline-flex items-center justify-center space-x-1 ">
          {[1, 2, 3, 4, 5].map((n) => (
            <svg
              key={n}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={n <= rating ? 'orange' : 'gray'}
              className={`w-8 h-8 cursor-pointer transition-colors duration-300${
                n <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
              onClick={() => setRating(n)}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.27L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          ))}
        </div>
      </div>
      <div>
        <textarea
          id="comment"
          value={comment}
          placeholder='Commentez ici'
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-lg">
        Envoyer
      </button>
    </form>
  );
};

export default ReviewForm;
