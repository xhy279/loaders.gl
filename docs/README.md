# Introduction

<p align="center">
  <img src="https://badge.fury.io/js/%40loaders.gl%2Fcore.svg" />
  <img src="https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img src="https://img.shields.io/npm/dm/@loaders.gl/core.svg" />
  <br />
</p>


Documentation for loaders.gl **v3.1**. Docs for older versions are available on github:
**[v2.3](https://github.com/visgl/loaders.gl/blob/2.3-release/docs/README.md)**,
**[v1.3](https://github.com/visgl/loaders.gl/blob/1.3-release/docs/README.md)**.

## Overview

loaders.gl is a collection of open source loaders and writers for file formats focused on visualization of big data, including tabular, geospatial, and 3D formats.

loaders.gl is packaged and published as a suite of composable loader modules offering consistent APIs and features, and offers advanced features such as running loaders on workers and incremental parsing, and all loaders work in both the browser and in Node.js.

Other [vis.gl frameworks](https://vis.gl/frameworks) such as [deck.gl](https://deck.gl) and [luma.gl](https://luma.gl) integrate seamlessly with loaders.gl, however the API is framework-agnostic, and all loaders and writers can be used with any JavaScript application or framework.

## Loaders

loaders.gl provides a wide selection of loaders organized into categories:

| Category                                                         | Loaders                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Table Loaders](docs/specifications/category-table)              | Streaming tabular loaders for [CSV](modules/csv/docs/api-reference/csv-loader), [JSON](modules/json/docs/api-reference/json-loader), [Arrow](modules/arrow/docs/api-reference/arrow-loader) etc                                                                                                                                                                                                                                                                                      |
| [Geospatial Loaders](docs/specifications/category-gis)           | Loaders for geospatial formats such as [GeoJSON](<(modules/json/docs/api-reference/geojson-loader)>) [KML](modules/kml/docs/api-reference/kml-loader), [WKT/WKB](modules/wkt/docs/api-reference/wkt-loader), [Mapbox Vector Tiles](modules/mvt/docs/api-reference/mvt-loader) etc.                                                                                                                                                                                                   |
| [Image Loaders](docs/specifications/category-image)              | Loaders for [images](modules/images/docs/api-reference/image-loader), [compressed textures](modules/textures/docs/api-reference/compressed-texture-loader), [supercompressed textures (Basis)](modules/textures/docs/api-reference/basis-loader). Utilities for [mipmapped arrays](modules/images/docs/api-reference/load-image-array), [cubemaps](modules/images/docs/api-reference/load-image-cube), [binary images](modules/images/docs/api-reference/binary-image-api) and more. |
| [Pointcloud and Mesh Loaders](docs/specifications/category-mesh) | Loaders for point cloud and simple mesh formats such as [Draco](modules/draco/docs/api-reference/draco-loader), [LAS](modules/las/docs/api-reference/las-loader), [PCD](modules/pcd/docs/api-reference/pcd-loader), [PLY](modules/ply/docs/api-reference/ply-loader), [OBJ](modules/obj/docs/api-reference/obj-loader), and [Terrain](modules/terrain/docs/api-reference/terrain-loader).                                                                                            |
| [Scenegraph Loaders](docs/specifications/category-scenegraph)    | [glTF](modules/gltf/docs/api-reference/gltf-loader) loader                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [Tiled Data Loaders](docs/specifications/category-3d-tiles)         | Loaders for 3D tile formats such as [3D Tiles](modules/3d-tiles/docs/api-reference/tile-3d-loader), [I3S](modules/i3s/docs/api-reference/i3s) and potree                                                                                                                                                                                                                                                                                                                             |

## Code Examples

loaders.gl provides a small core API module with common functions to load and save data, and a range of optional modules that provide loaders and writers for specific file formats.

A minimal example using the `load` function and the `CSVLoader` to load a CSV formatted table into a JavaScript array:

```js
import {load} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';

const data = await load('data.csv', CSVLoader);

for (const row of data) {
  console.log(JSON.stringify(row)); // => '{header1: value1, header2: value2}'
}
```

Streaming parsing is available using ES2018 async iterators, e.g. allowing "larger than memory" files to be incrementally processed:

```js
import {loadInBatches} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';

for await (const batch of await loadInBatches('data.csv', CSVLoader)) {
  for (const row of batch) {
    console.log(JSON.stringify(row)); // => '{header1: value1, header2: value2}'
  }
}
```

To quickly get up to speed on how the loaders.gl API works, please see [Get Started](docs/developer-guide/get-started).

## Supported Platforms

loaders.gl provides consistent support for both browsers and Node.js. The following platforms are supported:

- **Evergreen Browsers** loaders.gl supports recent versions of the major evergreen browsers (e.g. Chrome, Firefox, Safari) on both desktop and mobile.
- **Node.js** LTS (Long-Term Support) [releases](https://nodejs.org/en/about/releases/) are also supported. Note that the `@loaders.gl/polyfills` module should be imported under Node.js. It installs the required Node.js polyfills for `fetch` etc.
- **IE11** is no longer officially supported from v3.0, however loaders.gl 2.3 is known to run on IE11.
  - To run on IE11, both `@loaders.gl/polyfills` and additional appropriate polyfills (e.g. babel polyfills) need to be installed which will increase your application bundle size.
  - Note that because of lack of regular testing on IE11, regressions can occur, so pinning your loaders.gl versions in package.json is advisable.
  - For IE11, additional transpilation of loaders.gl packages in your `node_modules` folder may also be required.
## Design Goals

**Framework Agnostic** - Files are parsed into clearly documented data structures (objects + typed arrays) that can be used with any JavaScript framework.

**Streaming Support** - Several loaders can parse in batches from both node and browser `Stream`s, allowing "larger than memory" files to be processed, and initial results to be available while the remainder of a file is still loading.

**Browser Support** - loaders.gl supports recent versions of evergreen browsers.

**Worker Support** - Many loaders.gl loaders are automatically run in web workers, keeping the main thread free for other tasks while parsing completes.

**Node Support** - All loaders work under Node.js and can be used when writing backend and cloud services, and when running your unit tests under Node.

**Loader Categories** - loaders.gl groups similar data formats into "categories". loaders in the same category return parsed data in "standardized" form, making it easier to build applications that can handle multiple similar file formats.

**Format Autodection** - Applications can specify multiple loaders when parsing a file, and loaders.gl will automatically pick the right loader for a given file based on a combination of file/url extensions, MIME types and initial data bytes.

**Bundle Size Reduction** - Loaders for each file format are published in independent npm modules to allow applications to cherry-pick only the loaders it needs. In addition, modules are optimized for tree-shaking, and many larger loader libraries and web workers are loaded from CDN on use and not included in your application bundle.

**Modern JavaScript** - loaders.gl is written in standard ES2018 and the API emphasizes modern, portable JavaScript constructs, e.g. async iterators instead of streams, `ArrayBuffer` instead of `Buffer`, etc.

**Binary Data** - loaders.gl is optimized to load into compact memory representations and use with WebGL frameworks (e.g. by returning typed arrays whenever possible). Note that in spite of the `.gl` naming, loaders.gl has no any actual WebGL dependencies and loaders can be used without restrictions in non-WebGL applications.

**Multi-Asset Loading** - Some formats like glTF, Shapefile, or mip mapped / cube textures can require dozens of separate loads to resolve all linked assets (external buffers, images etc). Tracking all the resulting async loads can cause complications for applications. By default, loaders.gl loads all linked assets before resolving the returned `Promise`.

## Licenses

loaders.gl itself is MIT licensed but various modules contain code under several permissive open source licenses, currently MIT, BSD and Apache licenses. Each loader module comes with its own license, so if the distinction matters to you, please check the documentation for each module and decide accordingly, however loaders.gl will never include code with non-permissive, commercial or copy-left licenses.

## Credits and Attributions

loaders.gl is maintained by a group of organizations collaborating through open governance under the Linux Foundation.

While loaders.gl contains a lot of original code, it is also partly a repackaging of superb work done by others in the open source community. We try to be as explicit as we can about the origins and attributions of each piece of code, both in the documentation page for each module and in the preservation of comments relating to authorship and contributions inside forked source code.

Even so, we can make mistakes, and we may not have the full history of the code we are reusing. If you think that we have missed something, or that we could do better in regard to attribution, please let us know.

## Open Governance

<a href="https://vis.gl">
  <img height="30" src="https://raw.githubusercontent.com/visgl/vis.gl/master/src/images/logos/linux-foundation.svg" />
  <span style="padding-left: 50px;" />
  <img height="30" src="https://raw.githubusercontent.com/visgl/vis.gl/master/src/images/logos/ucf-color-hztl.svg" />
  <span style="padding-left: 50px;" />
  <img height="30" src="https://raw.githubusercontent.com/visgl/vis.gl/master/src/images/logos/vis-logo.png" />
</a>

loaders.gl is a part of the <a href="https://vis.gl"><b>vis.gl framework suite</b></a>, an open governance Linux Foundation project that is developed collaboratively by multiple organizations and individuals and the Urban Computing Foundation.

### Primary maintainers

Some of the organizations and individuals that contribute most significantly to the development and maintenance of loaders.gl are:

<p style="margin-left: auto; margin-right: auto;">
  <a href="https://unfolded.ai">
    <img height="40" src="https://raw.githubusercontent.com/visgl/vis.gl/master/src/images/logos/unfolded-logo.png" />
  </a>
  <span style="margin-left: 30px;" />
  <a href="https://carto.com">
    <img height="40" src="https://raw.githubusercontent.com/visgl/vis.gl/master/src/images/logos/CARTO-logo-positive.png" />
  </a>
</p>
