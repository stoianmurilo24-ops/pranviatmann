import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const archivePath = path.resolve("site-fotos.zip");
const outputRoot = path.resolve("public/images");

if (!fs.existsSync(archivePath)) {
  console.warn("[galeria] site-fotos.zip não encontrado. As imagens serão adicionadas quando o pacote for colocado na raiz do projeto.");
  process.exit(0);
}

const archive = fs.readFileSync(archivePath);
const eocdSignature = 0x06054b50;
let eocdOffset = -1;
const searchStart = Math.max(0, archive.length - 22 - 0xffff);

for (let offset = archive.length - 22; offset >= searchStart; offset -= 1) {
  if (archive.readUInt32LE(offset) === eocdSignature) {
    eocdOffset = offset;
    break;
  }
}

if (eocdOffset < 0) {
  throw new Error("site-fotos.zip inválido: registro final ZIP não encontrado.");
}

const entryCount = archive.readUInt16LE(eocdOffset + 10);
let cursor = archive.readUInt32LE(eocdOffset + 16);
const centralSignature = 0x02014b50;
const localSignature = 0x04034b50;
let extracted = 0;

for (let entry = 0; entry < entryCount; entry += 1) {
  if (archive.readUInt32LE(cursor) !== centralSignature) {
    throw new Error("site-fotos.zip inválido: diretório central corrompido.");
  }

  const method = archive.readUInt16LE(cursor + 10);
  const compressedSize = archive.readUInt32LE(cursor + 20);
  const uncompressedSize = archive.readUInt32LE(cursor + 24);
  const nameLength = archive.readUInt16LE(cursor + 28);
  const extraLength = archive.readUInt16LE(cursor + 30);
  const commentLength = archive.readUInt16LE(cursor + 32);
  const localOffset = archive.readUInt32LE(cursor + 42);
  const name = archive.toString("utf8", cursor + 46, cursor + 46 + nameLength);
  cursor += 46 + nameLength + extraLength + commentLength;

  if (name.endsWith("/")) continue;
  if (!name.startsWith("servicos/") && !name.startsWith("galeria/")) {
    throw new Error(`Caminho inesperado no pacote de fotos: ${name}`);
  }
  if (name.includes("..") || path.isAbsolute(name)) {
    throw new Error(`Caminho inseguro no pacote de fotos: ${name}`);
  }
  if (archive.readUInt32LE(localOffset) !== localSignature) {
    throw new Error(`Arquivo ZIP local inválido: ${name}`);
  }

  const localNameLength = archive.readUInt16LE(localOffset + 26);
  const localExtraLength = archive.readUInt16LE(localOffset + 28);
  const dataStart = localOffset + 30 + localNameLength + localExtraLength;
  const compressed = archive.subarray(dataStart, dataStart + compressedSize);
  let contents;

  if (method === 0) {
    contents = Buffer.from(compressed);
  } else if (method === 8) {
    contents = zlib.inflateRawSync(compressed);
  } else {
    throw new Error(`Método de compactação ZIP não suportado para ${name}: ${method}`);
  }

  if (contents.length !== uncompressedSize) {
    throw new Error(`Tamanho inválido ao extrair ${name}`);
  }

  const destination = path.resolve(outputRoot, name);
  if (!destination.startsWith(outputRoot + path.sep)) {
    throw new Error(`Destino fora da pasta de imagens: ${name}`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
  extracted += 1;
}

console.log(`[galeria] ${extracted} fotos extraídas para public/images.`);
