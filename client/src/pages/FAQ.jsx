import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Comment puis-je ajouter une entreprise ?",
      answer: "Vous pouvez ajouter une entreprise en vous connectant à votre compte, puis en accédant à la section 'Ajouter une entreprise'. Remplissez les informations requises et soumettez le formulaire. Nous vous enverrons un mail avec des instructions afin que puissiez avoir vos accès.",
    },
    {
      question: "Comment puis-je me procurer une carte DIGILINK ?",
      answer: "Pour avoir une carte de viste digitale, accédez à la page de gestion de compte puis dans les options d'exportation cliquez sur 'Commander carte'. Apportez les informations nécessaires et confirmez la commande.",
    },
    {
      question: "Comment puis-je supprimer une carte ?",
      answer: "Pour supprimer votre entreprise, connectez-vous à votre compte, accédez à la page de l'entreprise, puis cliquez sur 'Supprimer'. Confirmez la suppression pour finaliser l'opération.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8 mt-3 text-center">Foire aux Questions (FAQ)</h1>
      <div className="space-y-4 mt-5">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-xl font-semibold text-green-500 mb-2 flex justify-between items-center">
              {faq.question}
              <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </h3>
            <p className={`text-gray-600 mt-2 transition-max-height duration-300 overflow-hidden ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
