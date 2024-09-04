// utils.js (Frontend)
export const encodeCompanyName = (NAME) => {
  // Remplace les espaces par des underscores
  const cleanName = NAME.replace(/\s+/g, '_');
  return encodeURIComponent(cleanName);
};

export function decodeCompanyName(NAME) {
  // Nettoie les espaces encodés et les underscores
  let cleanedName = NAME.replace(/%20/g, ' ').replace(/_/g, ' ');
  // Nettoie les caractères spéciaux si nécessaire
  cleanedName = cleanedName.replace(/[^a-zA-Z0-9\s]/g, '');
  return cleanedName;
}

