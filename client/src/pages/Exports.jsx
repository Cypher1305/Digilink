import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useParams } from 'react-router-dom';
import { toPng } from 'html-to-image';

const Exports = ({ companies = [] }) => {
  const { id } = useParams();
  const company = companies.find(c => c.id === parseInt(id));

  if (!company) return <div>Entreprise non trouvée</div>;

  const pageUrl = `${window.location.origin}/company/${id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('Lien copié dans le presse-papier');
  };

  const exportImage = async () => {
    try {
      const node = document.getElementById('companyCard');
      if (node) {
        const dataUrl = await toPng(node);
        const link = document.createElement('a');
        link.download = `${company.name}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        console.error('Element with id "companyCard" not found');
      }
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div id="companyCard" className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">{company.name}</h1>
        <img src={company.imageUrl} alt={company.name} className="w-full h-80 object-cover rounded-lg mb-8" />
        <p className="text-gray-600 mb-4"><strong>Catégorie:</strong> {company.category}</p>
        <p className="text-gray-600 mb-4"><strong>Téléphone:</strong> {company.phone}</p>
        <p className="text-gray-600 mb-4"><strong>Adresse:</strong> {company.address}</p>
        <div className="mb-4">
          <QRCode value={pageUrl} />
        </div>
        <button onClick={copyToClipboard} className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded-lg">Copier le lien</button>
        <button onClick={exportImage} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Exporter en PNG</button>
      </div>
    </div>
  );
};

export default Exports;
