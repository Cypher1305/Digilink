/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';

const BientotDisponible = () => {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white rounded-lg shadow-xl p-6 text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    🚀 Bientôt Disponible sur Mobile ! 📱
                </h1>
                <p className="text-gray-600 mb-6">
                    Cette fonctionnalité de notre application sera bientôt disponible en version mobile sur <strong>Play Store</strong> et <strong>App Store</strong>.
                </p>
                <p className="text-gray-700 mb-6">
                    Inscrivez-vous dès maintenant sur notre plateforme pour recevoir toutes les mises à jour et être parmi les premiers à tester cette fonctionnalité.
                </p>
                <a 
                    href="#"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    S'inscrire maintenant
                </a>
                <div className="mt-6">
                    <button 
                        onClick={goBack}
                        className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                        ⬅️ Retour
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BientotDisponible;
