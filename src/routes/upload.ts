import { Router } from "express";
import * as path from "path";
import * as fs from "fs";
import { UploadedFile } from "express-fileupload";

export const uploadRouter = Router();

uploadRouter.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(404).send("Nenhum arquivo recebido");
  }

  const nomesArquivos = Object.keys(req.files);
  const diretorio = path.join(__dirname, "..", "..", "arquivos");
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio);
  }

  nomesArquivos.forEach((arquivo) => {
    const objArquivo = req.files![arquivo];
    if (!objArquivo) {
      console.error(`Arquivo '${arquivo}' não encontrado na requisição`);
      return res.status(500).send("Erro no upload do arquivo");
    }

    if (Array.isArray(objArquivo)) {
      objArquivo.forEach((file: UploadedFile) => {
        const nomeArquivo = file.name;
        const conteudoArquivo = file.data;
        const caminhoArquivo = path.join(diretorio, nomeArquivo);
        fs.writeFileSync(caminhoArquivo, conteudoArquivo);
      });
    } else {
      const nomeArquivo = objArquivo.name;
      const conteudoArquivo = objArquivo.data;
      const caminhoArquivo = path.join(diretorio, nomeArquivo);
      fs.writeFileSync(caminhoArquivo, conteudoArquivo);
    }
  });

  res.status(200).send("Arquivos recebidos e salvos com sucesso");
  res.end();
});
