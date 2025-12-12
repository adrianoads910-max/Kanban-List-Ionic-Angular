const fs = require('fs');
const path = require('path');

// Caminho do diretório
const dirPath = './src/environments';

// Caminhos dos arquivos (Vamos criar os dois!)
const prodPath = './src/environments/environment.prod.ts';
const devPath = './src/environments/environment.ts';

// Conteúdo do arquivo (usaremos o mesmo para ambos no build da Vercel)
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

// 1. Cria a pasta se não existir
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Diretório ${dirPath} criado!`);
}

// 2. Cria o arquivo de PRODUÇÃO
fs.writeFile(prodPath, envConfigFile, function (err) {
  if (err) { console.log(err); } 
  else { console.log(`Arquivo ${prodPath} gerado com sucesso!`); }
});

// 3. Cria o arquivo de DESENVOLVIMENTO (Cópia para enganar o Angular)
fs.writeFile(devPath, envConfigFile, function (err) {
  if (err) { console.log(err); } 
  else { console.log(`Arquivo ${devPath} gerado com sucesso!`); }
});