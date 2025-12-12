const fs = require('fs');
const path = require('path');

// Caminho do diretório e do arquivo
const dirPath = './src/environments';
const targetPath = './src/environments/environment.prod.ts';

// Conteúdo do arquivo
const envConfigFile = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
  }
};
`;

// 1. Cria a pasta se ela não existir (O segredo está aqui!)
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Diretório ${dirPath} criado!`);
}

// 2. Cria o arquivo
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log('Erro ao criar arquivo:', err);
    throw err;
  } else {
    console.log(`Arquivo ${targetPath} gerado com sucesso!`);
  }
});