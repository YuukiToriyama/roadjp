import fs from 'fs/promises';
import { parse, load } from '@loaders.gl/core';
import { ZipLoader } from '@loaders.gl/zip';
import { ShapefileLoader } from '@loaders.gl/shapefile';
import '@loaders.gl/polyfills';

type Feature = {
	type: "Feature"
	geometry: {
		type: string
		coordinates: [number, number][]
	}
	properties: Record<string, string>
}
type GeoJson = {
	type: "FeatureCollection"
	features: Feature[]
}

const loadMlitData = async (prefNumber: string): Promise<Feature[]> => {
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

const classifyFeatures = (features: Feature[]) => {
	const roads1: Feature[] = [];
	const roads2: Feature[] = [];
	const roads3: Feature[] = [];
	const roads4: Feature[] = [];
	const roads5: Feature[] = [];
	const roads6: Feature[] = [];
	features.forEach(feature => {
		feature.properties["description"] = feature.properties["N01_001"];
		switch (feature.properties["N01_001"]) {
			case "1": {
				feature.properties["stroke"] = "#ff7f7f";
				feature.properties["stroke-width"] = "3";
				roads1.push(feature);
			}
			case "2": {
				feature.properties["stroke"] = "#ffbf7f";
				feature.properties["stroke-width"] = "2";
				roads2.push(feature);
			}
			case "3": {
				feature.properties["stroke"] = "#ffff7f";
				feature.properties["stroke-width"] = "2";
				roads3.push(feature);
			}
			case "4": {
				feature.properties["stroke"] = "#ffffa3";
				feature.properties["stroke-width"] = "2";
				roads4.push(feature);
			}
			case "5": {
				feature.properties["stroke"] = "#ffffb7";
				feature.properties["stroke-width"] = "1";
				roads5.push(feature);
			}
			case "6": {
				feature.properties["stroke"] = "#ffffcc";
				feature.properties["stroke-width"] = "1";
				roads6.push(feature);
			}
		}
	});
	return {
		"1": roads1,
		"2": roads2,
		"3": roads3,
		"4": roads4,
		"5": roads5,
		"6": roads6
	}
}

// outDirを作成
const outDir = "data";
fs.mkdir(outDir).catch(error => {
	return true;
}).then(async () => {
	for (let i = 26; i <= 29; i++) {
		const prefNumber = i.toString().padStart(2, "0");
		await fs.mkdir(`${outDir}/${prefNumber}`).catch(error => {
			return true;
		});
		const features = await loadMlitData(prefNumber);
		const classifiedFearures = classifyFeatures(features);
		Object.keys(classifiedFearures).forEach(key => {
			const geojson: GeoJson = {
				type: "FeatureCollection",
				features: classifiedFearures[key]
			}
			fs.writeFile(`${outDir}/${prefNumber}/${key}.geojson`, JSON.stringify(geojson, null, "\t"));
		});
	}
});