# roadjp

The dataset of main road is open to the public by MLIT of Japan.  
[https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html#prefecture26](https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html#prefecture26)  
These are in ESRI shapefile format that is not good for web. So, I transform these shp files to geojson that is compatible with javascript. The products are open on [GitHub Pages](https://yuukitoriyama.github.io/roadjp/47.geojson).

## Usage

The road data are available on GitHub Pages. They are devided into small file by prefecture and road type.

```
https://yuukitoriyama.github.io/roadjp/${prefecture code}/${road type code}.geojson
```

If you want to get highway data of Kyoto prefecture, request url will be

```
https://yuukitoriyama.github.io/roadjp/26/1.geojson
```

### prefecture code(都道府県コード)

<details>

[https://nlftp.mlit.go.jp/ksj/gml/codelist/PrefCd.html](https://nlftp.mlit.go.jp/ksj/gml/codelist/PrefCd.html)より引用  
| コード | 対応する内容 |
| ------ | ------------ |
| 01 | 北海道 |
| 02 | 青森県 |
| 03 | 岩手県 |
| 04 | 宮城県 |
| 05 | 秋田県 |
| 06 | 山形県 |
| 07 | 福島県 |
| 08 | 茨城県 |
| 09 | 栃木県 |
| 10 | 群馬県 |
| 11 | 埼玉県 |
| 12 | 千葉県 |
| 13 | 東京都 |
| 14 | 神奈川県 |
| 15 | 新潟県 |
| 16 | 富山県 |
| 17 | 石川県 |
| 18 | 福井県 |
| 19 | 山梨県 |
| 20 | 長野県 |
| 21 | 岐阜県 |
| 22 | 静岡県 |
| 23 | 愛知県 |
| 24 | 三重県 |
| 25 | 滋賀県 |
| 26 | 京都府 |
| 27 | 大阪府 |
| 28 | 兵庫県 |
| 29 | 奈良県 |
| 30 | 和歌山県 |
| 31 | 鳥取県 |
| 32 | 島根県 |
| 33 | 岡山県 |
| 34 | 広島県 |
| 35 | 山口県 |
| 36 | 徳島県 |
| 37 | 香川県 |
| 38 | 愛媛県 |
| 39 | 高知県 |
| 40 | 福岡県 |
| 41 | 佐賀県 |
| 42 | 長崎県 |
| 43 | 熊本県 |
| 44 | 大分県 |
| 45 | 宮崎県 |
| 46 | 鹿児島県 |
| 47 | 沖縄県 |

</details>

### road type code(道路種別コード)

<details>

[https://nlftp.mlit.go.jp/ksj/gmlold/codelist/RoadTypeCd.html](https://nlftp.mlit.go.jp/ksj/gmlold/codelist/RoadTypeCd.html)より引用

| コード | 対応する内容   | 対応する内容                                                                                                                               |
| :----- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | 高速道路       | 道路法第三条第一号の高速自動車国道。首都高速道路公団、阪神高速道路公団及び地方道路公社のうち、名古屋市・北九州市・福岡市に係わる高速道路。 |
| 2      | 一般道路       | 道路法第三条第二号の一般国道。                                                                                                             |
| 3      | 主要地方道     | 道路法第三条第三号の都道府県または同条第 4 号の市町村道のうち、同法第五十六条の規定に基づいて指定された都道府県道または市道。              |
| 4      | 一般都道府県道 | 都道府県道のうち、主要地方道または特例都道以外のもの。                                                                                     |
| 5      | 特例都道       | 都道のうち、道路法第八十九条第一項の規定に基づいて認定された道路。                                                                         |
| 6      | 市町村道       | 主要地方道以外の市町村道。                                                                                                                 |
| 7      | 私道           |                                                                                                                                            |

</details>

## Author

ToriChan ([@CoconMap](https://twitter.com/coconmap))

## My favorite songs for driving...

https://open.spotify.com/album/75PpZnKSeKRgGGGps2A3xz?si=p2CbhtdZQ8CssN9fZNdAaA
