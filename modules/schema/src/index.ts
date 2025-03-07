// COMMON CATEGORY
export type {TypedArray, NumberArray, AnyArray} from './types';

export type {Batch} from './category/common';

// TABLE CATEGORY TYPES

export type {
  Table,
  ArrayRowTable,
  ObjectRowTable,
  ColumnarTable,
  ArrowTable
} from './category/table/table-types';
export type {
  TableBatch,
  RowArrayTableBatch,
  RowObjectTableBatch,
  ColumnarTableBatch,
  ArrowTableBatch
} from './category/table/table-types';

// TABLE CATEGORY UTILS
export {default as TableBatchBuilder} from './lib/batches/table-batch-builder';
export type {TableBatchAggregator} from './lib/batches/table-batch-aggregator';
export {default as RowTableBatchAggregator} from './lib/batches/row-table-batch-aggregator';
export {default as ColumnarTableBatchAggregator} from './lib/batches/columnar-table-batch-aggregator';

export {convertToObjectRow, convertToArrayRow} from './lib/utils/row-utils';

// MESH CATEGORY
export type {
  MeshTable,
  MeshArrowTable,
  Mesh,
  MeshGeometry,
  MeshAttribute,
  MeshAttributes
} from './category/mesh/mesh-types';

export {getMeshSize, getMeshBoundingBox} from './category/mesh/mesh-utils';
export {convertMesh} from './category/mesh/convert-mesh';
export {
  deduceMeshSchema,
  deduceMeshField,
  makeMeshAttributeMetadata
} from './category/mesh/deduce-mesh-schema';

// TYPES
// GIS CATEGORY - GEOJSON
export type {GeoJSON, Feature, Geometry, Position, GeoJsonProperties} from './category/gis';
export type {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon
} from './category/gis';

// GIS CATEGORY - BINARY
export type {
  BinaryGeometryType,
  BinaryGeometry,
  BinaryPointGeometry,
  BinaryLineGeometry,
  BinaryPolygonGeometry,
  BinaryAttribute
} from './category/gis';
export type {
  BinaryFeatures,
  BinaryPointFeatures,
  BinaryLineFeatures,
  BinaryPolygonFeatures
} from './category/gis';

// SCHEMA
export {
  Schema,
  Field,
  DataType,
  Null,
  Binary,
  Bool,
  Int,
  Int8,
  Int16,
  Int32,
  Int64,
  Uint8,
  Uint16,
  Uint32,
  Uint64,
  Float,
  Float16,
  Float32,
  Float64,
  Utf8,
  Date,
  DateDay,
  DateMillisecond,
  Time,
  TimeMillisecond,
  TimeSecond,
  Timestamp,
  TimestampSecond,
  TimestampMillisecond,
  TimestampMicrosecond,
  TimestampNanosecond,
  Interval,
  IntervalDayTime,
  IntervalYearMonth,
  FixedSizeList,
  Struct
} from './lib/schema/schema';

// EXPERIMENTAL APIs

// SCHEMA UTILS
export {deduceTypeFromColumn, deduceTypeFromValue} from './lib/schema-utils/deduce-column-type';
export {getTypeInfo} from './lib/arrow/get-type-info';
export {getArrowTypeFromTypedArray} from './lib/arrow/arrow-like-type-utils';

export {default as AsyncQueue} from './lib/utils/async-queue';
