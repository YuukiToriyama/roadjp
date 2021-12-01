import fs from 'fs/promises';
import { parse, load } from '@loaders.gl/core';
import { ZipLoader } from '@loaders.gl/zip';
import { ShapefileLoader } from '@loaders.gl/shapefile';
import '@loaders.gl/polyfills';

export type Feature = {
	type: "Feature"
	geometry: {
		type: string
		coordinates: [number, number][]
	}
	properties: Record<string, string>
}
export type GeoJson = {
	type: "FeatureCollection"
	features: Feature[]
}

export const loadMlitData = async (prefNumber: string): Promise<Feature[]> => {
	// tmpディレクトリを作成
	await fs.mkdir("./tmp").catch(error => {
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
	// shp -> geojson features
	const data = await load(`./tmp/${shapefileName}`, ShapefileLoader);
	return data.data as Feature[];
};

export const classifyFeatures = (features: Feature[]) => {
	const roads: Record<string, Feature[]> = {
		"1": [],
		"2": [],
		"3": [],
		"4": [],
		"5": [],
		"6": [],
		"7": []
	}
	features.forEach(feature => {
		feature.properties["description"] = feature.properties["N01_001"];
		switch (feature.properties["N01_001"]) {
			case "1": {
				roads["1"].push(feature);
				break;
			}
			case "2": {
				roads["2"].push(feature);
				break;
			}
			case "3": {
				roads["3"].push(feature);
				break;
			}
			case "4": {
				roads["4"].push(feature);
				break;
			}
			case "5": {
				roads["5"].push(feature);
				break;
			}
			case "6": {
				roads["6"].push(feature);
				break;
			}
			case "7": {
				roads["7"].push(feature);
				break;
			}
		}
	});
	return roads;
}