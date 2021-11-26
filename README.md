# roadjp

The dataset of main road is open to the public by MLIT of Japan.  
[https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html#prefecture26](https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html#prefecture26)  
These are in ESRI shapefile format that is not good for web. So, I transform these shp files to geojson that is compatible with javascript. The products are open on [GitHub Pages](https://yuukitoriyama.github.io/roadjp/47.geojson).

## Usage

```bash
curl https://yuukitoriyama.github.io/roadjp/47.geojson
```

```javascript
{
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						127.69758333,
						26.10030556
					],
					[
						127.69869444,
						26.09808333
					],
					[
						127.69925,
						26.09780556
					]
				]
			},
			"properties": {
				"N01_001": "3",
				"N01_002": "奥武山米須線",
				"N01_003": null,
				"N01_004": null
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						127.69925,
						26.09780556
					],
					[
						127.69925,
						26.09669444
					],
					[
						127.69869444,
						26.09447222
					]
				]
			},
			"properties": {
				"N01_001": "3",
				"N01_002": "奥武山米須線",
				"N01_003": null,
				"N01_004": null
			}
		},
		// and more...
```

## Author

ToriChan ([@CoconMap](https://twitter.com/coconmap))

## My favorite songs for driving...

<iframe src="https://open.spotify.com/embed/album/75PpZnKSeKRgGGGps2A3xz?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
