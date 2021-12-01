import fs from 'fs/promises';
import path from 'path';
import { loadMlitData, classifyFeatures, GeoJson } from './main';
import ProgressBar from 'progress';

const mkdir = async (path: string) => {
	await fs.mkdir(path).catch(() => {
		return true;
	});
}

(async () => {
	// プログレスバーを準備
	const progressBar = new ProgressBar("processing...[:bar] (:current/:total)", { total: 47 });
	// データを出力するディレクトリを作成
	const outDir = "data";
	await mkdir(outDir);
	for (let i = 1; i <= 47; i++) {
		// 各都道府県ごとにディレクトリを作成
		const prefNumber = i.toString().padStart(2, "0");
		await mkdir(path.join(outDir, prefNumber));
		// データの読み込み
		const features = await loadMlitData(prefNumber);
		// データの分類
		const classifiedFearures = classifyFeatures(features);
		// GeoJSONの書き出し
		Object.keys(classifiedFearures).forEach(key => {
			const geojson: GeoJson = {
				type: "FeatureCollection",
				features: classifiedFearures[key]
			}
			fs.writeFile(path.join(outDir, prefNumber, `${key}.geojson`), JSON.stringify(geojson, null, "\t"));
		});
		progressBar.tick();
	}
})();