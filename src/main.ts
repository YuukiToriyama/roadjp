import fs from 'fs/promises';
import { parse, load } from '@loaders.gl/core';
import { ZipLoader } from '@loaders.gl/zip';
import { ShapefileLoader } from '@loaders.gl/shapefile';
import '@loaders.gl/polyfills';

const convertMiltData = async (prefNumber: string, outDir: string) => {
	// tmpディレクトリを作成
	await fs.mkdir("./tmp").catch(error => {
		return true
	});
	// outDirを作成
	await fs.mkdir(outDir).catch(error => {
		return true
	});
	// 国土数値情報から各都道府県の道路情報をダウンロード
	const url = `https://nlftp.mlit.go.jp/ksj/gmlold/data/N01/N01-07L/N01-07L-${prefNumber}-01.0a_GML.zip`;
	const arrayBuffer = await fetch(url).then(response => {
		return response.arrayBuffer();
	});
	// zipの解凍
	const unzipped = await parse(arrayBuffer, ZipLoader);
	const fileNameList = Object.keys(unzipped);
	for (const filename of fileNameList) {
		await fs.writeFile(`./tmp/${filename}`, Buffer.from(unzipped[filename]));
	}
	const shapefileName = fileNameList.find(filename => filename.match(/.shp$/));
	// 文字コードの指定
	await fs.writeFile(`./tmp/${shapefileName.replace(/.shp$/, "")}.cpg`, "Shift-JIS");
	// shp -> geojson
	const data = await load(`./tmp/${shapefileName}`, ShapefileLoader);
	const geojson = {
		"type": "FeatureCollection",
		"features": data.data
	};
	// jsonとして書き出し
	fs.writeFile(`./${outDir}/${prefNumber}.geojson`, JSON.stringify(geojson, null, "\t"));
};

for (let i = 46; i <= 47; i++) {
	const prefNumber = i.toString().padStart(2, "0");
	convertMiltData(prefNumber, "data");
}
